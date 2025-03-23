import React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "ghost" | "outline"
    size?: "default" | "sm" | "icon"
    className?: string
}

export const Button = ({
                           className = "",
                           variant = "default",
                           size = "default",
                           children,
                           ...props
                       }: ButtonProps) => {
    const getVariantClasses = () => {
        switch (variant) {
            case "ghost":
                return "hover:bg-accent hover:text-accent-foreground"
            case "outline":
                return "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            default:
                return "bg-primary text-primary-foreground hover:bg-primary/90"
        }
    }

    const getSizeClasses = () => {
        switch (size) {
            case "sm":
                return "h-9 px-3 rounded-md"
            case "icon":
                return "h-10 w-10 p-0"
            default:
                // Se agregan clases responsivas para ajustar el padding y la altura en pantallas medianas o superiores.
                return "h-10 px-4 py-2 rounded-md sm:h-11 sm:px-5"
        }
    }

    return (
        <button
            className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
