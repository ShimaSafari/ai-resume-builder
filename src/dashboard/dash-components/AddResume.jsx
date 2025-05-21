import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();

    const userData = {
      title: resumeTitle,
      resumeId: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };
    const { data, error } = await supabase
      .from("user-resumes")
      .insert([
        {
          title: userData.title,
          resumeId: userData.resumeId,
          userEmail: userData.userEmail,
          userName: userData.userName,
        },
      ])
      .select();

    if (error) {
      console.error("Error creating resume:", error.message);
      setLoading(false);
    }
    // console.log("Resume created successfully", data);
    setLoading(false);
    navigation(`/dashboard/resume/${userData.resumeId}/edit`);
  };

  return (
    <div>
      <div
        className="p-14 py-24 border flex items-center justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your resume</p>
              <Input
                onChange={(e) => setResumeTitle(e.target.value)}
                className="my-3"
                placeholder="Ex. Full Stack resume"
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
