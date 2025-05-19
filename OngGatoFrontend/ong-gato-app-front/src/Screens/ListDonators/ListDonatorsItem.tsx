import Card from "../../Components/Layout/Card"
import { GoGear } from "react-icons/go";
import Button from "../../Components/Layout/Button";

interface ListDonatorsItem {
    name: string,
    email: string
}


export const ListDonatorsItem = ({name, email}: ListDonatorsItem) => {

    return (
        <tr className="border-b-1 border-gray-100">
                        <td className="py-[10px]">
                <div className="px-[10px]">{name}</div>

            </td>
                        <td className="py-[10px]">
                <div className="px-[10px]">{email}</div>

            </td>

        </tr>
    )
}

