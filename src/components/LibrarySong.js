import React from "react";

const LibrarySong = ({
  song,
  songs,
  isPlaying,
  audioRef,
  setCurrentSong,
  setSongs,
}) => {
  const songUpdate = async () => {
    const newInd = songs.findIndex((s) => s.id === song.id);
    await setCurrentSong(songs[newInd]);
    if (isPlaying) audioRef.current.play();
    setSongs(
      songs.map((s, i) => {
        if (i === newInd) return { ...s, active: true };
        else return { ...s, active: false };
      })
    );
  };
  return (
    <div
      onClick={songUpdate}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.image} alt={song.name}></img>
      <div className="library-song-info">
        <h3 className="library-name">{song.name}</h3>
        <h4 className="library-artist">{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
