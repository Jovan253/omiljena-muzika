import Header from "./Header";
import { getSongs, deleteSong } from "../utils/SongDB";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function List() {
  const [songsK, setSongsK] = useState([]);
  const [songsM, setSongsM] = useState([]);

  useEffect(() => {
    async function loadSongs() {
      const allSongs = await getSongs();
      setSongsK(allSongs.filter((s) => s.list == "K"));
      setSongsM(allSongs.filter((s) => s.list == "M"));
    }
    loadSongs();
  }, []);

  const handleDelete = async (id) => {
    await deleteSong(id);
    const allSongs = await getSongs();
    setSongsK(allSongs.filter((s) => s.list === "K"));
    setSongsM(allSongs.filter((s) => s.list === "M"));
  };

  return (
    <div className="App">
      <Header />

      <div className="sections">
        <div className="section">
          <h3>Kikica:</h3>
          <ul>
            {songsK.map((song) => (
              <li key={song.id}>
                <img
                  src={song.image}
                  alt={song.title}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <a href={song.url} target="_blank" rel="noopener noreferrer">
                  {song.title}
                </a>&nbsp;
                - {song.artist}
                <button onClick={() => handleDelete(song.id)}><FontAwesomeIcon icon={faTrash} color="white"/></button>
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Mrvica:</h3>
          <ul className="list-items">
            {songsM.map((song) => (
              <li key={song.id}>
                <img
                  src={song.image}
                  alt={song.title}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <a href={song.url} target="_blank" rel="noopener noreferrer">
                  {song.title}
                </a>&nbsp;
                - {song.artist}
                <button onClick={() => handleDelete(song.id)}><FontAwesomeIcon icon={faTrash} color="white"/></button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
