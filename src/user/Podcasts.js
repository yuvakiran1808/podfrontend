import React, { useEffect, useState } from "react";
import { getAllPodcasts } from "../admin/helper/adminapicalls";
import image from "../images/podcast.jpg";
import Player from "./Player";
import Menu from "../core/Menu";
const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [currentpodcast, setCurrentpodcast] = useState();
  const [podname, setPodname] = useState();
  const api = "https://podcastbackend.onrender.com/";

  //function to search
  const handleSearch = (e) => {
    if (e.target.value.trim() === "") {
      setFilteredPodcasts(podcasts);
    } else {
      const searchedItems = podcasts.filter((eachpodcast) =>
        eachpodcast.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredPodcasts(searchedItems);
    }
  };

  //function to load all podcasts
  const loadAllPodcasts = () => {
    getAllPodcasts().then((data) => {
      if (!data.error) {
        setPodcasts(data);
        setFilteredPodcasts(data);
        setCurrentpodcast(data[0].audio);
        setPodname(data[0].name);
      }
    });
  };

  useEffect(() => {
    loadAllPodcasts();
  }, []);

  //to set current podcast
  const onclickhandler = (e) => {
    setCurrentpodcast(e.audio);
    setPodname(e.name);
  };

  return (
    <>
      <Menu />
      <div className="container px-3 mt-5">
        <h5>Search for your Favourite podcasts : </h5>
        <div className="row">
          <div className="col-md-12 mb-4">
            <input
              type="text"
              className="form-control border border-success border-2"
              placeholder="search"
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="row">
          <div className="text-center mb-4">
            <Player
              api={api}
              currentpodcast={currentpodcast}
              podname={podname}
            />
          </div>
          <h1 className="h3 text-center mt-3">Audio Podcasts</h1>

          {filteredPodcasts.map((podcast, index) => {
            return (
              podcast.audio !== "" && (
                <div className="col-md-4" key={index}>
                  <div className="card mb-3">
                    <img
                      src={image}
                      className="card-img-top"
                      alt="podcastImage"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{podcast.name}</h5>
                      <p className="card-text">{podcast.description}</p>

                      <h5>
                        <span className="badge bg-success">
                          Speaker : {podcast.speaker}
                        </span>
                      </h5>

                      <h5>
                        <span className="badge bg-success">
                          Type : {podcast.type}
                        </span>
                      </h5>
                      <div className="text-center">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => {
                            onclickhandler(podcast);
                          }}
                        >
                          Select and Play
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="row">
          <h1 className="h3 text-center mt-3 mb-3">video Podcasts</h1>
          {filteredPodcasts.map((podcast, index) => {
            return (
              podcast.audio === "" && (
                <div className="col-md-4" key={index}>
                  <div className="card mb-3">
                    <video src={`${api}${podcast.video}`} controls></video>
                    <div className="card-body">
                      <h5 className="card-title">{podcast.name}</h5>
                      <p className="card-text">{podcast.description}</p>

                      <h5>
                        <span className="badge bg-success">
                          Speaker : {podcast.speaker}
                        </span>
                      </h5>
                      <h5>
                        <span className="badge bg-success">
                          Type : {podcast.type}
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="row">
          <h1 className="h4 text-center mt-3">Popular Audio Podcasts</h1>

          {filteredPodcasts.map((podcast, index) => {
            return (
              podcast.audio !== "" &&
              podcast.ispopular && (
                <div className="col-md-4" key={index}>
                  <div className="card mb-3">
                    <img
                      src={image}
                      className="card-img-top"
                      alt="podcastImage"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{podcast.name}</h5>
                      <p className="card-text">{podcast.description}</p>

                      <h5>
                        <span className="badge bg-success">
                          Speaker : {podcast.speaker}
                        </span>
                      </h5>

                      <h5>
                        <span className="badge bg-success">
                          Type : {podcast.type}
                        </span>
                      </h5>
                      <div className="text-center">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => {
                            onclickhandler(podcast);
                          }}
                        >
                          Select and Play
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="row">
          <h1 className="h4 text-center mt-3 mb-3">Popular video Podcasts</h1>
          {filteredPodcasts.map((podcast, index) => {
            return (
              podcast.audio === "" &&
              podcast.ispopular && (
                <div className="col-md-4" key={index}>
                  <div className="card mb-3">
                    <video src={`${api}${podcast.video}`} controls></video>
                    <div className="card-body">
                      <h5 className="card-title">{podcast.name}</h5>
                      <p className="card-text">{podcast.description}</p>

                      <h5>
                        <span className="badge bg-success">
                          Speaker : {podcast.speaker}
                        </span>
                      </h5>
                      <h5>
                        <span className="badge bg-success">
                          Type : {podcast.type}
                        </span>
                      </h5>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Podcasts;
