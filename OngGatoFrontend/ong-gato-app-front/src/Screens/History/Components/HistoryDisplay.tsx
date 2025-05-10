import { User } from "../../../API/user"

interface HistoryDisplayProps {
    type: string
    date: string
    amount: number
    donator: User
}

export const HistoryDisplay = ({type, date, amount, donator} : HistoryDisplayProps) => {

    const convertedDate = new Date(date)
    const dia = String(convertedDate.getDate()).padStart(2, '0');
    const mes = String(convertedDate.getMonth() + 1).padStart(2, '0');
    const ano = convertedDate.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;
    

    return (
        <tr>
            <td>
                <div className="flex flex-col px-[10px]">
                    <div className="flex gap-2 text-xl">
                        <p className=" font-bold">{type ? type : "Não consta"}</p>
                    </div>
                    <p className="font-light text-xs text-gray-400">{dataFormatada}</p>
                </div>
            </td>
            <td>
                <div className="px-[10px]">{amount}</div>
            </td>
            <td>
                <div className="px-[10px]">por {donator.name}</div>
            </td>
        </tr>
    )
}