import { Button, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    try {
      await login(email, password);
      message.success("Login successful!");
      navigate("/home");
    } catch (error) {
      message.error(error.message || "Login failed!");
    }
  };

  const handleRegistration = async () => {
    const { name, email, password } = formData;
    try {
      await register(name, email, password);
      message.success("Registration successful!");
      navigate("/home");
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
          <Button
            style={{ width: "140px", borderRadius: "40px" }}
            onClick={isLogin ? handleLogin : () => setIsLogin(true)}
            type={isLogin ? "primary" : "default"}
          >
            SignIn
          </Button>

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
