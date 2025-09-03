import { createContext, useContext, useState } from "react";

const SongContext = createContext();

export function SongProvider({ children }) {
  const [songsK, setSongsK] = useState([]);
  const [songsM, setSongsM] = useState([]);

  const addSong = (song, listType) => {
    if (listType === "K") {
      if (songsK.length >= 5) return alert("K is full, delete one first!");
      setSongsK([...songsK, song]);
    } else {
      if (songsM.length >= 5) return alert("M is full, delete one first!");
      setSongsM([...songsM, song]);
    }
  };

  const deleteSong = (id, listType) => {
    if (listType === "K") {
      setSongsK(songsK.filter((s) => s.id !== id));
    } else {
      setSongsM(songsM.filter((s) => s.id !== id));
    }
  };

  return (
    <SongContext.Provider value={{ songsK, songsM, addSong, deleteSong }}>
      {children}
    </SongContext.Provider>
  );
}

export function useSongs() {
  return useContext(SongContext);
}
