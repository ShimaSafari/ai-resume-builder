import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "./../../../../../service/AIModal";
import { supabase } from "@/supabaseClient";

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

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from("user-resumes")
      .update({
        summary: summary,
      })
      .eq("resumeId", params?.resumeId)
      .select()
      .single();
    enabledNext(true);
    setLoading(false);
    toast("Detail Updated. ❤️");
    if (error) {
      setLoading(false);
      toast("Server Error, Try again 🌚");
    }

    enabledNext(true);
  };

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    const result = await AIChatSession.sendMessage(PROMPT);

    // Remove code fences and whitespace
    let text = await result.response.text();
    text = text.replace(/```json|```/g, "").trim();

    try {
      const parsed = JSON.parse(text);
      setAiGeneratedSummaryList(parsed);
    } catch (e) {
      toast("AI response is not valid JSON.");
      setAiGeneratedSummaryList([]);
    }
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
              className="border-primary text-primary flex gap-2 hover:bg-gradient-to-l from-sky-500 to-indigo-500 hover:text-white"
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
            className="mt-5 h-32"
            required
            onChange={(e) => setSummary(e.target.value)}
            defaultValue={summary ? summary : resumeInfo?.summary}
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
