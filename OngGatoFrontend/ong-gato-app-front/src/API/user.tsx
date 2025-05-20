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

    id?: number
    name: string
    birthDate: string
    telephone: string
    zipCode: string
    email: string
    address: string
    password: string
    userTypeID?: number
    // donations: []
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
            const response = await axios.post("http://localhost:8081/user/create", newUser)
            return [response.data, null]

        } catch (error) {
            console.log("erro criar user " + error)
            return [null, error]
        }
    }


    static async validateEmail(email: string): Promise<[boolean | null, any]> {
        try {
            const response = await axios.get(link + `/validateEmail/${email}`)
            return [response.data, null]

        } catch (error) {
            console.log("erro ao validar e-mail " + error)
            return [null, error]
        }
    }

    static async validateCPF(cpf: string): Promise<[boolean | null, any]> {
        try {
            const response = await axios.get(link + `/validateCPF/${cpf}`)
            return [response.data, null]

        } catch (error) {
            console.log("erro ao validar e-mail " + error)
            return [null, error]
        }
    }
}