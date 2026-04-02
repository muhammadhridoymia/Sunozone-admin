import React, { useState } from 'react';
import './Popup.css';

const StoryEdit = ({ story, onClose, onStoryUpdated }) => {
  const [formData, setFormData] = useState({
    title: story.title,
    storyText: { ...story.storyText },
    imageUrl: story.imageUrl || '',
    audio: {
      english: { url: story.audio?.english?.url || '', length: story.audio?.english?.length || 0 },
      bangla: { url: story.audio?.bangla?.url || '', length: story.audio?.bangla?.length || 0 }
    },
    writer: { ...story.writer },
    isPublished: story.isPublished
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleStoryTextChange = (lang, value) => {
    setFormData(prev => ({
      ...prev,
      storyText: {
        ...prev.storyText,
        [lang]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedStory = {
        ...story,
        ...formData,
        updatedAt: new Date().toISOString()
      };
      onStoryUpdated(updatedStory);
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Edit Story</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Writer Name *</label>
            <input
              type="text"
              name="writer.name"
              value={formData.writer.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Writer User ID</label>
            <input
              type="text"
              name="writer.userId"
              value={formData.writer.userId}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Story Text (English)</label>
              <textarea
                value={formData.storyText.english}
                onChange={(e) => handleStoryTextChange('english', e.target.value)}
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Story Text (Bangla) *</label>
              <textarea
                value={formData.storyText.bangla}
                onChange={(e) => handleStoryTextChange('bangla', e.target.value)}
                rows="4"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>English Audio URL</label>
              <input
                type="url"
                name="audio.english.url"
                value={formData.audio.english.url}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>English Audio Length (seconds)</label>
              <input
                type="number"
                name="audio.english.length"
                value={formData.audio.english.length}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Bangla Audio URL</label>
              <input
                type="url"
                name="audio.bangla.url"
                value={formData.audio.bangla.url}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Bangla Audio Length (seconds)</label>
              <input
                type="number"
                name="audio.bangla.length"
                value={formData.audio.bangla.length}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
              />
              Published
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Updating...' : 'Update Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryEdit;