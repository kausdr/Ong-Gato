import { ReactElement, SetStateAction, useState } from "react"
import { IoWarning } from "react-icons/io5";

interface InputProps {
    label?: string
    type: string
    icon?: ReactElement
    id: string
    name: string
    placeholder?: string
    className?: string
    value: any
    setValue: React.Dispatch<SetStateAction<any>>
    mandatory?: boolean
    inactive?: boolean
    helperText?: string
}

function Input({ label, type, icon, id, name, placeholder, className, value, setValue, mandatory = true, inactive = false, helperText }: InputProps) {

    const [renderError, setRenderError] = useState<boolean>(false)
    const [displayVazioWarn, setDisplayVazioWarn] = useState<boolean>(false)
    const [displayEmailWarn, setDisplayEmailWarn] = useState<boolean>(false)

    const fieldCheck = () => {
        if (!value && mandatory) {
            renderErrorWarning(Error.Vazio)

        } else {
            setRenderError(false)
        }
    }

    enum Error {
        Email = "Email",
        Vazio = "Vazio"
    }

    const renderErrorWarning = (tipoErro: Error) => {
        setRenderError(true)
        switch (tipoErro) {
            case Error.Email:
                setDisplayEmailWarn(true)
                break;
            case Error.Vazio:
                setDisplayVazioWarn(true)
                break;
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <label className={`flex flex-col ${className}`}>
                {label && <h3 className="text-slate-700 mb-1">{label}</h3>}
                <div className="relative flex gap-2">
                    {icon && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            {icon}
                        </div>
                    )}
                    <input type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}
                        onBlur={() => { fieldCheck() }}
                        className={`w-full border border-1 ${renderError ? "border-red-400" : "border-gray-200"} ${inactive ? "readOnly bg-gray-100 pointer-events-none focus:outline-none focus:border-none" : ""}placeholder:font-light placeholder:text-sm rounded p-1 ${icon ? "pl-8" : ''}`} 
                        readOnly={inactive}/>
                </div>
            </label>
            {renderError && (
                <div className="flex flex-row gap-2 items-center">
                    <IoWarning className="text-md text-[#C34936]" />
                    <p className="text-[#C34936] text-sm">{displayVazioWarn ? "Campo Obrigatório" : displayEmailWarn ? "E-mail já existe" : "Campo inválido"}</p>
                </div>
            )}

            {!renderError && helperText && (
                <p className="text-xs text-blue-500 ml-1">{helperText}</p>
            )}
        </div>
    )
}

export default Input