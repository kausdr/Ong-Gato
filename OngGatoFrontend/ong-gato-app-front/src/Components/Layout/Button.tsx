interface ButtonProps {
    order: string
    text: any
    action: () => void
    icon?: React.ReactNode
    className?: string
    disabled?: boolean
}

function Button({order, text, action, icon, className, disabled}: ButtonProps) {

    const buttonClass = order == "primary" ? "bg-sky-400 hover:bg-sky-500"
    : order == "secondary" ? "border-1 hover:bg-slate-100"
    : order == "nav" ? "rounded-none hover:bg-slate-100"
    : order == "inactive" ? "pointer-events-none !bg-gray-200 !text-gray-400"
    : order == "cancel" ? "bg-yellow-400 hover:bg-yellow-500"
    : order == "active" ? "border-1 border-sky-500 bg-slate-100 text-sky-700 hover:bg-slate-100"
    : order == "quit" ? "bg-red-400 hover:bg-red-500 text-white"
    : order == "danger" ? "bg-red-500 hover:bg-red-600 text-white"
    : ""

    if (disabled) {
        return(
            <button className={`button inline-flex justify-center items-center gap-2 rounded py-2 px-4 cursor-not-allowed !bg-gray-200 !text-gray-400 ${buttonClass} ${className}`} disabled>
                {icon && icon}{text}
            </button>
        )
    }

    return(
        <button className={`button inline-flex justify-center items-center gap-2 rounded py-2 px-4 cursor-pointer ${buttonClass} ${className}`} onClick={action}>
            {icon && icon}{text}
        </button>
    )
}
//.
export default Button