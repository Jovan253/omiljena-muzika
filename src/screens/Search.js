import { useState, useEffect } from "react";
import Header from "./Header";
import { addSong } from "../utils/SongDB";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [token, setToken] = useState(null);

  const getToken = async () => {
    const res = await fetch("http://localhost:4000/spotify-token");
    const data = await res.json();
    setToken(data.access_token);
    // refresh a bit before expiry
    setTimeout(getToken, (data.expires_in - 60) * 1000);
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch Spotify API");

      const data = await res.json();
      const mappedResults = data.tracks.items.map((track) => ({
        // id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        url: track.external_urls.spotify,
        image: track.album.images[0]?.url || "",
      }));
      setResults(mappedResults);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (song, list) => {
    try {
      await addSong(song, list);
      // alert(`Added to ${list}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="App">
      <Header />

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="results">
        {results.map((song, index) => (
          <div key={index} className="result-item">
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
            <span>
              <a href={song.url} target="_blank" rel="noopener noreferrer">
                {song.title}
              </a>{" "}
              - {song.artist}
            </span>
            <button onClick={() => handleAdd(song, "K")}>Kikica</button>
            <button onClick={() => handleAdd(song, "M")}>Mrvica</button>
          </div>
        ))}
      </div>
    </div>
  );
}
