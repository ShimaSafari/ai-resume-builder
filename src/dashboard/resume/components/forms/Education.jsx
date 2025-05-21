import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { supabase } from "@/supabaseClient";

const emptyEducation = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([emptyEducation]);

  // Fetch from Supabase on mount
  useEffect(() => {
    const fetchEducation = async () => {
      const { data, error } = await supabase
        .from("user-resumes")
        .select("education")
        .eq("resumeId", params?.resumeId)
        .single();
      if (!error && data && Array.isArray(data.education)) {
        setEducationalList(
          data.education.length ? data.education : [emptyEducation]
        );
        setResumeInfo((prev) => ({ ...prev, education: data.education }));
      }
    };
    fetchEducation();
  }, [params?.resumeId]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setEducationalList((prev) => {
      const newEntries = prev.map((item, idx) =>
        idx === index ? { ...item, [name]: value } : item
      );
      return newEntries;
    });
  };

  const AddNewEducation = () => {
    setEducationalList((prev) => [...prev, { ...emptyEducation }]);
  };

  const RemoveEducation = () => {
    setEducationalList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const onSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("user-resumes")
      .update({ education: educationalList })
      .eq("resumeId", params?.resumeId);
    setLoading(false);
    if (error) {
      toast("Server Error, Please try again");
    } else {
      toast("Detail updated. 🩷");
      setResumeInfo((prev) => ({ ...prev, education: educationalList }));
    }
  };

  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, education: educationalList }));
  }, [educationalList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary  mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your educational details</p>
      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  value={item.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  value={item.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  value={item.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.endDate}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  value={item.description}
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
            className="text-primary"
            onClick={AddNewEducation}
          >
            + Add more
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={RemoveEducation}
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

export default Education;
