import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { logout } from "../api/api"; // Import the logout API function
import todo from "../assets/todo.png";

const { Search } = Input;

const Header = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Handle search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout API
      message.success("Logged out successfully!");
      navigate("/"); // Redirect to AuthPage
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="flex justify-around p-6">
      <div className="text-3xl font-semibold cursor-pointer">
        <img src={todo} alt="to-do image" />
      </div>
      <div>
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{
            width: 400,
          }}
        />
      </div>
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Header;
