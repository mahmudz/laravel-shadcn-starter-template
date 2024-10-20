import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

const InputError = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, message, ...props }, ref) => {
        return (
            message && <p
                className={cn(
                    "text-sm font-medium text-destructive",
                    className
                )}
                ref={ref}
                {...props}
            >
                {message}
            </p>
        )
    }
)
InputError.displayName = "InputError"

export { InputError }
