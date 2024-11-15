import {
  EditOutlined,
  StarOutlined,
  StarFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Checkbox, Popconfirm, notification } from "antd";
import { useState, useEffect } from "react";
import AddToDoModal from "./AddToDoModal"; // Import the modal component
import PropTypes from "prop-types";
import notask from "../assets/notask.png";
import { getTodos, deleteTodo, updateTodo } from "../api/api"; // Import the API functions

const ToDoList = ({ setTasks }) => {
  const [tasks, setTasksState] = useState([]); // State for tasks
  const [visible, setVisible] = useState(false); // State for modal visibility
  const [selectedTask, setSelectedTask] = useState(null); // Store the task being edited

  // Fetch tasks from the API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTodos();
        setTasksState(fetchedTasks); // Update state with fetched tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Handler for checkbox change
  const handleCheckboxChange = (e, taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isChecked: e.target.checked } : task
    );
    setTasksState(updatedTasks); // Update the tasks state
  };

  // Handler for confirming deletion
  const handleDelete = async (taskId) => {
    try {
      await deleteTodo(taskId); // Call API to delete the task
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasksState(updatedTasks); // Remove the task from the list

      // Show a success notification
      notification.success({
        message: "Task Deleted",
        description: "The task has been successfully deleted.",
      });
    } catch (error) {
      notification.error({
        message: "Error Deleting Task",
        description: "There was an error deleting the task.",
      });
    }
  };

  // Handler to open the modal for editing a task
  const handleEdit = (task) => {
    setSelectedTask(task); // Set the task to be edited
    setVisible(true); // Open the modal
  };

  // Handler to close the modal
  const handleModalClose = () => {
    setVisible(false); // Close the modal
    setSelectedTask(null); // Clear the selected task
  };

  // Handler to update the task after editing
  const handleModalSubmit = async (updatedTask) => {
    try {
      await updateTodo(updatedTask.id, updatedTask); // Call API to update the task
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasksState(updatedTasks); // Update the task in the list
      handleModalClose(); // Close the modal

      notification.success({
        message: "Task Updated",
        description: "Your task has been successfully updated.",
      });
    } catch (error) {
      notification.error({
        message: "Error Updating Task",
        description: "There was an error updating the task.",
      });
    }
  };

  // Handler to toggle the importance of the task
  const handleStarClick = async (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, isImportant: !task.isImportant }; // Toggle importance
    try {
      await updateTodo(updatedTask.id, updatedTask); // Call API to update importance
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasksState(updatedTasks); // Update the tasks state
    } catch (error) {
      notification.error({
        message: "Error Updating Importance",
        description: "There was an error updating the importance of the task.",
      });
    }
  };

  return (
    <div className="w-full flex justify-center p-4 space-y-4">
      <div className="w-9/12 flex flex-col space-y-4">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            {/* Image and message when no tasks */}
            <img
              src={notask}
              alt="No tasks available"
              className="w-1/2 max-w-sm"
            />
            <p className="text-gray-600 text-lg mt-4">No tasks added.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-lg w-full"
            >
              {/* Checkbox */}
              <Checkbox
                className="flex-shrink-0"
                checked={task.isChecked}
                onChange={(e) => handleCheckboxChange(e, task.id)}
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {task.title}
                </h2>
                <span className="text-gray-600">{task.description}</span>
              </div>

              <div className="flex items-center space-x-12">
                {/* Status */}
                <span className="text-sm text-gray-500">
                  Status: {task.isChecked ? "Completed" : "Pending"}
                </span>

                <div className="flex space-x-4">
                  {/* Star Icon: filled if important */}
                  {task.isImportant ? (
                    <StarFilled
                      className="text-yellow-500 cursor-pointer"
                      onClick={() => handleStarClick(task.id)}
                    />
                  ) : (
                    <StarOutlined
                      className="text-yellow-500 cursor-pointer"
                      onClick={() => handleStarClick(task.id)}
                    />
                  )}
                  <EditOutlined
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(task)} // Trigger edit action
                  />

                  {/* Delete Icon with Popconfirm Confirmation */}
                  <Popconfirm
                    title="Are you sure you want to delete this task?"
                    onConfirm={() => handleDelete(task.id)}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined className="text-red-500 cursor-pointer" />
                  </Popconfirm>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <AddToDoModal
        visible={visible}
        initialValues={selectedTask} // Pass the task to be edited
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

ToDoList.propTypes = {
  setTasks: PropTypes.func.isRequired, // setTasks should be a function
};

ToDoList.defaultProps = {
  tasks: [],
};

export default ToDoList;
