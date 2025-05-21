import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

function Skills() {
  const [skillsList, setSkillsList] = useState([{ name: "", rating: 0 }]);
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Fetch from Supabase on mount
  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from("user-resumes")
        .select("skills")
        .eq("resumeId", resumeId)
        .single();
      if (!error && data && Array.isArray(data.skills)) {
        setSkillsList(
          data.skills.length ? data.skills : [{ name: "", rating: 0 }]
        );
        setResumeInfo((prev) => ({ ...prev, skills: data.skills }));
      }
    };
    fetchSkills();
  }, [resumeId]);

  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList];
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([...skillsList, { name: "", rating: 0 }]);
  };

  const RemoveSkills = () => {
    setSkillsList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const onSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("user-resumes")
      .update({ skills: skillsList })
      .eq("resumeId", resumeId);
    setLoading(false);
    if (error) {
      toast("Server Error, Try again 🌚");
    } else {
      toast("Details updated. 💙");
      setResumeInfo((prev) => ({ ...prev, skills: skillsList }));
    }
  };

  // Keep context in sync
  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, skills: skillsList }));
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your Top Professional Skills</p>
      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between my-3 border rounded-lg p-3"
          >
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                onChange={(e) => handleChange(index, "name", e.target.value)}
                value={item.name}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary"
          >
            + Add More Skills
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
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
  );
}

export default Skills;
