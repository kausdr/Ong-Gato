interface ButtonProps {
    order: string
    text: any
    action: () => void
}

function Button({order, text, action}: ButtonProps) {

    const buttonClass = order == "primary" ? "bg-sky-400 hover:bg-sky-500" : order == "secondary" ? "border-1 hover:bg-slate-50" : order == "nav" ? "rounded-none hover:bg-slate-100" : order == "inactive" ? "pointer-events-none !bg-gray-200 !text-gray-400" : ""

    return(
        <button className={`button inline-flex justify-center items-center rounded py-2 px-4 cursor-pointer ${buttonClass}`} onClick={action}>
            {text}
        </button>
    )
}
//.
export default Button