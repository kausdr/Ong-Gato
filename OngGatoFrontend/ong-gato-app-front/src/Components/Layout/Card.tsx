interface CardProps {
    className?: string
    children: React.ReactNode
}

function Card({className, children}: CardProps) {
    return(
        <div className={`m-5 min-w-[400px] rounded overflow-hidden border-1 border-slate-200  ${className ? className : ``}`}>
            {children}
        </div>
    )
}

export default Card