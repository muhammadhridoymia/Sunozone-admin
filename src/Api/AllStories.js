const API_BASE_URL = process.env.REACT_APP_API_URL;

// Get all stories
export const allStoriesApi = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/admin/stories/all/for/admin");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};