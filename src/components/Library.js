import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
  libraryActive,
}) => {
  return (
    <div className={`library ${libraryActive ? "library-open" : ""}`}>
      <h2>Library</h2>
      {songs.map((song) => (
        <LibrarySong
          song={song}
          key={song.id}
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
        />
      ))}
    </div>
  );
};

export default Library;
