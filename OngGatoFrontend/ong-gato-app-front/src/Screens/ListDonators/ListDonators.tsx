import Card from "../../Components/Layout/Card"
import { Outlet } from "react-router-dom";
import { ListDonatorsItem } from "./ListDonatorsItem";
import { Donation, DonationService } from "../../API/donation";
import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import Placeholder from "../../Components/Layout/Placeholder";
import { EditDonationModal } from './EditDonationModal';
import { useToast } from '../../Contexts/ToastContext';

export const ListDonators: React.FC = () => {
    const [ donations, setDonations] = useState<Donation[]>([])
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { showToast } = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDonation, setEditingDonation] = useState<Donation | null>(null);

    useEffect(() => {
        const fetchDonations = async () => {

            if (!user?.isAdmin) {
                setLoading(false);
                return;
            }

            try {
                const [response, error] = await DonationService.getDonations()
                if (response && Array.isArray(response)) {
                    setDonations(response);
                } else {
                    setDonations([]);
                    if (error) {
                         console.error("Erro ao buscar doações (no serviço):", error);
                    } else if (response) {
                        console.error("Erro: A API não retornou um array de doações.", response);
                    }
                }
            } catch (err) {
                console.error("Falha catastrófica ao buscar doações:", err);
                setDonations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations()
    }, [user])

    const handleOpenEditModal = (donation: Donation) => {
        setEditingDonation(donation);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingDonation(null);
    };

    const handleDonationUpdated = (updatedDonation: Donation) => {
        setDonations(prevDonations =>
            prevDonations.map(d => (d.id === updatedDonation.id ? updatedDonation : d))
        );
    };

    const handleDeleteDonation = async (donationId: number) => {

        if (!window.confirm('Tem certeza que deseja excluir esta doação? Esta ação não pode ser desfeita.')) {
            return;
        }

        const [success, error] = await DonationService.deleteDonation(donationId);

        if (success) {
            setDonations(prevDonations => prevDonations.filter(d => d.id !== donationId));
            showToast('Doação excluída com sucesso!', 'success');
        } else {
            showToast(`Erro ao excluir doação: ${error?.message || 'Tente novamente.'}`, 'error');
        }
    };

    if (loading) {
        return <Placeholder />;
    }

    return (
        <>
            <Card>
                <div className="flex flex-col w-full h-full gap-5 p-10 " style={{ backgroundColor: "var(--bg-color)" }}>
                    <h1 className="font-bold text-xl " style={{ color: "var(--title-color)" }}>Lista de Doações</h1>
                    <div className="overflow-x-auto rounded-md">
                        <table className="w-full">
                            <thead className="text-left" style={{ backgroundColor: "var(--thead-color)", color: "var(--thead-text-color)" }}>
                                <tr>
                                    <th className="py-[20px] px-[10px]">Nome do Doador</th>
                                    <th className="py-[20px] px-[10px]">E-mail</th>
                                    <th className="py-[20px] px-[10px]">Tipo de Doação</th>
                                    <th className="py-[20px] px-[10px]">Quantidade/Valor</th>
                                    <th className="py-[20px] px-[10px]">Data</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((donation) => (
                                    <ListDonatorsItem
                                        key={donation.id}
                                        donation={donation}
                                        onEdit={handleOpenEditModal}
                                        onDelete={handleDeleteDonation}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Outlet />
                </div> 
            </Card>
            
            <EditDonationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                donation={editingDonation}
                onDonationUpdated={handleDonationUpdated}
            />
        </>
    );
};
