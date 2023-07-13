import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidateUser, BASE_URL, formatDate } from "./helper";
import { useSelector } from 'react-redux';


function FileUpload() {
    const navigate = useNavigate();
    useValidateUser();
    const loginData = useSelector((store) => store.loginLogout.items)
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await fetch(`${BASE_URL}/uploadcsv`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <>{loginData.length > 0 ? (
    <div style={{margin: "100px"}}>
    <form className="top75" onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
    </div>
  ) : navigate("/login")}
  </>
}

export default FileUpload;
