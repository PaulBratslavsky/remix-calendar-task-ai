import * as React from "react";

import { cn } from " ~/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const CustomTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md bg-background text-sm p-2 ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          "border-2 border-transparent focus:bg-green-50 focus:outline-none", // Updated styles
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
CustomTextarea.displayName = "Custom Textarea";

export { CustomTextarea };
