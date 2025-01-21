"use client"

import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";  
import "bootstrap/dist/css/bootstrap.min.css";  

export default function AboutPage() {
  const [inputs, setInputs] = useState({ 
    description: "", 
  });

  // Fetch initial data using GET method
  useEffect(() => {
    fetch("api/contact/678f9473287cecbe04342a81")
      .then((response) => response.json())
      .then((data) => setInputs(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle changes to the description in the ReactQuill editor
  const handleQuillChange = (value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      description: value,
    }));
  };

 
 
  // Handle PATCH request to update the data
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("api/contact/678f9473287cecbe04342a81", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data updated successfully:", data);
        alert("Done!");
        window.location.replace("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
    

        <div className="mb-3">
          <label className="form-label">Description</label>
          <ReactQuill
            value={inputs.description || ""}
            onChange={handleQuillChange}
            className="mb-4"
            theme="snow"
            placeholder="Write your description here..."
          />
        </div>
 
 

        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
}
