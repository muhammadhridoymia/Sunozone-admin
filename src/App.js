import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AllStories from './pages/AllStories';
import Lines from './pages/Lines';
import ThisWeekStories from './pages/ThisWeekStories';
import MonthStories from './pages/MonthStories';
import YearsBestStories from './pages/YearsBestStories';
import AllUsers from './pages/AllUsers';
import Writers from './pages/Writers';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AllStories />} />
          <Route path="/lines" element={<Lines />} />
          <Route path="/this-week" element={<ThisWeekStories />} />
          <Route path="/this-month" element={<MonthStories />} />
          <Route path="/years-best" element={<YearsBestStories />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/writers" element={<Writers />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;