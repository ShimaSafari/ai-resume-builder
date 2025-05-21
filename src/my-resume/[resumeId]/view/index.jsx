import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { supabase } from "@/supabaseClient";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
    // eslint-disable-next-line
  }, [resumeId]);

  const GetResumeInfo = async () => {
    const { data, error } = await supabase
      .from("user-resumes")
      .select("*")
      .eq("resumeId", resumeId)
      .single();
    if (!error && data) {
      setResumeInfo(data);
    }
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="mt-24 my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            🎉 Congrats! Your Ultimate AI generates Resume is ready! 🥳
          </h2>
          <p className="text-center text-gray-400 ">
            Now you are ready to download your resume and you can share unique
            resume url with your friends
          </p>
          <div className="max-w-screen-md flex justify-between my-10 text-center mx-auto">
            <Button onClick={HandleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello, This is my resume please open to see it",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "/my-resume/" +
                  resumeId +
                  "/view",
                title:
                  resumeInfo?.firstName +
                  " " +
                  resumeInfo?.lastName +
                  " resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className="max-w-screen-md flex justify-center mx-auto ">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
