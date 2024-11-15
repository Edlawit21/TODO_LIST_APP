import { Modal, Input, Button, Form, Divider, Select } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea";
import { addTodo, updateTodo } from "../api/api"; // Import the API functions

const { Option } = Select;

const AddToDoModal = ({ initialValues, onClose, onSubmit, visible }) => {
  const [form] = Form.useForm();

  // Handle the form submission to update or add the task
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (initialValues) {
        // If initialValues exists, we are updating the task
        await updateTodo(initialValues.id, values); // Update API call
        onSubmit({ ...initialValues, ...values }); // Merge updated values with initialValues
      } else {
        // If no initialValues, it's a new task
        await addTodo(values); // Add API call
        onSubmit(values); // Send newly added task to the parent component
      }
      onClose(); // Close the modal after submit
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    onClose(); // Close the modal without saving
  };

  // Reset form when modal is opened or initialValues change
  useEffect(() => {
    if (visible) {
      form.resetFields(); // Reset the form when modal is visible
    }
    if (initialValues) {
      form.setFieldsValue(initialValues); // Prefill form if initialValues is provided (for editing)
    }
  }, [initialValues, visible, form]);

  return (
    <Modal
      open={visible}
      footer={[
        <Button key="submit" onClick={handleOk} style={{ width: "100%" }}>
          {initialValues ? "Update" : "Add"} Task
        </Button>,
      ]}
      onCancel={handleCancel}
    >
      <div>
        <h2 className="mb-4">{initialValues ? "Edit " : "Add "} ToDo</h2>
        <Divider />
        <Form form={form} requiredMark={false}>
          {/* Task Title */}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title" }]}
          >
            <Input allowClear />
          </Form.Item>

          {/* Task Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description" },
            ]}
          >
            <TextArea allowClear />
          </Form.Item>

          {/* Task Status */}
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

AddToDoModal.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.string, // Make sure the id is passed for editing tasks
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default AddToDoModal;
