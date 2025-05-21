import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const emptyExperience = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience() {
  const [experienceList, setExperienceList] = useState([emptyExperience]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  // Fetch from Supabase on mount
  useEffect(() => {
    const fetchExperience = async () => {
      const { data, error } = await supabase
        .from("user-resumes")
        .select("experience")
        .eq("resumeId", params?.resumeId)
        .single();
      if (!error && data && Array.isArray(data.experience)) {
        setExperienceList(
          data.experience.length ? data.experience : [emptyExperience]
        );
        setResumeInfo((prev) => ({ ...prev, experience: data.experience }));
      }
    };
    fetchExperience();
  }, [params?.resumeId]);

  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList((prev) => [...prev, { ...emptyExperience }]);
  };

  const RemoveExperience = () => {
    setExperienceList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleRichTextEditor = (e, name, index) => {
    setExperienceList((prev) => {
      const newEntries = prev.map((item, idx) =>
        idx === index ? { ...item, [name]: e.target.value } : item
      );
      return newEntries;
    });
  };

  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, experience: experienceList }));
  }, [experienceList]);

  const onSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("user-resumes")
      .update({ experience: experienceList })
      .eq("resumeId", params?.resumeId);
    setLoading(false);
    if (error) {
      toast("Server Error, Try again 🌚");
    } else {
      toast("Detail updated. 💚");
      setResumeInfo((prev) => ({ ...prev, experience: experienceList }));
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    value={item.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    value={item.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    value={item.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    value={item.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item.endDate}
                  />
                </div>
                <div className="col-span-2">
                  {/* Work Summary  */}
                  <RichTextEditor
                    index={index}
                    value={item.workSummary}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummary", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewExperience}
              className="text-primary"
            >
              + Add More
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-primary"
            >
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
