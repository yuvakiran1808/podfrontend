import React, { useState, useRef } from "react";



const Player = ({api,currentpodcast,podname}) => {

  
   var url = `${api}${currentpodcast?currentpodcast:""}`;


  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({ currentTime: "",duration : ""});

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    setSongInfo({ currentTime: current,duration: e.target.duration});
  };

  const togglePlay = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const getTime = (time)=>{
    return(
    Math.floor(time/60)+ ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
};

  return (
    <div className="container bg-dark p-3 rounded border border-success border-5">
        <h6 className="text-white">{podname}</h6>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={url}
      />
      <div className="d-flex  text-white">
        <p>0:00</p>
      <input
        type="range"
        min={0}
        max={songInfo.duration?(songInfo.duration):"0:00"}
        value={songInfo.currentTime}
        className="form-range w-100 mb-3"
        step="0.5"
        readOnly
      />
      <p>{songInfo.duration?getTime(songInfo.duration):"0:00"}</p>
      </div>
      
       <button className="btn btn-success" onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default Player;
