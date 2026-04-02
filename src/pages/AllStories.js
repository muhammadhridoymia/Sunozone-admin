import React, { useState, useEffect } from 'react';
import StoryCreate from '../Popup/StoryCreate';
import StoryEdit from '../Popup/StoryEdit';
import { allStoriesApi } from '../Api/AllStories';
import ConfirmationPopup from '../Popup/ConfirmPopup';
import './AllStories.css';

const AllStories = () => {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [updatedata, setUpdatedata] = useState(null);

  // Simulated data based on your schema
  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const data = await allStoriesApi();
        if(data.success) {
          setStories(data.data);
        } else {
          console.error('Failed to fetch stories:', data.message);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleEdit = (story) => {
    setSelectedStory(story);
    setShowEditPopup(true);
  };

  const handleDelete = async (storyId) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      setStories(stories.filter(story => story._id !== storyId));
    }
  };

  const handleStoryCreated = (newStory) => {
    setStories([newStory, ...stories]);
    setShowCreatePopup(false);
  };

  const handleStoryUpdated = (updatedStory) => {
    setStories(stories.map(story => 
      story._id === updatedStory._id ? updatedStory : story
    ));
    setShowEditPopup(false);
    setSelectedStory(null);
  };

  const togglePublishStatus = async (storyId, isPublished,type) => {
    setShowConfirmPopup(true);
    setUpdatedata({storyId, isPublished, type});
  };

  const updateTopStatus = async (storyId, period ,type) => {
    setShowConfirmPopup(true);
    setUpdatedata({storyId, period, type});
  };

  const updateStats = async (storyId, type, increment = true) => {
    setStories(stories.map(story =>
      story._id === storyId ? {
        ...story,
        status: {
          ...story.status,
          [type]: increment ? story.status[type] + 1 : Math.max(0, story.status[type] - 1)
        }
      } : story
    ));
  };

  // Filter stories
  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (typeof story.writer === 'string' 
                           ? story.writer.toLowerCase().includes(searchTerm.toLowerCase())
                           : story.writer.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && story.isPublished) ||
                         (filterStatus === 'draft' && !story.isPublished);
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {showConfirmPopup && (
        <ConfirmationPopup 
          updateData={updatedata}
          isOpen={showConfirmPopup}
          onClose={() => setShowConfirmPopup(false)}
          title="Confirm Status Change"
          message="Are you sure you want to toggle the publish status of this story?"
          confirmText="Yes, Toggle"
          cancelText="No, Keep"
          isDanger={true}
        />
      )}
      {showCreatePopup && (
        <StoryCreate 
          onClose={() => setShowCreatePopup(false)}
          onStoryCreated={handleStoryCreated}
        />
      )}
      
      {showEditPopup && selectedStory && (
        <StoryEdit 
          story={selectedStory}
          onClose={() => {
            setShowEditPopup(false);
            setSelectedStory(null);
          }}
          onStoryUpdated={handleStoryUpdated}
        />
      )}

      <div className="page-header">
        <div>
          <h1>All Stories</h1>
          <p>Manage all stories in your platform</p>
        </div>
        <button className="create-story-btn" onClick={() => setShowCreatePopup(true)}>
          + Create New Story
        </button>
      </div>

      {/* Search and Filters */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'published' ? 'active' : ''}`}
            onClick={() => setFilterStatus('published')}
          >
            Published
          </button>
          <button 
            className={`filter-btn ${filterStatus === 'draft' ? 'active' : ''}`}
            onClick={() => setFilterStatus('draft')}
          >
            Draft
          </button>
        </div>
      </div>

      {/* Stories Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title & Author</th>
              <th>Image</th>
              <th>Stats</th>
              <th>Top Stories</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStories.map(story => (
              <tr key={story._id}>
                <td className="title-cell">
                  <div className="title-info">
                    <strong className="story-title">{story.title}</strong>
                    <div className="author-name">
                      ✍️ {typeof story.writer === 'string' ? story.writer : story.writer.name}
                    </div>
                  </div>
                </td>
                <td className="image-cell">
                  {story.imageUrl && (
                    <img src={story.imageUrl} alt={story.title} className="story-image" />
                  )}
                </td>
                <td className="stats-cell">
                  <div className="stats-controls">
                    <div className="stat-item">
                      <span>views {story.status?.views || 0}</span>
                      <button 
                        className="stat-btn"
                        onClick={() => updateStats(story._id, 'views', true)}
                        title="Increase views"
                      >
                        +
                      </button>
                    </div>
                    <div className="stat-item">
                      <span>likes {story.status?.likes || 0}</span>
                      <button 
                        className="stat-btn"
                        onClick={() => updateStats(story._id, 'likes', true)}
                        title="Increase likes"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </td>
                <td className="top-cell">
                  <div className="top-controls">
                    <label className="top-checkbox">
                      <input
                        type="checkbox"
                        checked={story.isTop?.allTime || false}
                        onChange={() => updateTopStatus(story._id, 'allTime',"checkbox")}
                      />
                      All Time
                    </label>
                    <label className="top-checkbox">
                      <input
                        type="checkbox"
                        checked={story.isTop?.year || false}
                        onChange={() => updateTopStatus(story._id, 'year',"checkbox")}
                      />
                      Year
                    </label>
                    <label className="top-checkbox">
                      <input
                        type="checkbox"
                        checked={story.isTop?.month || false}
                        onChange={() => updateTopStatus(story._id, 'month',"checkbox")}
                      />
                      Month
                    </label>
                    <label className="top-checkbox">
                      <input
                        type="checkbox"
                        checked={story.isTop?.week || false}
                        onChange={() => updateTopStatus(story._id, 'week',"checkbox")}
                      />
                      Week
                    </label>
                  </div>
                </td>
                <td>
                  <button 
                    className={`status-toggle ${story.isPublished ? 'published' : 'draft'}`}
                    onClick={() => togglePublishStatus(story._id, story.isPublished,"publish")}
                  >
                    {story.isPublished ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="date-cell">
                  {formatDate(story.createdAt)}
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-btn edit-btn" 
                    onClick={() => handleEdit(story)}
                    title="Edit Story"
                  >
                    ✏️
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={() => handleDelete(story._id)}
                    title="Delete Story"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStories.length === 0 && (
        <div className="no-results">
          <p>No stories found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AllStories;