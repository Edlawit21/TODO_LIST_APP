import { Button, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Login from "../authentication/Login";
import Registration from "../authentication/Registeration";
import { login, register } from "../api/api";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle login
  const handleLogin = async () => {
    const { email, password } = formData;
    try {
      const response = await login(email, password);
      message.success("Login successful!");
      navigate("/home"); // Redirect to Home page
    } catch (error) {
      message.error(error.message || "Login failed!");
    }
  };

  // Handle registration
  const handleRegistration = async () => {
    const { name, email, password } = formData;
    try {
      const response = await register(name, email, password);
      message.success("Registration successful!");
      navigate("/home"); // Redirect to Home page
    } catch (error) {
      message.error(error.message || "Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center w-1/3 auto bg-white p-8 rounded-lg shadow-lg sm:w-96">
        {isLogin ? (
          <Login formData={formData} handleInputChange={handleInputChange} />
        ) : (
          <Registration
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
        <div className="flex gap-10 mt-4">
          {/* SignIn Button handles login */}
          <Button
            style={{ width: "140px", borderRadius: "40px" }}
            onClick={isLogin ? handleLogin : () => setIsLogin(true)}
            type={isLogin ? "primary" : "default"}
          >
            SignIn
          </Button>
          {/* SignUp Button handles registration */}
          <Button
            style={{ width: "140px", borderRadius: "40px" }}
            onClick={!isLogin ? handleRegistration : () => setIsLogin(false)}
            type={!isLogin ? "primary" : "default"}
          >
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
