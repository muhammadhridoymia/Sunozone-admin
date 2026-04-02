import React, { useState } from "react";
import axios from "axios";
import "./StoryCreate.css";

const StoryCreate = ({ onClose, onStoryCreated }) => {

  // TEXT DATA
  const [formData, setFormData] = useState({
    title: "",
    englishText: "",
    banglaText: "",
    writerName: "",
    writerId: "",
    audioEnLength: "",
    audioBnLength: "",
    isPublished: true
  });

  // FILE DATA
  const [files, setFiles] = useState({
    image: null,
    audioEn: null,
    audioBn: null
  });

  const [loading, setLoading] = useState(false);

  // HANDLE TEXT INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // HANDLE FILE INPUT
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;

    setFiles((prev) => ({
      ...prev,
      [name]: selectedFiles[0]
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      // TEXT
      data.append("title", formData.title);
      data.append("englishText", formData.englishText);
      data.append("banglaText", formData.banglaText);
      data.append("writerName", formData.writerName);
      data.append("writerId", formData.writerId);
      data.append("audioEnLength", formData.audioEnLength);
      data.append("audioBnLength", formData.audioBnLength);
      data.append("isPublished", formData.isPublished);

      // FILES
      if (files.image) data.append("image", files.image);
      if (files.audioEn) data.append("audioEn", files.audioEn);
      if (files.audioBn) data.append("audioBn", files.audioBn);

      const res = await axios.post("http://localhost:5000/api/stories/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      onStoryCreated(res.data.data);
      onClose();

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="popup-header">
          <h2>Create Story</h2>
          <button onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">

          {/* BASIC INFO */}
          <div className="section">
            <h3>Basic Info</h3>

            <input
              type="text"
              name="title"
              placeholder="Story Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="writerName"
              placeholder="Writer Name"
              value={formData.writerName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="writerId"
              placeholder="Writer User ID (optional)"
              value={formData.writerId}
              onChange={handleChange}
            />
          </div>

          {/* STORY TEXT */}
          <div className="section">
            <h3>Story Content</h3>

            <textarea
              placeholder="English Story"
              value={formData.englishText}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  englishText: e.target.value
                }))
              }
            />

            <textarea
              placeholder="বাংলা গল্প লিখুন"
              value={formData.banglaText}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  banglaText: e.target.value
                }))
              }
              required
            />
          </div>

          {/* MEDIA */}
          <div className="section">
            <h3>Media Upload</h3>

            <label>Image</label>
            <input type="file" name="image" onChange={handleFileChange} />

            <label>English Audio</label>
            <input type="file" name="audioEn" onChange={handleFileChange} />
            <input
              type="number"
              name="audioEnLength"
              placeholder="Length (seconds)"
              value={formData.audioEnLength}
              onChange={handleChange}
            />

            <label>Bangla Audio</label>
            <input type="file" name="audioBn" onChange={handleFileChange} />
            <input
              type="number"
              name="audioBnLength"
              placeholder="Length (seconds)"
              value={formData.audioBnLength}
              onChange={handleChange}
            />
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
              {loading ? "Creating..." : "Create Story"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StoryCreate;