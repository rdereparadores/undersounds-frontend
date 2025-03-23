import React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost"
    size?: "default" | "sm" | "lg" | "icon"
    className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", children, ...props }, ref) => {
        return (
            <button
                className={`
    ${className}
    ${variant === "default" ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
    ${variant === "outline" ? "border border-blue-500 text-blue-500 hover:bg-blue-100 hover:border-blue-300" : ""}
    ${variant === "ghost" ? "text-blue-600 hover:text-white hover:bg-blue-500" : ""}
    ${size === "sm" ? "px-2 py-1 text-sm" : ""}
    ${size === "lg" ? "px-4 py-2 text-lg" : ""}
    ${size === "icon" ? "h-9 w-9" : "px-3 py-1.5"}
    rounded-full font-medium
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    inline-flex items-center justify-center whitespace-nowrap
`}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        )
    },
)
Button.displayName = "Button"

