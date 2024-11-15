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
import notask from "../assets/notask.png"; // Import the "No tasks" image
import { getTodos, deleteTodo } from "../api/api"; // Import the API functions

const ToDoGrid = ({ setTasks }) => {
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
  const handleModalSubmit = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasksState(updatedTasks); // Update the task in the list
    handleModalClose(); // Close the modal

    notification.success({
      message: "Task Updated",
      description: "Your task has been successfully updated.",
    });
  };

  // Handler to toggle the importance of the task
  const handleStarClick = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isImportant: !task.isImportant } : task
    );
    setTasksState(updatedTasks); // Update the tasks state
  };

  return (
    <div className="w-full p-4">
      {/* Container for all tasks to be displayed in grid */}
      <div className="w-9/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Check if there are tasks, otherwise show no tasks message and image */}
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            {/* Image and message when no tasks */}
            <img
              src={notask}
              alt="No tasks available"
              className="w-full max-w-xs" // Adjusted to make the image take the full width, but keep its aspect ratio
            />
            <p className="text-gray-600 text-lg mt-4">No tasks added.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col"
            >
              {/* Container for checkbox and content stacked horizontally */}
              <div className="flex items-start space-x-4">
                {/* Checkbox container */}
                <div className="flex items-center">
                  <Checkbox
                    checked={task.isChecked}
                    onChange={(e) => handleCheckboxChange(e, task.id)}
                  />
                </div>

                {/* Content container (Title, Description, Status, Actions) */}
                <div className="flex-1">
                  {/* Task title */}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {task.title}
                  </h2>

                  {/* Task description */}
                  <p className="text-gray-600 mb-4">{task.description}</p>

                  {/* Task status */}
                  <span className="text-sm text-gray-500 mb-4">
                    Status: {task.isChecked ? "Completed" : "Pending"}
                  </span>

                  {/* Actions: Star, Edit, Delete */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
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
                        onClick={() => handleEdit(task)}
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
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for task editing */}
      <AddToDoModal
        visible={visible}
        initialValues={selectedTask} // Pass the task to be edited
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

ToDoGrid.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Ensure the task has an id
      title: PropTypes.string.isRequired, // Title should be a string
      description: PropTypes.string.isRequired, // Description should be a string
      isChecked: PropTypes.bool.isRequired, // Boolean value for the checked state
      isImportant: PropTypes.bool, // Boolean value for the importance state
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired, // setTasks should be a function
};

ToDoGrid.defaultProps = {
  tasks: [],
};

export default ToDoGrid;
