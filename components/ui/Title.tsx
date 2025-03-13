import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Title = ({ children, className }: Props) => {
  return (
    <h2 className={cn("text-base font-semibold text-slate-900", className)}>
      {children}
    </h2>
  );
};

export default Title;
