import React from 'react';
import './Pages.css';

const YearsBestStories = () => {
  const bestStories = [
    { id: 1, title: 'Story of the Year 2023', author: 'Sarah Johnson', views: 45678, award: 'Gold' },
    { id: 2, title: 'Best Fiction', author: 'Michael Brown', views: 34567, award: 'Silver' },
    { id: 3, title: 'Best Non-Fiction', author: 'Emily Davis', views: 23456, award: 'Bronze' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Year's Best Stories</h1>
        <p>Award-winning stories of the year</p>
      </div>

      <div className="awards-grid">
        {bestStories.map(story => (
          <div key={story.id} className={`award-card ${story.award.toLowerCase()}`}>
            <div className="award-icon">
              {story.award === 'Gold' && '🏆'}
              {story.award === 'Silver' && '🥈'}
              {story.award === 'Bronze' && '🥉'}
            </div>
            <h3>{story.title}</h3>
            <p>{story.author}</p>
            <div className="views">{story.views.toLocaleString()} views</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearsBestStories;