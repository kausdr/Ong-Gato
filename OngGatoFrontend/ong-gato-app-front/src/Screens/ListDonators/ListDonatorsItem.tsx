import Card from "../../Components/Layout/Card"
import { GoGear } from "react-icons/go";
import Button from "../../Components/Layout/Button";

interface ListDonatorsItem {
    amount: number,
}


export const ListDonatorsItem = ({amount}: ListDonatorsItem) => {

    return (
        <tr className="border-b-1 border-gray-100">
            <td className="py-[10px]">
                <div className="px-[10px]">{amount}</div>
            </td>
            {/* <td className="py-[10px]">
                <div className="px-[10px]">{email}</div>

            </td> */}
        </tr>
    )
}

