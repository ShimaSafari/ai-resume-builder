import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.experience?.map((exper, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor}}
          >
            {exper?.title}
          </h2>
          <h2 className="text-xs flex justify-between flex-wrap">
            {exper?.companyName},{exper?.city},{exper?.state}
            <span>
              {exper?.startDate} to {exper?.currentlyWorking ? "Present" : exper.endDate}
            </span>
          </h2>
          {/* <p className="text-xs my-2">{exper.workSummary}</p> */}
          <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:exper?.workSummary}} />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
