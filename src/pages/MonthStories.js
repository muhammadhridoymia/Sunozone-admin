import React from 'react';
import './Pages.css';

const MonthStories = () => {
  const monthStories = [
    { id: 1, title: 'January Highlights', author: 'Alice Johnson', date: '2024-01-10', views: 5678 },
    { id: 2, title: 'New Year Resolutions', author: 'Bob Wilson', date: '2024-01-05', views: 4321 },
    { id: 3, title: 'Winter Fashion', author: 'Catherine Lee', date: '2024-01-02', views: 3210 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>This Month's Stories</h1>
        <p>Stories published in the current month</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Stories</h3>
          <div className="stat-number">{monthStories.length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Views</h3>
          <div className="stat-number">{monthStories.reduce((sum, s) => sum + s.views, 0).toLocaleString()}</div>
        </div>
      </div>

      <div className="stories-list">
        {monthStories.map(story => (
          <div key={story.id} className="list-item">
            <div className="item-info">
              <h4>{story.title}</h4>
              <p>By {story.author} • {story.date}</p>
            </div>
            <div className="item-stats">
              <span>{story.views.toLocaleString()} views</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthStories;