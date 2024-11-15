import { Form, Input } from "antd";
import PropTypes from "prop-types";

const Login = ({ formData, handleInputChange }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8 relative">
        Login
        <span className=" absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 rounded-xl h-1 bg-blue-600 "></span>
      </h2>
      <Form requiredMark={false} layout="vertical">
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            placeholder="Enter your email"
            className="rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

Login.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Login;
