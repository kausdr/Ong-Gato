import React, { useState, useEffect } from 'react';
import { Donation, DonationService } from '../../API/donation';
import Button from '../../Components/Layout/Button';
import { useToast } from '../../Contexts/ToastContext';

const donationTypes = ['DINHEIRO', 'ROUPA', 'ALIMENTO', 'BRINQUEDO'];

interface EditDonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    donation: Donation | null;
    onDonationUpdated: (updatedDonation: Donation) => void;
}

export const EditDonationModal: React.FC<EditDonationModalProps> = ({ isOpen, onClose, donation, onDonationUpdated }) => {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'DINHEIRO' | 'ROUPA' | 'ALIMENTO' | 'BRINQUEDO'>('DINHEIRO');
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        if (donation) {
            setAmount(donation.amount.toString());
            setType(donation.type);
        }
    }, [donation]);

    if (!isOpen || !donation) {
        return null;
    }

    const fullName = `${donation.donator.firstName} ${donation.donator.lastName}`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const updatedData = {
            amount: Number(amount),
            type: type,
        };

        const [response, error] = await DonationService.updateDonation(donation.id, updatedData);

        if (response) {
            onDonationUpdated(response);
            showToast('Doação atualizada com sucesso!', 'success');
            onClose();
        } else {
            showToast(`Erro ao atualizar: ${error?.message || 'Tente novamente.'}`, 'error');
        }
        setIsLoading(false);
    };

    return (
        <div className="dark custom-modal-bg fixed inset-0 flex justify-center items-center z-50">
            <div className="dark custom-modal p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4" style={{color: "var(--title-color)"}}>Editar Doação</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block  text-sm font-bold mb-2" htmlFor="donatorName"  style={{ color: "var(--text-color)" }}>
                            Doador
                        </label>
                        <input
                            id="donatorName"
                            type="text"
                            value={fullName}
                            className="dark custom-input-block shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            disabled
                            style={{color: "var(--text-color)"}}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="donationType"  style={{ color: "var(--text-color)" }}>
                            Tipo de Doação
                        </label>
                        <select
                            id="donationType"
                            value={type}
                            onChange={(e) => setType(e.target.value as any)}
                            className="shadow border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            style={{backgroundColor: "var(--bg-color)", color: "var(--text-color)"}}
                        >
                            {donationTypes.map(typeOption => (
                                <option key={typeOption} value={typeOption}>{typeOption}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="amount"  style={{ color: "var(--text-color)" }}>
                            Quantidade/Valor
                        </label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            style={{backgroundColor: "var(--bg-color)", color: "var(--text-color)"}}
                        />
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancelar
                        </Button>
                        <Button
                            order="primary"
                            type="submit"
                            isLoading={isLoading}
                        >
                            Salvar Alterações
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};