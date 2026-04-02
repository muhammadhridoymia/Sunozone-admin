import React from 'react';
import './Pages.css';

const ThisWeekStories = () => {
  const weekStories = [
    { id: 1, title: 'Weekly Review', author: 'Mark Thompson', date: '2024-01-15', views: 2345 },
    { id: 2, title: 'Tech Updates', author: 'Lisa Chen', date: '2024-01-14', views: 1890 },
    { id: 3, title: 'Health Tips', author: 'Dr. Smith', date: '2024-01-13', views: 1456 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>This Week's Stories</h1>
        <p>Stories published in the last 7 days</p>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {weekStories.map(story => (
              <tr key={story.id}>
                <td><strong>{story.title}</strong></td>
                <td>{story.author}</td>
                <td>{story.date}</td>
                <td>{story.views.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThisWeekStories;