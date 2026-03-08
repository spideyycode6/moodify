import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export async function register({ email, password, username }) {
    const response = await api.post('/api/users/register', {
        email, username, password
    });

    return response.data
};


export async function login({ username, email, password }) {
    const response = await api.post('/api/users/login', {
        username, email, password
    });

    return response.data

}


export async function getMe() {
    const response = await api.get('/api/users/get-me');
    return response.data
}

export async function logout() {
    const response = await api.get('/api/users/logout');
    return response.data
}



