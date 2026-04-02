import React from 'react';
import './Pages.css';

const TopStories = () => {
  const topStories = [
    { id: 1, title: 'Breaking News: Major Discovery', author: 'Emma Watson', views: 15432, rating: 4.8 },
    { id: 2, title: 'The Future of AI', author: 'Elon Mask', views: 12345, rating: 4.7 },
    { id: 3, title: 'Climate Change Solutions', author: 'Greta Thunberg', views: 9876, rating: 4.6 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Top Stories</h1>
        <p>Most popular stories on your platform</p>
      </div>

      <div className="stories-grid">
        {topStories.map(story => (
          <div key={story.id} className="story-card">
            <h3>{story.title}</h3>
            <p>By: {story.author}</p>
            <div className="story-stats">
              <span>👁️ {story.views.toLocaleString()} views</span>
              <span>⭐ {story.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStories;