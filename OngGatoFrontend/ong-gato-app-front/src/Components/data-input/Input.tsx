import { ReactElement, SetStateAction } from "react"

interface InputProps {
    label: string
    type: string
    icon?: ReactElement
    id: string
    name: string
    placeholder?: string
    className?: string
    value: any
    setValue: React.Dispatch<SetStateAction<any>>
}

function Input({ label, type, icon, id, name, placeholder, className, value, setValue }: InputProps) {
    return (
        <>
                <label className={`flex flex-col ${className}`}>
                    <h3>{label}</h3>
                    <div className="relative flex gap-2">
                        {icon && (
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                {icon}
                            </div>
                        )}
                        <input type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={(e) =>setValue(e.target.value)} className={`w-full border border-1 border-gray-200 placeholder:font-light placeholder:text-sm rounded p-1 ${icon ? "pl-8" : ''}`} />
                    </div>

                </label>
        </>
    )
}

export default Input