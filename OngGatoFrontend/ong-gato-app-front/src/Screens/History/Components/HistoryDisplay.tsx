import { TypeDonation } from "../../../API/donation";
import { User } from "../../../API/user"
import { FaBrazilianRealSign } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";
import { PiCoatHangerBold } from "react-icons/pi";
import { GiOpenedFoodCan } from "react-icons/gi";

interface HistoryDisplayProps {
    type: TypeDonation
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
        <tr className="text-slate-900 border-b-1 border-gray-100">
            <td>
                <div className="flex flex-col px-[10px] py-2 ">
                    <div className="flex gap-2 text-xl">
                        <p className="text-slate-600">{type.name ? type.name.toLocaleLowerCase() == "dinheiro" ? <p className="flex gap-1 items-center"><TbPigMoney className="text-green-600"/> {type.name}</p>
                        : type.name.toLocaleLowerCase() == "roupa" ? <p className="flex gap-1 items-center"><PiCoatHangerBold className="text-sky-400"/> {type.name}</p>
                        : type.name.toLocaleLowerCase() == "alimento" ? <p className="flex gap-1 items-center"><GiOpenedFoodCan className="text-orange-400"/> {type.name}</p>
                        : "Não consta" : ""}</p>
                    </div>
                    <p className="font-light text-xs text-gray-400">{dataFormatada}</p>
                </div>
            </td>
            <td>
                <div className="flex items-center px-[10px]">{type.name.toLocaleLowerCase() == "dinheiro" ? <p className="flex gap-2 items-center"><FaBrazilianRealSign className="text-green-600" /> {amount} </p> 
                : type.name.toLocaleLowerCase() == "alimento" ? <p>{amount} <span className="text-sm font-semibold text-orange-600">kg</span></p> 
                : type.name.toLocaleLowerCase() == "roupa" ? <p>{amount}</p> 
                : ""}
                </div>
            </td>
            <td>
                <div className="px-[10px]">por {donator ? donator.firstName : "Não consta"}</div>
            </td>
        </tr>
    )
}