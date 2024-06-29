import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [summary, setSummary] = useState();

  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    summary &&
      setResumeInfo(
        {
          ...resumeInfo,
          summery: summary,
        },
        [summary]
      );
  });

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
            >
              <Brain className="h-4 w-4" />
              Generate From AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            onChange={(e) => setSummary(e.target.value)}
            required
          />
          <div className="mt-3 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Summary;
