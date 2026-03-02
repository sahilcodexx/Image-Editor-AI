import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("m-auto max-w-6xl px-4 sm:px-0", className)}>
      {children}
    </div>
  );
};

export default Container;
