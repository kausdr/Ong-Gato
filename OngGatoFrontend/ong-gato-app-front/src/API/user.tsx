// Fazer as chamadas API de usuário aqui
import api from './axiosConfig'; 

const link: string = '/user'; 

export interface User {
    id?: number
    firstName?: string;
    lastName?: string;
    cpf?: string
    telephone?: string
    zipCode?: string
    email?: string
    address?: string
    password?: string
    userTypeID?: number
    isAdmin?: boolean
    profilePicture?: string;
}

export class UserService {

    static async getUsers(): Promise<[User[] | null, any]> {
        try {
            const response = await api.get(link)
            return [response.data, null]

        } catch (error) {
            console.log("Erro na chamada de usuários: " + error)
            return [null, error]
        }
    }

    static async getCurrentUser(): Promise<[User | null, any]> {
        try {
            const response = await api.get(link + `/me`)
            return [response.data, null]

        } catch (error) {
            console.log("Erro ao buscar perfil do usuário: ", error)
            return [null, error]
        }
    }

    static async createUser(newUser: User): Promise<[User | null, any]> {
        try {
            const response = await api.post(link + `/create`, newUser)
            return [response.data, null]

        } catch (error) {
            console.log("Erro ao criar usuário: " + error)
            return [null, error]
        }
    }

    static async updateProfile(data: any): Promise<[any, any]> {
        try {
            const token = localStorage.getItem('token')
            const response = await api.put(link + `/me`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return [response.data, null]

        } catch (error: any) {
            console.log("Erro ao atualizar perfil: " + error)
            return [null, error.response?.data || "Erro desconhecido"];
        }
    }

    static async validateEmail(email: string): Promise<[boolean | null, any]> {
        try {
            const response = await api.get(link + `/validateEmail/${email}`)
            return [response.data, null]

        } catch (error) {
            console.log("Erro ao validar e-mail: " + error)
            return [null, error]
        }
    }

    static async validateCPF(cpf: string): Promise<[boolean | null, any]> {
        try {
            const response = await api.get(link + `/validateCpf/${cpf}`)
            return [response.data, null]

        } catch (error) {
            console.log("Erro ao validar CPF: " + error)
            return [null, error]
        }
    }

    static async login(email: string, password: string): Promise<[any | null, any]> {
        try {
            const response = await api.post(link + `/login`, {
                email,
                password
            })
            return [response.data, null]

        } catch (error) {
            console.log("Erro ao fazer login: ", error)
            return [null, error]
        }
    }

    static async deleteUser(id: number): Promise<[null, any]> {
        try {
            await api.delete(link + `/${id}`);
            return [null, null]

        } catch (error) {
            console.log("Erro ao deletar usuário: ", error)
            return [null, error]
        }
    }

    static async updateUserRole(id: number): Promise<[User | null, any]> {
        try {
            const response = await api.put(link + `/${id}/role`);
            return [response.data, null]

        } catch (error) {
            console.log("Erro ao atualizar cargo do usuário: ", error)
            return [null, error]
        }
    }
}