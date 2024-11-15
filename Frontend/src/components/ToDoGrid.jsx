import {
  EditOutlined,
  StarOutlined,
  StarFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Checkbox, Popconfirm, notification } from "antd";
import { useState, useEffect } from "react";
import AddToDoModal from "./AddToDoModal";
import PropTypes from "prop-types";
import notask from "../assets/notask.png";
import { getTodos, deleteTodo, updateTodo } from "../api/api";

const ToDoGrid = () => {
  const [tasks, setTasksState] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTodos();
        setTasksState(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleCheckboxChange = (e, taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isChecked: e.target.checked } : task
    );
    setTasksState(updatedTasks);
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTodo(taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasksState(updatedTasks);

      notification.success({
        message: "Task Deleted",
        description: "The task has been successfully deleted.",
      });
    } catch {
      notification.error({
        message: "Error Deleting Task",
        description: "There was an error deleting the task.",
      });
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setSelectedTask(null);
  };

  const handleModalSubmit = async (updatedTask) => {
    try {
      await updateTodo(updatedTask.id, updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasksState(updatedTasks);
      handleModalClose();

      notification.success({
        message: "Task Updated",
        description: "Your task has been successfully updated.",
      });
    } catch {
      notification.error({
        message: "Error Updating Task",
        description: "There was an error updating the task.",
      });
    }
  };

  const handleStarClick = async (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, isImportant: !task.isImportant };
    try {
      await updateTodo(updatedTask.id, updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasksState(updatedTasks);
    } catch {
      notification.error({
        message: "Error Updating Importance",
        description: "There was an error updating the importance of the task.",
      });
    }
  };

  return (
    <div className="w-full p-4">
      <div className="w-9/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <img
              src={notask}
              alt="No tasks available"
              className="w-full max-w-xs"
            />
            <p className="text-gray-600 text-lg mt-4">No tasks added.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col"
            >
              <div className="flex items-start space-x-4">
                <div className="flex items-center">
                  <Checkbox
                    checked={task.isChecked}
                    onChange={(e) => handleCheckboxChange(e, task.id)}
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {task.title}
                  </h2>

                  <p className="text-gray-600 mb-4">{task.description}</p>

                  <span className="text-sm text-gray-500 mb-4">
                    Status: {task.isChecked ? "Completed" : "Pending"}
                  </span>

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
      <AddToDoModal
        visible={visible}
        initialValues={selectedTask}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

ToDoGrid.propTypes = {
  setTasks: PropTypes.func.isRequired,
};

ToDoGrid.defaultProps = {
  tasks: [],
};

export default ToDoGrid;
