import React, { useState, useRef } from "react";
//data
import getData from "./data";
//style
import "./styles/app.scss";

//components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  //States
  const [songs, setSongs] = useState(getData());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryActive, setLibraryActive] = useState(false);
  //Ref's
  const audioRef = useRef(null);
  //update the time of the song, current and duration
  const timeUpdate = (e) => {
    setSongInfo({
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });
  };
  const songUpdate = async () => {
    const ind = songs.findIndex((song) => song.id === currentSong.id);
    const newInd = (ind + 1) % songs.length;
    await setCurrentSong(songs[newInd]);
    if (isPlaying) audioRef.current.play();
    setSongs(
      songs.map((song, i) => {
        if (i === newInd) return { ...song, active: true };
        else return { ...song, active: false };
      })
    );
  };
  //nav
  //song
  //player
  //libarary

  return (
    <div className={`App ${libraryActive ? "library-is-open" : ""}`}>
      <Nav libraryActive={libraryActive} setLibraryActive={setLibraryActive} />
      <Song isPlaying={isPlaying} currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        songs={songs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        songs={songs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryActive={libraryActive}
      />
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={timeUpdate}
        onTimeUpdate={timeUpdate}
        onEnded={songUpdate}
      ></audio>
    </div>
  );
}

export default App;
