// fazer as chamadas api de usuário aqui
import axios from "axios"
import { User } from "./user"

const link: string = 'http://localhost:8081/donation'

export interface TypeDonation {
    id: number;
    name: string;
}

export interface Donation {
    id?: number
    amount: number
    date: string
    donatorId?: number
    donator: User
    typeId?: number
    type: TypeDonation
}

export class DonationService {
    static async getDonations(): Promise<[Donation[] | null, any]> {
        try {
            const response = await axios.get(link)
            return [response.data, null]

        } catch (error) {
            console.log("erro ao chamar doações " + error)
            return [null, error]
        }

    }

    static async createDonation(donation: Donation): Promise<[Donation | null, any]> {
        try {
            const response = await axios.post(link, donation)
            return [response.data, null]

        } catch (error) {
            console.log("erro ao criar doação " + error)
            return [null, error]
        }
    }




}