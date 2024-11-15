import { Button } from "antd";
import { useState } from "react";
import AddToDoModal from "../components/AddToDoModal";
import Header from "../components/Header";
import NavLinks from "../components/NavLinks";
import Filter from "../components/Filter";
import { notification } from "antd"; // Import notification
import ToDoGrid from "../components/ToDoGrid";
import ToDoList from "../components/ToDoList";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todo, setTodo] = useState(null); // State to hold the task for editing
  const [tasks, setTasks] = useState([]); // State for the list of tasks
  const [activeView, setActiveView] = useState("list"); // State for toggling between views

  // Open modal to add a new task
  const handleModalOpen = () => {
    setTodo(null); // Clear the todo state to ensure the form is empty when adding a new task
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Handle form submission
  const handleFormSubmit = (values) => {
    const newTask = {
      id: Date.now(), // Unique ID based on timestamp
      title: values.title,
      description: values.description,
      isChecked: false,
    };

    setTasks([...tasks, newTask]); // Add the new task to the tasks array
    setIsModalOpen(false); // Close the modal after form submission

    // Show success notification
    notification.success({
      message: "Task Added",
      description: "Your new task has been successfully added.",
    });
  };

  return (
    <div className="h-screen w-screen">
      <div className="bg-blue-300 ">
        <Header />
        <div className="flex justify-center">
          <NavLinks />
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="primary" onClick={handleModalOpen}>
          Add To Do
        </Button>
        <AddToDoModal
          initialValues={todo} // Pass the task to be edited (null for new task)
          onClose={handleModalClose} // Close the modal when called
          onSubmit={handleFormSubmit} // Handle form submission
          visible={isModalOpen} // Modal visibility state from parent
        />
      </div>
      <div>
        <Filter activeView={activeView} setActiveView={setActiveView} />
      </div>
      <div>
        {/* Conditionally render based on activeView */}
        {activeView === "list" ? (
          <ToDoList tasks={tasks} setTasks={setTasks} />
        ) : (
          <ToDoGrid tasks={tasks} setTasks={setTasks} />
        )}
      </div>
    </div>
  );
};

export default Home;
