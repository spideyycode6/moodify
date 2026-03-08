import { getSong } from "../services/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

const useSong = () => {
    const context = useContext(SongContext);

    const { song, setsong, loading, setloading } = context;

    async function handleGetSong({ mood }) {
        setloading(true);
        try {
            const data = await getSong({ mood });
            // Backend returns { message, isMood } — the song is inside isMood
            if (data.isMood) {
                setsong(data.isMood);
            }
        } catch (err) {
            console.error('Failed to fetch song for mood:', mood, err);
        } finally {
            setloading(false);
        }
    }

    return { song, loading, handleGetSong };
}

export default useSong;