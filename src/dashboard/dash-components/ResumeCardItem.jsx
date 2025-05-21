import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2Icon, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("user-resumes")
      .delete()
      .eq("resumeId", resume.resumeId);
    toast("Resume Deleted! 🥲");
    refreshData();
    setLoading(false);
    setOpenAlert(false);

    if (error) {
      console.error("Error deleting resume:", error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <Link to={`/dashboard/resume/${resume.resumeId}/edit`}>
        <div
          className="p-14 bg-gradient-to-b  from-sky-200 to-slate-100 flex 
          items-center justify-center h-[250px]  border-t-4 rounded-t-lg"
          style={{ borderColor: resume?.themeColor }}
        >
          <img src="/cv.png" alt="cv-icon" width={150} height={150} />
        </div>
      </Link>

      <div
        className="border p-3 flex justify-between text-white rounded-b-lg shadow-lg"
        style={{ background: resume?.themeColor }}
      >
        <h2 className="text-sm">{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation(`/dashboard/resume/${resume.resumeId}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation(`/my-resume/${resume.resumeId}/view`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation(`/my-resume/${resume.resumeId}/view`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
