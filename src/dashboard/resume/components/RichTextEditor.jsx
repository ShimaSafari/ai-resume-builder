import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Separator,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../../service/AIModal";
import { toast } from "sonner";

// const PROMPT='position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please dont add experience level key or position_title or any other key and No JSON object). always send all in seperate HTML tags(as ul li , with always has bullet point marker before the text)';
const PROMPT =
  "position title: {positionTitle} , I need 5-7 resume bullet points for this position title. Deliver the output strictly as a standalone HTML <ul> containing <li> elements. Ensure each <li> has a bullet point marker. Absolutely no JSON, no wrapper keys, and no introductory or concluding sentences. Only the raw HTML.";

function RichTextEditor({ onRichTextEditorChange, index, value }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].title) {
      toast("Please Add Position Title");
      setLoading(false);
    }

    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    const result = await AIChatSession.sendMessage(prompt);
    // console.log(result.response.text());
    const res = result.response.text();
    setValue(res.replace("[", "").replace("]", ""));
    setLoading(false);
  };
  return (
    <div>
      <div className="flex justify-between my-3">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          className="border-primary text-primary flex gap-2 hover:bg-gradient-to-l from-sky-500 to-indigo-500 hover:text-white"
          onClick={GenerateSummaryFromAI}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
