import api from "../../../services";

export async function getSong({ mood }) {
    const response = await api.get(`/api/songs-data?mood=${mood}`);
    return response.data;
}