"use client";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { getSignature, saveToDatabase } from '../_actions'
import UploadImage from "./UploadImage";
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AddPost = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [inputs, setInputs] = useState({type: "business"});
  const [active, setActive] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener('storage', () => {
      setSearch(true);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (e.target.type.value === "0") {
      alert("Please fill insurance type");
    } else {
      setActive(true);
      console.log("medlej: ",inputs);
      
      axios
        .post("/api/posts", inputs)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setInputs({});
          setModalOpen(false);
          setSearch(false);
          setActive(false);
          window.location.replace("/dashboard");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
      img: "https://res.cloudinary.com/dixtwo21g/image/upload/v1696411482/" + localStorage.getItem("sharedValue") + ".jpg",
    }));
  };

  const handleQuillChange = (value) => {
    setInputs((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="text-white p-3 cursor-pointer"
        style={{ background: "#6c3429" }}
      >
        Add New Insurance
      </button>

      <button
        onClick={() => router.push("/reservation")}
        className="text-white p-3 cursor-pointer"
        style={{ marginLeft: "1em", background: "#6c3429" }}
      >
        View Reservations
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        {!search && <UploadImage />}
        {search && (
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2"
              value={inputs.title || ""}
              onChange={handleChange}
              required
            />

            <label className="block text-lg font-bold mb-2">Description</label>
            <ReactQuill
              value={inputs.description || ""}
              onChange={handleQuillChange}
              className="mb-4"
              theme="snow"
              placeholder="Write your description here..."
            />

            <select name="type" id="type" onChange={handleChange} required>
              <option value="0" disabled>
                --Choose Option--
              </option>
              <option value="business">Business Insurance</option>
              <option value="personal">Personal Insurance</option>
            </select>

            <button
              type="submit"
              className="px-5 py-2"
              style={{
                background: "#6c3429",
                color: "white",
                display: "block",
                marginBlock: "inherit",
              }}
              disabled={active}
            >
              Submit
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AddPost;
