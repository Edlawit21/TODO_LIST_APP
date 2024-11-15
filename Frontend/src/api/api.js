import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Update if the backend URL changes

// Axios instance to set base URL and default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor to add token to request headers for authenticated routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to the request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle login
export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    const token = response.data.token;
    localStorage.setItem("token", token); // Store the token in localStorage
    return response.data; // Return user data and token
  } catch (error) {
    console.error("Login error:", error.response); // Log the error response
    throw error.response.data; // Throw error so it can be handled by the caller
  }
};

// Handle registration
export const register = async (name, email, password) => {
  try {
    const response = await api.post("/register", { name, email, password });
    return response.data; // Return user data after successful registration
  } catch (error) {
    console.error("Registration error:", error.response); // Log the error response
    throw error.response.data; // Pass error details to be handled by the caller
  }
};

// Handle logout
export const logout = async () => {
  try {
    // Send request to backend to log out the user
    await api.post("/logout");
    localStorage.removeItem("token"); // Remove the token from localStorage
  } catch (error) {
    console.error("Logout error:", error); // Log any logout error
  }
};

// Add a new task
export const addTodo = async (taskData) => {
  try {
    const response = await api.post("/todos", taskData); // Send POST request to create a task
    return response.data; // Return the newly created task
  } catch (error) {
    console.error("Error adding task:", error.response); // Log the error response
    throw error.response.data; // Pass error details to be handled by the caller
  }
};

// Update an existing task
export const updateTodo = async (id, taskData) => {
  try {
    const response = await api.put(`/todos/${id}`, taskData); // Send PUT request to update a task
    return response.data; // Return updated task data
  } catch (error) {
    console.error("Error updating task:", error.response); // Log the error response
    throw error.response.data; // Pass error details to be handled by the caller
  }
};

// Get all tasks
export const getTodos = async () => {
  try {
    const response = await api.get("/todos"); // Send GET request to fetch tasks
    return response.data; // Return the tasks data
  } catch (error) {
    console.error("Error fetching tasks:", error); // Log error if request fails
    throw error; // Pass error to be handled by the caller
  }
};

// Delete a task
export const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/todos/${id}`); // Send DELETE request to remove a task
    return response.data; // Return response after task deletion
  } catch (error) {
    console.error("Error deleting task:", error.response); // Log the error response
    throw error.response.data; // Pass error details to be handled by the caller
  }
};
