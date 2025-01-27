import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    socialMediaHandle: "",
  });
  const [images, setImages] = useState([]);

  // Handle input text fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file uploads and append to images array
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to Array
    setImages((prevImages) => [...prevImages, ...selectedFiles]); // Append new files to existing array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("socialMediaHandle", formData.socialMediaHandle);

    // Append all images to the FormData
    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/users", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Submission successful");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Social Media Handle:</label>
        <input
          type="text"
          name="socialMediaHandle"
          value={formData.socialMediaHandle}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Upload Images:</label>
        <input type="file" name="images" multiple onChange={handleFileChange} />
      </div>
      <div>
        <h3>Selected Images:</h3>
        <ul>
          {images.map((image, index) => (
            <li key={index}>{image.name}</li> // Display image names
          ))}
        </ul>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
