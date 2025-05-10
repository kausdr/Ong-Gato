import { ReactElement, SetStateAction, useEffect, useState } from "react"
import { IoWarning } from "react-icons/io5";

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

    const [renderError, setRenderError] = useState<boolean>(false)
    const [displayVazioWarn, setDisplayVazioWarn] = useState<boolean>(false)
    const [displayEmailWarn, setDisplayEmailWarn] = useState<boolean>(false)

    const fieldCheck = () => {
        if (!value) {
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
            case Error.Vazio:
                setDisplayVazioWarn(true)
        }
    }


    return (
        <div className="flex flex-col gap-2">
            <label className={`flex flex-col ${className}`}>
                <h3>{label}</h3>
                <div className="relative flex gap-2">
                    {icon && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            {icon}
                        </div>
                    )}
                    <input type={type} id={id} name={name} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}
                        onBlur={() => { fieldCheck() }}
                        className={`w-full border border-1 ${renderError ? "border-red-400" : "border-gray-200"} placeholder:font-light placeholder:text-sm rounded p-1 ${icon ? "pl-8" : ''}`} />
                </div>
            </label>
            {renderError && (
                <div className="flex flex-row gap-2 items-center">
                    <IoWarning className="text-md text-red-400" />
                    <p className="text-red-400 text-sm">{displayVazioWarn ? "Campo Obrigatório" : displayEmailWarn ? "E-mail já existe" : "Campo inválido"}</p>
                </div>
            )}

        </div>
    )
}

export default Input