import React from 'react';
import './Pages.css';

const AllUsers = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', joinDate: '2023-01-15', stories: 12 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Writer', joinDate: '2023-02-20', stories: 8 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Writer', joinDate: '2023-03-10', stories: 15 },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Reader', joinDate: '2023-04-05', stories: 0 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>All Users</h1>
        <p>Manage all registered users</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="stat-number">{users.length}</div>
        </div>
        <div className="stat-card">
          <h3>Writers</h3>
          <div className="stat-number">{users.filter(u => u.role === 'Writer').length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Stories</h3>
          <div className="stat-number">{users.reduce((sum, u) => sum + u.stories, 0)}</div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>Stories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td><strong>{user.name}</strong></td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>{user.stories}</td>
                <td>
                  <button className="action-btn edit-btn">Edit</button>
                  <button className="action-btn delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;