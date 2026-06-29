import { instance as axios, instance_auth as axiosAuth } from "../plugins/axios";

class AuthService {
    async login(user) {
        try {
            const response = await axios.post("auth/login", user);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Error de conexión";
            throw new Error(message);
        }
    }

    async register(new_user) {
        try {
            const response = await axios.post("auth/register", new_user);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Error de conexión";
            throw new Error(message);
        }
    }

    async getMe() {
        try {
            const response = await axiosAuth.get("auth/me");
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al obtener usuario");
        }
    }

    async getMyMovements() {
        try {
            const response = await axiosAuth.get("mis");
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Error al obtener movimientos");
        }
    }
}

export default AuthService;