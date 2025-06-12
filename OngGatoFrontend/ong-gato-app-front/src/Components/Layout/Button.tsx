interface ButtonProps {
    order: string
    text: any
    action: () => void
    icon?: React.ReactNode
    className?: string
}

function Button({order, text, action, icon, className}: ButtonProps) {

    const buttonClass = order == "primary" ? "text-white font-semibold bg-[#28538f] hover:bg-[#214475]"
    : order == "secondary" ? "border-1 text-slate-700 hover:bg-slate-100"
    : order == "nav" ? "rounded-md font-semibold text-white hover:bg-[#3873C7]"
    : order == "inactive" ? "pointer-events-none !bg-gray-200 !text-gray-400"
    : order == "cancel" ? "bg-yellow-400 font-semibold text-slate-700 hover:bg-yellow-500"
    : order == "active" ? "border-1 border-sky-500 bg-slate-100 text-sky-700 hover:bg-slate-100"
    : order == "quit" ? "bg-red-700 hover:bg-red-800 text-white"
    : ""

    return(
        <button className={`button inline-flex justify-center items-center gap-2 rounded py-2 px-4 cursor-pointer ${buttonClass} ${className}`} onClick={action}>
            {icon && icon}{text}
        </button>
    )
}
//.
export default Button