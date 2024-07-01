import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "./../../../../../service/AIModal";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of summary for 3 experience level, Mid Level and Freasher level in 3 - 4 lines in array format, Always With summary and experience_level Field, just in valid JSON Format. just send me json file with just array";

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [summary, setSummary] = useState();

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState();

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summary: summary,
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enabledNext(true);
        setLoading(false);
        toast("Detail Updated.👍");
      },
      (error) => {
        setLoading(false);
      }
    );
    enabledNext(true);
  };

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));

    setAiGeneratedSummaryList(JSON.parse([result.response.text()]));
    setLoading(false);
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary  mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              className="border-primary text-primary flex gap-2"
              variant="outline"
              size="sm"
              type="button"
              onClick={() => GenerateSummaryFromAI()}
            >
              <Brain className="h-4 w-4" />
              Generate From AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="mt-3 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
