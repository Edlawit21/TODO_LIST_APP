import { Button } from "antd";
import { useState } from "react";
import AddToDoModal from "../components/AddToDoModal";
import Header from "../components/Header";
import NavLinks from "../components/NavLinks";
import Filter from "../components/Filter";
import { notification } from "antd";
import ToDoGrid from "../components/ToDoGrid";
import ToDoList from "../components/ToDoList";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todo, setTodo] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [activeView, setActiveView] = useState("list");

  const handleModalOpen = () => {
    setTodo(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (values) => {
    const newTask = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      isChecked: false,
    };

    setTasks([...tasks, newTask]);
    setIsModalOpen(false);

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

      <div className="flex justify-center mt-6">
        <Button type="primary" onClick={handleModalOpen}>
          Add To Do
        </Button>
        <AddToDoModal
          initialValues={todo}
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
          visible={isModalOpen}
        />
      </div>
      <div>
        <Filter activeView={activeView} setActiveView={setActiveView} />
      </div>
      <div>
        {activeView === "list" ? (
          <ToDoList tasks={tasks} />
        ) : (
          <ToDoGrid tasks={tasks} />
        )}
      </div>
    </div>
  );
};

export default Home;
