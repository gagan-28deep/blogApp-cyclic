import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import { useState, useContext } from "react";
import "./settings.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Firebase
// import { storage, database, storageRef, db } from "../../firebase";
// import { getDatabase, ref, set } from "firebase/database";
const Settings = () => {
  // const PF = "http://localhost:4001/images/";
  // const PF = "/images/";
  const PF = "/images/";
  const { user, dispatch } = useContext(Context);

  const navigate = useNavigate();

  // console.log("user", user);
  const [uploadFile, setUploadFile] = useState(null);
  const [username, setUsername] = useState(user?.user?.username);
  const [email, setEmail] = useState(user?.user?.email);
  const [password, setPassword] = useState(user?.user?.password);

  // console.log("user", user);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const updatedUser = {
  //     userId: user._id,
  //     username,
  //     email,
  //     password,
  //     profilePic: uploadFile ? uploadFile.name : user.profilePic,
  //   };
  //   console.log("settings", updatedUser);
  //   if (uploadFile) {
  //     console.log("uploadfile", uploadFile);
  //     const data = new FormData();
  //     const filename = uploadFile.name;
  //     data.append("name", filename);
  //     data.append("uploadFile", uploadFile);
  //     data.photo = filename;

  //     await axios
  //       .post("http://localhost:4001/api/v1/upload/", data)
  //       .then((res) => {
  //         console.log("36 res", res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   await axios
  //     .put("/api/v1/user/" + user._id, updatedUser)
  //     .then((res) => {
  //       console.log("45 settings", res);
  //       // update local storage
  //       // function get -> context -> pass updated user
  //       dispatch({ action: "UPDATED_USER", payload: updatedUser });
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   await axios
  //     .delete("/api/v1/user/" + user.user._id)
  //     .then((res) => {
  //       console.log("settings", res);
  //       dispatch({ action: "LOGOUT" });
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     })
  //     .finally(() => {
  //       toast.success("Account deleted successfully");
  //     });
  // };

  // console.log("User", user.user._id);
  // console.log("USerPic", user.user);

  // const handleUpload = (e) => {
  //   let file = e?.target?.files[0];
  //   if (file != null) setUploadFile(file);
  //   // console.log(file)
  // };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.delete(
        "/api/v1/user/" +
          user.user._id,
        {
          data: { userId: user.user._id },
        }
      );
      console.log(res);
      if (res.status == 200) {
        toast.success("Account Deleted Successfully");
        dispatch({ action: "LOGOUT" });
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      if (err.message == "Request failed with status code 400") {
        toast.error("Bad Request");
      } else if (err.message == "Request failed with status code 401") {
        toast.error("User Not Found");
      } else if (err.message == "Request failed with status code 500") {
        toast.error("Internal Server Error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userN = user.user.username;
    let userE = user.user.email;
    try {
      let res = await axios.put(
        "/api/v1/user/" +
          user.user._id,
        {
          userId: user.user._id,
          username,
          email,
          password,
          profilePic: uploadFile ? uploadFile.name : user.profilePic,
        }
      );
      console.log("settings", res.data);
      if (uploadFile) {
        try {
          // let uid = user.user._id;
          const data = new FormData();
          console.log("data", data);
          const fileName = uploadFile.name;
          console.log("filename", fileName);
          data.append("name", fileName);
          data.append("uploadFile", uploadFile);
          res.profilePic = fileName;

          // const uploadTask = storageRef(`/users/${uid}/ProfileImage`).put(
          //   uploadFile
          // );

          // uploadTask.on(
          //   "state_changed",
          //   // progress
          //   (snapshot) => {
          //     // Observe state change events such as progress, pause, and resume
          //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          //     var progress =
          //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   },
          //   (error) => {
          //     // Handle unsuccessful uploads
          //     console.log("Failed to upload File");
          //   },
          //   //   success
          //   () => {
          //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          //       //   console.log('File available at', downloadURL);
          //       // database.users.doc(uid).set({
          //       //   // email: email,
          //       //   // userId: uid,
          //       //   // fullName: fullName,
          //       //   // createdAt: database.getCurrentTimeStamp(),
          //       //   // profileUrl: downloadURL,
          //       //   userId: user.user._id,
          //       //   username,
          //       //   email,
          //       //   password,
          //       //   profilePic: uploadFile ? uploadFile.name : user.profilePic,
          //       // });
          //       const db = getDatabase();
          //       set(ref(db, "users/" + user.user.id), {
          //         userId: user.user._id,
          //         username,
          //         email,
          //         password,
          //         profilePic: uploadFile ? uploadFile.name : user.profilePic,
          //       });
          //     });
          //   }
          // );

          axios.post(
            "/api/v1/upload",
            data
          );

          // res = await axios.post("/api/v1/upload", data);
          // console.log("res11", res);
          if (res.status === 200) {
            toast.success("Updated successfully");
          } else if (res.status === 200) {
            toast.success("Updated successfully");
            dispatch({ action: "UPDATED_USER", payload: res.data });
          }
        } catch (err) {
          if (err.message == "Request failed with status code 500") {
            toast.error("Internal Server error");
          } else if (err.message == "Request failed with status code 400") {
            toast.error("Bad request");
          }
          console.log(err);
        }
      }
      if (res.status === 200) {
        toast.success("Updated successfully");
        dispatch({ action: "UPDATED_USER", payload: res.data });
        // window.location.reload();
      }
      console.log("res", res);
    } catch (err) {
      if (err.message == "Request failed with status code 500") {
        toast.error("Internal Server error OR Username already exists");
      } else if (err.message == "Request failed with status code 400") {
        toast.error("Bad request");
      } else if (err.message == "Request failed with status code 409") {
        toast.error("Username or Email already exists");
      }
      console.log(err.message);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDelete}>
            Delete Your Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={(e) => handleSubmit(e)}>
          <label>Profile Pic</label>
          <div className="settingsPP">
            {uploadFile ? (
              <>
                {console.log("uploadfile", uploadFile)}
                <img src={URL.createObjectURL(uploadFile)} alt="" />
                {/* <input
                  accept="image/*"
                  type="file"
                  hidden
                  onChange={(e) => handleUpload(e)}
                /> */}
              </>
            ) : (
              <img src={PF + user.user.profilePic} alt="" />
            )}
            {/* <img
              // src="https://images.pexels.com/photos/4240504/pexels-photo-4240504.jpeg?auto=compress&cs=tinysrgb&w=1600"
              src={
                uploadFile ? (
                  <img src={URL.createObjectURL(uploadFile)} alt="" />
                ) : (
                  <img
                    src="https://images.pexels.com/photos/4240504/pexels-photo-4240504.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                )
                // PF + user.profilePic
              }
              alt=""
            /> */}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setUploadFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>email</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
        </form>
      </div>
      {/* <Sidebar /> */}
    </div>
  );
};

export default Settings;
