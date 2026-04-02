import React from 'react';
import './Pages.css';

const Writers = () => {
  const writers = [
    { id: 1, name: 'Jane Smith', email: 'jane@example.com', stories: 8, followers: 1234, rating: 4.5 },
    { id: 2, name: 'Mike Johnson', email: 'mike@example.com', stories: 15, followers: 2345, rating: 4.8 },
    { id: 3, name: 'Emma Watson', email: 'emma@example.com', stories: 5, followers: 5678, rating: 4.9 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Writers</h1>
        <p>Manage all content creators</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Writers</h3>
          <div className="stat-number">{writers.length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Stories</h3>
          <div className="stat-number">{writers.reduce((sum, w) => sum + w.stories, 0)}</div>
        </div>
        <div className="stat-card">
          <h3>Avg Rating</h3>
          <div className="stat-number">{((writers.reduce((sum, w) => sum + w.rating, 0)) / writers.length).toFixed(1)}</div>
        </div>
      </div>

      <div className="writers-grid">
        {writers.map(writer => (
          <div key={writer.id} className="writer-card">
            <div className="writer-avatar">
              {writer.name.charAt(0)}
            </div>
            <h3>{writer.name}</h3>
            <p>{writer.email}</p>
            <div className="writer-stats">
              <div>📝 {writer.stories} stories</div>
              <div>👥 {writer.followers.toLocaleString()} followers</div>
              <div>⭐ {writer.rating}</div>
            </div>
            <div className="writer-actions">
              <button className="action-btn">View Profile</button>
              <button className="action-btn edit-btn">Message</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Writers;