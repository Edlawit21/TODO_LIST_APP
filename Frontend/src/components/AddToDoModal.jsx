import { Modal, Input, Button, Form, Divider, Select } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea";
import { addTodo, updateTodo } from "../api/api";

const { Option } = Select;

const AddToDoModal = ({ initialValues, onClose, onSubmit, visible }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (initialValues) {
        await updateTodo(initialValues.id, values);
        onSubmit({ ...initialValues, ...values });
      } else {
        await addTodo(values);
        onSubmit(values);
      }
      onClose();
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
    if (initialValues) {
      form.setFieldsValue(initialValues);
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
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title" }]}
          >
            <Input allowClear />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description" },
            ]}
          >
            <TextArea allowClear />
          </Form.Item>

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
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default AddToDoModal;
