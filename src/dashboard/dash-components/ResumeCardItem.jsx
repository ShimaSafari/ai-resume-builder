import React from "react";
import { Link } from "react-router-dom";
import { Notebook } from "lucide-react";
function ResumeCardItem({ resume }) {
  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <div
        className="p-14 
      bg-gradient-to-b  from-sky-200 to-slate-100
      flex items-center justify-center h-[280px]  border-t-4 rounded-lg border-primary hover:scale-105 transition-all hover:shadow-md hover:shadow-blue-100"
      // style={{borderColor: resume?.themeColor}}
      >
        {/* <Notebook /> */}
        <img src="/cv.png" alt="loading" width={100} height={100} />
      </div>
      <h2 className="text-center my-3 ">{resume.title}</h2>
    </Link>
  );
}

export default ResumeCardItem;
