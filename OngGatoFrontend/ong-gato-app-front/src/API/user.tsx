// fazer as chamadas api de usuário aqui
import axios from "axios"

const link: string = 'http://localhost:8081/user'

export interface User {
    id?: number
    name?: string
    birthDate?: string
    cpf?: string
    telephone?: string
    zipCode?: string
    email?: string
    address?: string
    password?: string
    userTypeID?: number
    cargo?: string
}

export class UserService {

    static async getUsers(): Promise<[User[] | null, any]> {
        try {
            const response = await axios.get(link)
            return [response.data, null]

        } catch (error) {
            console.log("erro na chamada de usuario: " + error)
            return [null, error]
        }
    }

    static async createUser(newUser: User): Promise<[User | null, any]> {
        try {
            const response = await axios.post(link + `/create`, newUser)
            return [response.data, null]

        } catch (error) {
            console.log("erro ao criar usuario: " + error)
            return [null, error]
        }
    }

    static async loginUser(email: string, password: string): Promise<[any | null, any]> {
        try {
            const response = await axios.post(link + `/login`, {
                email,
                password
            })
            return [response.data, null]
        } catch (error) {
            console.log("erro ao fazer login " + error)
            return [null, error]
        }
    }


    static async validateEmail(email: string): Promise<[boolean | null, any]> {
        try {
            const response = await axios.get(link + `/validateEmail/${email}`)
            return [response.data, null]

        } catch (error) {
            console.log("erro ao validar e-mail: " + error)
            return [null, error]
        }
    }

    static async validateCPF(cpf: string): Promise<[boolean | null, any]> {
        try {
            const response = await axios.get(link + `/validateCPF/${cpf}`)
            return [response.data, null]

        } catch (error) {
            console.log("erro ao validar CPF: " + error)
            return [null, error]
        }
    }

    static async login(email: string, password: string): Promise<[any | null, any]> {
        try {
            const response = await axios.post(link + `/login`, {
                email,
                password
            })
            localStorage.setItem('token', response.data.token)
            return [response.data, null]

        } catch (error) {
            console.log("Erro ao fazer login: ", error)
            return [null, error]
        }
    }
}

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})