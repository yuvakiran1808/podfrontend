import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPodcast } from "../admin/helper/adminapicalls";
import Menu from "../core/Menu";


const Admindashboard = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    speaker: "",
    category: "",
    type: "",
  });

  const [file,setFile] = useState(null);


  const { name, description, speaker, category, type} = values;

  //function to update files
  const handleChangeFile = (event)=>{
    console.log(event);
     setFile(event.target.files[0]);
  }
//function to update values
  const handleChange = (name) => (event) => {
     setValues({ ...values,[name] : event.target.value});
  };



  // submithandler
  const onSubmitHandler = (event) => {
    console.log("hello")
    event.preventDefault();
    toast("The file is uploading this will take some time", {
      type: "success",
      theme: "dark",
      toastId: "1",
    })
    const formData = new FormData();
    formData.append("name",name);
    formData.append("description",description);
    formData.append("speaker",speaker);
    formData.append("category",category);
    formData.append("type",type);
    formData.append("video",file);

    setValues({...values,error : ""});
    createPodcast(user._id, token, formData).then((data) => {
      if (data.error) {
       
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          name: "",
          description: "",
          speaker: "",
          category: "",
          type: "",
          media:"",
        });
      }
    });
  };

  return (
    <div>
     <Menu />
      <h1 className="h3 text-center mt-3">Welcome to the admin Dashboard</h1>
      <form  method="post" encType="multipart/form-data" className="col-md-6 mx-auto">
        <div className="p-2">
          <label htmlFor="email" className="py-2 h6">
            Enter podcast name:
          </label>
          <input
            type="text"
            placeholder="name"
            className="form-control border border-dark py-2"
            id="name"
            required
            name="name"
            onChange={handleChange("name")}
            value={name}
          />
        </div>
        <div className="p-2">
          <label htmlFor="email" className="py-2 h6">
            Enter Description:
          </label>
          <textarea
            placeholder="Description"
            className="form-control border border-dark py-2"
            id="description"
            name="description"
            required
            onChange={handleChange("description")}
            value={description}
          />
        </div>
        <div className="p-2">
          <label htmlFor="email" className="py-2 h6">
            Enter podcast speaker:
          </label>
          <input
            type="text"
            name = "speaker"
            placeholder="speaker"
            className="form-control border border-dark py-2"
            id="speaker"
            required
            onChange={handleChange("speaker")}
            value={speaker}
          />
        </div>
        <div className="p-2">
          <label htmlFor="email" className="py-2 h6">
            Enter podcast category:
          </label>
          <input
            type="text"
            name = "category"
            placeholder="category"
            className="form-control border border-dark py-2"
            id="speaker"
            required
            onChange={handleChange("category")}
            value={category}
          />
        </div>
        <div className="p-2">
          <label htmlFor="email" className="py-2 h6">
            Enter podcast type:
          </label>
          <input
            type="text"
            name="type"
            placeholder="type"
            className="form-control border border-dark py-2"
            id="speaker"
            required
            onChange={handleChange("type")}
            value={type}
          />
        </div>
        <div className="p-2">
          <input
            type="file"
            accept="audio/*,video/*"
            name="video"
            className="form-control border border-dark py-2"
            required
            onChange={handleChangeFile}
          />
        </div>
        <div className="p-2 text-center mb-4">
          <button className="btn btn-success" onClick={onSubmitHandler}>
            Add Podcast
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Admindashboard;
