interface CardProps {
    className?: string
    children: React.ReactNode
}

function Card({className, children}: CardProps) {
    return(
        <div className={`m-5 min-w-[400px] rounded overflow-hidden   ${className ? className : ``}`}
        style={{ backgroundColor: "var(--bg-color)" }}
        >
            {children}
        </div>
    )
}

export default Card