import React, { useState } from "react";
import axios from "axios";
import "./StoryCreate.css";

const StoryCreate = ({ onClose, onStoryCreated }) => {
  // TEXT DATA
  const [formData, setFormData] = useState({
    title: "",
    englishText: "",
    banglaText: "",
    arabicText: "",
    writerName: "",
    writerId: "",
    audioEnLength: "",
    audioBnLength: "",
    audioArLength: "",
    isPublished: true,
    tags: [],
    category: "",
  });

  // Suggested categories (Subjects)
  const categories = [
    "Moral Story",
    "Adventure",
    "Love & Romance",
    "Motivational",
    "Sad & Emotional",
    "Comedy",
    "Fantasy",
    "Educational",
    "Horror",
    "Islamic/Moral",
    "Folktale",
    "Science Fiction",
    "Others",
  ];

  // Popular Tags (Admin can select multiple)
  const suggestedTags = [
    "love",
    "sad",
    "motivational",
    "emotional",
    "inspirational",
    "family",
    "friendship",
    "bravery",
    "honesty",
    "kindness",
    "adventure",
    "romance",
    "tragedy",
    "happiness",
    "success",
    "life lesson",
    "children",
    "teen",
    "heartbreaking",
    "uplifting",
    "short story",
    "long story",
    "moral",
    "folklore",
  ];

  // FILE DATA
  const [files, setFiles] = useState({
    image: null,
    audioEn: null,
    audioBn: null,
    audioAr: null,
  });

  const [loading, setLoading] = useState(false);

  // HANDLE TEXT INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // HANDLE FILE INPUT
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;

    setFiles((prev) => ({
      ...prev,
      [name]: selectedFiles[0],
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
      data.append("category", formData.category);
      formData.tags.forEach((tag) => data.append("tags[]", tag)); // Multiple tags
      data.append("englishText", formData.englishText);
      data.append("banglaText", formData.banglaText);
      data.append("arabicText", formData.arabicText);
      data.append("writerName", formData.writerName);
      data.append("writerId", formData.writerId);
      data.append("audioEnLength", formData.audioEnLength);
      data.append("audioBnLength", formData.audioBnLength);
      data.append("audioArLength", formData.audioArLength);
      data.append("isPublished", formData.isPublished);

      // FILES
      if (files.image) data.append("image", files.image);
      if (files.audioEn) data.append("audioEn", files.audioEn);
      if (files.audioBn) data.append("audioBn", files.audioBn);
      if (files.audioAr) data.append("audioAr", files.audioAr);

      const res = await axios.post(
        "http://localhost:5000/api/stories/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
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
            {/* Category Dropdown */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

            {/* Tags Section - Improved */}
          <div className="section">
            <h3>Tags</h3>
            <div className="tags-container">
              {suggestedTags.map((tag) => (
                <label key={tag} className="tag-label">
                  <input
                    type="checkbox"
                    name="tags"
                    value={tag}
                    checked={formData.tags?.includes(tag) || false}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      setFormData((prev) => {
                        const currentTags = prev.tags || [];
                        if (checked) {
                          return { ...prev, tags: [...currentTags, value] };
                        } else {
                          return {
                            ...prev,
                            tags: currentTags.filter((t) => t !== value),
                          };
                        }
                      });
                    }}
                  />
                  {tag}
                </label>
              ))}
            </div>
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
                  englishText: e.target.value,
                }))
              }
            />

            <textarea
              placeholder="বাংলা গল্প লিখুন"
              value={formData.banglaText}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  banglaText: e.target.value,
                }))
              }
              required
            />

            <textarea
              placeholder="اكتب القصة بالعربية"
              value={formData.arabicText}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  arabicText: e.target.value,
                }))
              }
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

            <label>Arabic Audio</label>
            <input type="file" name="audioAr" onChange={handleFileChange} />
            <input
              type="number"
              name="audioArLength"
              placeholder="Length (seconds)"
              value={formData.audioArLength}
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
