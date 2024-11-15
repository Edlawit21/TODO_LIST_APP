import { Form, Input } from "antd";

const Registeration = ({ formData, handleInputChange }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8 relative">
        Registration
        <span className=" absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 rounded-xl h-1 bg-blue-600 "></span>
      </h2>
      <Form requiredMark={false} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not a valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            placeholder="Enter your email"
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
          hasFeedback
        >
          <Input.Password
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registeration;
