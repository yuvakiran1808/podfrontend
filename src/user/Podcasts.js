import React, { useEffect, useState } from "react";
import { getAllPodcasts } from "../admin/helper/adminapicalls";
import image from "../images/podcast.jpg";
// import image1 from "../images/podcast1.png";
import image2 from "../images/podcast2.jpg";
import image3 from "../images/podcast3.jpg";
import image4 from "../images/podcast4.jpg";
import image5 from "../images/podcast5.jpg";

import Player from "./Player";
import Menu from "../core/Menu";
const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [currentpodcast, setCurrentpodcast] = useState();
  const [podname, setPodname] = useState();
  const api = "https://podbackend-production.up.railway.app/";
  // const [favoritePodcasts, setFavoritePodcasts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log(selectedCategory);

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

  //  function to handle the favourite podcast

  // const handleFavoriteClick = (podcastId) => {
  //   if (favoritePodcasts.includes(podcastId)) {
  //     // Remove from favorites
  //     const updatedFavorites = favoritePodcasts.filter((id) => id !== podcastId);
  //     setFavoritePodcasts(updatedFavorites);
  //   } else {
  //     // Add to favorites
  //     const updatedFavorites = [...favoritePodcasts, podcastId];
  //     setFavoritePodcasts(updatedFavorites);
  //   }
  // };

  const images = [image3, image2, image3, image4, image5, image2];

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

          <div className="row py-3">
            <h5>Filter podcast by category:</h5>
            <div className="col-md-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-control"
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Science">Science</option>
                <option value="Science">Education</option>
                <option value="Science">History</option>
                <option value="Science">Sports</option>
                {/* Add more category options as needed */}
              </select>
            </div>
          </div>

          {filteredPodcasts.map((podcast, index) => {
            return (
              podcast.audio !== "" &&
              (podcast.category === selectedCategory || selectedCategory==="" )&& (
                <div className="col-md-4" key={index}>
                  <div className="card mb-3">
                    <img
                      src={images[index % images.length]}
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
                      <h5>
                        <span className="badge bg-success">
                          Category : {podcast.category}
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
