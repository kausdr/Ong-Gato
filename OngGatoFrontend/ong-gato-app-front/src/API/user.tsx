// fazer as chamadas api de usuário aqui
import axios from "axios"

const link: string = 'http://localhost:8081/user'


export interface User {
    // public Long Id;
    // public String name;
    // public Date birthDate;
    // public String telephone;
    // public String zipCode;
    // public String email;
    // public String address;
    // public String password;
    // public Long userTypeID;

    id: number
    name: string
    birthDate: Date
    telephone: string
    zipCode: string
    email: string
    address: string
    password: string
    userTypeID: number
}

export class UserService {
    static async getUsers(): Promise<[User[] | null, any]> {
        try {
            const response = await axios.get(link)
            return [response.data, null]

        } catch (error) {
            console.log("erro chamada user " + error)
            return [null, error]
        }

    }

    static async createUser(newUser: User): Promise<[User | null, any]> {
        try {
            const response = await axios.post(link, newUser)
            return [response.data, null]

        } catch (error) {
            console.log("erro criar user " + error)
            return [null, error]
        }
    }




}