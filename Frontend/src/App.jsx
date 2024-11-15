import "./App.css";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* AuthPage for login and registration */}
          <Route path="/" element={<AuthPage />} />
          {/* Home page for authenticated users */}
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
