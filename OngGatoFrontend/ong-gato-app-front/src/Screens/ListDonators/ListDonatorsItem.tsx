interface ListDonatorsItem {
    name: string,
    email: string
}

export const ListDonatorsItem = ({ name, email }: ListDonatorsItem) => {

    return (
        <tr className="text-slate-900 border-b-1 border-gray-100">
            <td className="py-[10px]">
                <div className="px-[10px]">{name}</div>

            </td>
            <td className="py-[10px]">
                <div className="px-[10px]">{email}</div>

            </td>

        </tr>
    )
}
