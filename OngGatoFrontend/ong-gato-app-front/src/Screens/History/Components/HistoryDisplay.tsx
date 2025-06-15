import { Donation } from "../../../API/donation";
import { FaBrazilianRealSign } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";
import { PiCoatHangerBold } from "react-icons/pi";
import { GiOpenedFoodCan } from "react-icons/gi";
import { FaGift } from "react-icons/fa";

interface HistoryDisplayProps {
    donation: Donation;
    isAdmin: boolean;
}

const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
};
    
const typeInfo = {
    DINHEIRO: { icon: <TbPigMoney className="text-green-600"/>, label: 'Dinheiro' },
    ROUPA: { icon: <PiCoatHangerBold className="text-sky-400"/>, label: 'Roupa' },
    ALIMENTO: { icon: <GiOpenedFoodCan className="text-orange-400"/>, label: 'Alimento' },
    BRINQUEDO: { icon: <FaGift className="text-purple-500"/>, label: 'Brinquedo' },
};

export const HistoryDisplay = ({ donation, isAdmin } : HistoryDisplayProps) => {

    const { type, date, amount, donator } = donation;
    const currentType = typeInfo[type] || { icon: null, label: type };

    return (
        <tr className="border-b-2" style={{ color: "var(--t-text-color)" , borderColor: "var(--border-color)"}}>
            <td className="p-2">
                <div className="flex gap-2 items-center text-md">
                    {currentType.icon}
                    <span>{currentType.label}</span>
                </div>
            </td>
            <td className="p-2">
                {formatDate(date)}
            </td>
            <td className="p-2">
                <div className="flex items-center">
                    {type === 'DINHEIRO' && <FaBrazilianRealSign className="text-green-600 mr-1" />}
                    {amount}
                    {type === 'ALIMENTO' && <span className="text-sm font-semibold text-orange-600 ml-1">kg</span>}
                </div>
            </td>
            {isAdmin && (
                <td className="p-2">
                    {donator ? `${donator.firstName} ${donator.lastName}` : "Não consta"}
                </td>
            )}
        </tr>
    );
};
