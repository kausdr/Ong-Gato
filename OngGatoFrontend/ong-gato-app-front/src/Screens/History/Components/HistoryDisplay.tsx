import Button from "../../../Components/Layout/Button"

interface HistoryDisplayProps {
    name: string
    createdAt: string
    value: string
}

export const HistoryDisplay = ({ name, createdAt, value }: HistoryDisplayProps) => {
    return (
        <tr>
            <td>
                <div className="flex flex-col px-[10px]">
                    <div className="flex gap-2 text-xl">
                        <p className=" font-medium">R$</p>
                        <p className=" font-bold">{value}</p>
                    </div>
                    <p className="font-light text-xs text-gray-400">Realizado em {createdAt}</p>

                </div>
            </td>
            <td>
                <div className="px-[10px]">{name}</div>
            </td>
        </tr>
    )
}