// fazer as chamadas API de doações aqui
import api from './axiosConfig'; 

const link: string = '/donation';

export interface DonatorInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Donation {
    id: number
    amount: number
    date: string
    type: 'DINHEIRO' | 'ROUPA' | 'ALIMENTO' | 'BRINQUEDO'
    donator: DonatorInfo
}

export interface CreateDonationPayload {
    amount: number;
    type: 'DINHEIRO' | 'ROUPA' | 'ALIMENTO' | 'BRINQUEDO';
    donator: number;
}

export class DonationService {

    static async getDonations(): Promise<[Donation[] | null, any]> {
        try {
            const response = await api.get(link)
            return [response.data, null]

        } catch (error) {
            console.log("Erro ao chamar doações: " + error)
            return [null, error]
        }

    }

    static async createDonation(payload: CreateDonationPayload): Promise<[Donation | null, any]> {
        try {
            const response = await api.post(link, payload)
            return [response.data, null]

        } catch (error) {
            console.log("Erro ao criar doação: " + error)
            return [null, error]
        }
    }

    static async deleteDonation(id: number): Promise<[boolean, any]> {
        try {
            await api.delete(`${link}/${id}`)
            return [true, null]

        } catch (error) {
            console.log("Erro ao deletar doação: " + error)
            return [false, error]
        }
    }

    static async updateDonation(id: number, data: Partial<Donation>): Promise<[Donation | null, any]> {
        try {
            const response = await api.patch(`${link}/${id}`, data)
            return [response.data, null]

        } catch (error) {
            console.log("Erro ao atualizar doação: " + error)
            return [null, error]
        }
    }
}