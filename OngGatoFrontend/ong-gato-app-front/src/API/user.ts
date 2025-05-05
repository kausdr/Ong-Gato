// fazer as chamadas api de usuário aqui
import axios from "axios"

const link: string = 'http://localhost:5173/user'

export class UserService {
    static async getUsers(): Promise<[any, any]> {
        try {
            const response = await axios.get("http://localhost:8080/user")
            return [response.data, null]

        } catch (error) {
            console.log("erro chamada user " + error)
            return [null, error]
        }

    }


}