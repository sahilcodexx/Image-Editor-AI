"use client";
import { useParams } from "next/navigation";

const Editor = () => {
  const { projectid } = useParams();

  return <div className="5xl">editor {projectid}</div>;
};

export default Editor;
