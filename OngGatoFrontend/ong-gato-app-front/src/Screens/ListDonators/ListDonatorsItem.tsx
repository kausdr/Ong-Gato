interface ListDonatorsItem {
    name: string,
    email: string
}

export const ListDonatorsItem = ({ name, email }: ListDonatorsItem) => {

    return (
        <tr className="border-b-1" style={{ color: "var(--t-text-color)" , borderColor: "var(--border-color)"}}>
            <td className="py-[10px]">
                <div className="px-[10px]">{name}</div>

            </td>
            <td className="py-[10px]">
                <div className="px-[10px]">{email}</div>

            </td>

        </tr>
    )
}
