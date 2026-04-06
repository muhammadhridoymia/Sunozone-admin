import React, { useState } from "react";
import axios from "axios";
import "../Popup/LineCreate.css";

const LineCreate = ({ onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: [],
    isPublished: true,
  });

  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Motivation",
    "Love",
    "Sad",
    "Life",
    "Islamic",
    "Funny",
    "Other",
  ];

  const suggestedTags = [
    "love",
    "sad",
    "motivational",
    "life",
    "truth",
    "heart",
    "emotion",
    "short",
  ];

  // HANDLE TEXT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // HANDLE FILE
  const handleFile = (e) => {
    const { name, files } = e.target;

    if (name === "image") setImage(files[0]);
    if (name === "audio") setAudio(files[0]);
  };

  // TAGS
  const handleTag = (tag, checked) => {
    setFormData((prev) => {
      const current = prev.tags || [];

      return {
        ...prev,
        tags: checked
          ? [...current, tag]
          : current.filter((t) => t !== tag),
      };
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("tags", JSON.stringify(formData.tags));
      data.append("isPublished", formData.isPublished);

      if (image) data.append("image", image);
      if (audio) data.append("audio", audio);

      const res = await axios.post(
        "http://localhost:5000/api/lines/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onCreated(res.data.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create line");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="popup-header">
          <h2>Create Line</h2>
          <button onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">
          
          {/* BASIC */}
          <div className="section">
            <h3>Basic Info</h3>

            <input
              type="text"
              name="title"
              placeholder="Write your line..."
              value={formData.title}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* TAGS */}
          <div className="section">
            <h3>Tags</h3>
            <div className="tags-container">
              {suggestedTags.map((tag) => (
                <label key={tag} className="tag-label">
                  <input
                    type="checkbox"
                    checked={formData.tags.includes(tag)}
                    onChange={(e) =>
                      handleTag(tag, e.target.checked)
                    }
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>

          {/* MEDIA */}
          <div className="section">
            <h3>Media</h3>

            <label>Image</label>
            <input type="file" name="image" onChange={handleFile} />

            <label>Audio</label>
            <input type="file" name="audio" onChange={handleFile} />
          </div>

          {/* PUBLISH */}
          <div className="section checkbox">
            <label>
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />
              Publish now
            </label>
          </div>

          {/* ACTION */}
          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LineCreate;