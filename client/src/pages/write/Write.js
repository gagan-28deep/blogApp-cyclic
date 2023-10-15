import React, { useState } from "react";
import "./write.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Write = () => {
  const { user, dispatch } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadFile, setuploadFile] = useState(null);
  const navigate = useNavigate();

  // Handle Publish
  const handlePublish = async () => {
    const pubBtn = document.querySelector(".writeSubmit");
    pubBtn.style.display = "none";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const newData = {
      //   username: user?.username,
      //   title,
      //   description,
      //   photo: uploadFile,
      // };
      // console.log("Request to server from Write page", user);
      // console.log("data", newData);

      let res = await axios.post(
        "/api/v1/post",
        {
          username: user?.user.username,
          title,
          description,
          photo: uploadFile ? uploadFile.name : user.profilePic,
        }
      );
      if (uploadFile) {
        try {
          const data = new FormData();
          // console.log("data", data);
          const fileName = uploadFile.name;
          // console.log("filename", fileName);
          data.append("name", fileName);
          data.append("uploadFile", uploadFile);
          res.photo = fileName;
          // const uploadRes=await axios.post("/api/v1/upload", data);
          axios.post(
            "/api/v1/upload",
            data
          );
          if (res.status === 200) {
            toast.success("Uploaded successfully");
            console.log("res 46", res.data);
            // navigate("/post/" + res.data.savedPost._id);
            // return
          }
          // else if (res.status == 201) {
          //   toast.success("Post created successfully");
          //   navigate("/post/" + res.data.savedPost._id);
          // }
        } catch (err) {
          if (err.message == "Request failed with status code 500") {
            toast.error("Internal Server error");
          } else if (err.message == "Request failed with status code 400") {
            toast.error("Bad request");
          }
          console.log(err);
        }
      }
      console.log("Response from server", res);
      if (res.status == 201) {
        toast.success("Post created successfully");
        navigate("/post/" + res.data.savedPost._id);
      }
    } catch (err) {
      if (err) {
        const pubBtn = document.querySelector(".writeSubmit");
        pubBtn.style.display = "block";
      }
      if (err.message == "Request failed with status code 500") {
        toast.error("Internal Server error");
      } else if (err.message == "Request failed with status code 400") {
        toast.error("Bad request");
      }
      console.log(err);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newData = {
  //     username: user?.username,
  //     title,
  //     description,
  //     photo: uploadFile,
  //   };
  //   console.log("Request to backend", user);
  //   console.log("/api/v1/post", newData);
  // if (uploadFile) {
  //   const data = new FormData();
  //   const filename = uploadFile.name;
  //   data.append("name", filename);
  //   data.append("uploadFile", uploadFile);
  //   newData.photo = filename;

  //   await axios.post("/api/v1/upload", data);
  // axios
  //   .post("http://localhost:4000/api/v1/post", newData)
  //   .then((res) => {
  //     window.location.replace = "/post/" + res.data.id;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }
  //   await axios
  //     .post("/api/v1/post", newData)
  //     .then((res) => {
  //       if (res.status == 201) {
  //         toast.success("Post Created Successfully");
  //       }
  //       window.location.href = "post/" + res.data._id;
  //       // navigate("post/" + res.data.id);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       if (err.message == "Request failed with status code 500") {
  //         toast.error("Internal Server Error", {
  //           type: "error",
  //         });
  //       } else if (err.message == "Request failed with status code 504") {
  //         toast.error("Internal Server Error", {
  //           type: "error",
  //         });
  //       }
  //       console.log(err.message);
  //     });
  // };
  return (
    <div className="write">
      {uploadFile && (
        <img
          className="writeImg"
          src={URL.createObjectURL(uploadFile)}
          alt=""
        />
      )}
      <form action="" className="writeForm" onSubmit={handleSubmit}>
        <div>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon far fa-plus"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={(e) => setuploadFile(e.target.files[0])}
              style={{ display: "none" }}
            />

            <input
              className="writeInput "
              placeholder="Title"
              type="text"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="writeSubmit"
              type="submit"
              onClick={handlePublish}
            >
              Publish
            </button>
          </div>
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell Your Story..."
            type="text"
            autoFocus={true}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Write;
