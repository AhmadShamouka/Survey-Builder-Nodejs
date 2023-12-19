// ProfilePictureUpload.jsx
import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProfileUpload = () => {
  const location = useLocation();
  const authorization = "Bearer " + location.state?.data;

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log(formData);
      await axios.post("http://localhost:8000/profile", formData, {
        headers: {
          Authorization: authorization,
        },
      });
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div>
      <h2>Profile Picture Upload</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="profilePicture">Select Profile Picture:</label>
        <input
          type="file"
          id="profilePicture"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ProfileUpload;
