"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js

import "react-quill/dist/quill.snow.css"; // Import Quill's styles
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap's styles

// Dynamically import ReactQuill to disable SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AboutPage() {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    service: [{ title: "", description: "" }],
    item: [{ title: "", description: "" }],
  });

  // Fetch initial data using GET method
  useEffect(() => {
    fetch("api/about/678f8f0d2e57df52f73eb987")
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

  // Handle changes in the title or description fields of service and item
  const handleInputChange = (e, index, field, section) => {
    const updatedSection = [...inputs[section]];
    updatedSection[index][field] = e.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [section]: updatedSection,
    }));
  };

  // Handle adding new service or item
  const handleAddSection = (section) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [section]: [...prevInputs[section], { title: "", description: "" }],
    }));
  };

  // Handle PATCH request to update the data
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("api/about/678f8f0d2e57df52f73eb987", {
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
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={inputs.title}
            onChange={(e) =>
              setInputs({ ...inputs, title: e.target.value })
            }
            placeholder="Enter title"
          />
        </div>

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

        <div className="mb-4">
          <h4>Service</h4>
          {inputs.service.map((service, index) => (
            <div key={index} className="mb-3">
              <div className="mb-2">
                <label className="form-label">Service Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={service.title}
                  onChange={(e) =>
                    handleInputChange(e, index, "title", "service")
                  }
                  placeholder="Enter service title"
                />
              </div>
              <div>
                <label className="form-label">Service Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={service.description}
                  onChange={(e) =>
                    handleInputChange(e, index, "description", "service")
                  }
                  placeholder="Enter service description"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => handleAddSection("service")}
          >
            Add Service
          </button>
        </div>

        <div className="mb-4">
          <h4>Item</h4>
          {inputs.item.map((item, index) => (
            <div key={index} className="mb-3">
              <div className="mb-2">
                <label className="form-label">Item Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.title}
                  onChange={(e) =>
                    handleInputChange(e, index, "title", "item")
                  }
                  placeholder="Enter item title"
                />
              </div>
              <div>
                <label className="form-label">Item Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.description}
                  onChange={(e) =>
                    handleInputChange(e, index, "description", "item")
                  }
                  placeholder="Enter item description"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => handleAddSection("item")}
          >
            Add Item
          </button>
        </div>

        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
}
