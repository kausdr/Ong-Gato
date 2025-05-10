// fazer as chamadas api de usuário aqui
import axios from "axios"
import { User } from "./user"

const link: string = 'http://localhost:8081/donation'


export interface Donation {
    id: number
    amount: number
    date: string
    donator: User
    type: string
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

    static async createDonation(newUser: Donation): Promise<[Donation | null, any]> {
        try {
            const response = await axios.post(link, newUser)
            return [response.data, null]

        } catch (error) {
            console.log("erro ao criar doação " + error)
            return [null, error]
        }
    }




}