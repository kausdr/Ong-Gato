import React from 'react';
import { Donation } from '../../API/donation';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface ListDonatorsItemProps {
    donation: Donation;
    onEdit: (donation: Donation) => void;
    onDelete: (donationId: number) => void;
}

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
};

export const ListDonatorsItem: React.FC<ListDonatorsItemProps> = ({ donation, onEdit, onDelete }) => {

    const fullName = `${donation.donator.firstName} ${donation.donator.lastName}`;

    return (
        <tr className="text-slate-900 border-b-1 border-gray-100 hover:bg-gray-50">
            <td className="py-3 px-2">{fullName}</td>
            <td className="py-3 px-2">{donation.donator.email}</td>
            <td className="py-3 px-2">{donation.type}</td>
            <td className="py-3 px-2">{donation.amount}</td>
            <td className="py-3 px-2">{formatDate(donation.date)}</td>
            <td className="py-3 px-2 text-center">
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => onEdit(donation)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        title="Editar"
                    >
                        <FaEdit size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(donation.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        title="Excluir"
                    >
                        <FaTrash size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};
