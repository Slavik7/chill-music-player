import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  songInfo,
  setSongInfo,
  audioRef,
  isPlaying,
  setIsPlaying,
}) => {
  //handlers
  const playHandler = (e) => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const dragTimeHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipSong = async () => {
    const ind = songs.findIndex((song) => song.id === currentSong.id);
    const newInd = (ind + 1) % songs.length;
    await setCurrentSong(songs[newInd]);
    if (isPlaying) audioRef.current.play();
    setActiveSong(newInd);
  };
  const prevSong = async () => {
    const ind = songs.findIndex((song) => song.id === currentSong.id);
    const newInd = ind - 1 > -1 ? ind - 1 : songs.length - 1;
    await setCurrentSong(songs[newInd]);
    if (isPlaying) audioRef.current.play();
    setActiveSong(newInd);
  };
  // getting an regular time format min:sec (exp: 02:23)
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${("0" + Math.floor(time % 60)).slice(-2)}`;
  const setActiveSong = (index) => {
    setSongs(
      songs.map((song, i) => {
        if (i === index) return { ...song, active: true };
        else return { ...song, active: false };
      })
    );
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragTimeHandler}
        ></input>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="player-controls">
        <FontAwesomeIcon onClick={prevSong} icon={faChevronLeft} size="2x" />
        <FontAwesomeIcon
          onClick={playHandler}
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon onClick={skipSong} icon={faChevronRight} size="2x" />
      </div>
    </div>
  );
};

export default Player;
