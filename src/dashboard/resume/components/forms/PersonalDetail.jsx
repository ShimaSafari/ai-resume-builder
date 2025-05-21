import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

function PersonalDetail({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    birthDate: "",
    nationality: "",
    address: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const fetchResume = async () => {
      const { data, error } = await supabase
        .from("user-resumes")
        .select("*")
        .eq("resumeId", params?.resumeId)
        .single();
      if (!error && data) {
        setFormData((prev) => ({ ...prev, ...data }));
        setResumeInfo((prev) => ({ ...prev, ...data }));
        enabledNext(true); // Enable next after loading initial data
      }
    };
    fetchResume();
  }, [params?.resumeId, setResumeInfo, enabledNext]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // If any value is different from resumeInfo, disable next
      const isDirty = Object.keys(updated).some(
        (key) => updated[key] !== resumeInfo?.[key]
      );
      enabledNext(!isDirty ? true : false);
      return updated;
    });
    setResumeInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Save handler
  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Fetch current data for comparison
    const { data: userData, error: fetchError } = await supabase
      .from("user-resumes")
      .select("*")
      .eq("resumeId", params?.resumeId)
      .single();

    if (fetchError) {
      setLoading(false);
      toast("Server Error, Try again 🌚");
    }

    // Check if anything changed
    const isSame = Object.keys(formData).every(
      (key) => formData[key] === userData[key]
    );
    if (isSame) {
      setLoading(false);
      toast("Nothing Changed 🌚");
      enabledNext(true);
      return;
    }

    // Update
    const { error } = await supabase
      .from("user-resumes")
      .update(formData)
      .eq("resumeId", params?.resumeId);

    setLoading(false);
    if (error) {
      toast("Server Error, Try again 🌚");
    } else {
      toast("Detail Updated.💜");
      enabledNext(true);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-4 border-t-primary mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              onChange={handleInputChange}
              required
              value={formData.firstName}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              onChange={handleInputChange}
              required
              value={formData.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              onChange={handleInputChange}
              required
              value={formData.jobTitle}
            />
          </div>
          <div>
            <label className="text-sm">Date of Birth</label>
            <Input
              name="birthDate"
              onChange={handleInputChange}
              required
              value={formData.birthDate}
              type="date"
            />
          </div>
          <div>
            <label className="text-sm">Nationality</label>
            <Input
              name="nationality"
              onChange={handleInputChange}
              required
              value={formData.nationality}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              onChange={handleInputChange}
              required
              value={formData.address}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              onChange={handleInputChange}
              required
              value={formData.phone}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              onChange={handleInputChange}
              required
              value={formData.email}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
