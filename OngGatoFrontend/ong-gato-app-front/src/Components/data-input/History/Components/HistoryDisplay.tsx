import Button from "../../../Layout/Button"

interface HistoryDisplayProps {
    createdAt: string
    value: string
}

export const HistoryDisplay = () => {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col">
                <div className="flex gap-2 text-xl">
                <p className=" font-medium">R$</p>
                <p className=" font-bold">000</p>
                </div>
                <p className="font-light text-xs text-gray-400">Realizado em 10/12/12</p>

            </div>

            <div className="flex items-center">
                <Button order="secondary" text="Ver detalhes" action={() => { }} />
            </div>


        </div>
    )
}