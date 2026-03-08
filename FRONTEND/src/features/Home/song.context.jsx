import { createContext, useState } from "react";
export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
    const [song, setsong] = useState({
   
  "url": "https://ik.imagekit.io/gge3o5li3/project/moodiefy/songs/Pyaar_Hai_M5urp9IQK",
  "postUrl": "https://ik.imagekit.io/gge3o5li3/project/moodiefy/poster/Pyaar_Hai_GW3FaW9iP",
  "title": "Pyaar Hai",
  "mood": "sad", 
    })

    const [loading, setloading] = useState(false)

    return(
        <SongContext.Provider value={{song, setsong, loading, setloading}}>
            {children}
        </SongContext.Provider>

    )


}