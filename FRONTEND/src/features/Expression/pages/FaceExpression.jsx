import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";
import useSong from "../../Home/hooks/useSong";


export default function FaceExpression() {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const animationRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");
    const { handleGetSong } = useSong();

    const moodMap = {
        "Happy": "happy",
        "Sad": "sad",
        "Surprised": "energetic",
        "Neutral": "netural"
    };

    useEffect(() => {
        init({ videoRef, landmarkerRef, streamRef, setExpression });
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    // Watch for expression changes and fetch song
    useEffect(() => {
        if (expression && expression !== "Detecting...") {
            const expressionText = expression.split(" ")[0];
            const mood = moodMap[expressionText] || "calm";
            handleGetSong({ mood });
        }
    }, [expression]);

    const handleDetect = () => {
        detect({ videoRef, landmarkerRef, setExpression });
    };

    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <button onClick={handleDetect} >Detect expression</button>
        </div>
    );
}