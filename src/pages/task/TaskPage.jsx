import React, { useState, useRef } from "react";
import PageContainer from "../../containers/home/PageContainer";
import SectionIntro from "../../components/generic/SectionIntro";
import { Grid2, Toolbar, Fab } from "@mui/material";
import Title from "../../components/generic/Title";
import Column from "../../containers/task/Column";
import CreateNewTask from "../../containers/task/CreateNewTask";

const TaskPage = () => {
  const [pendingTasks, setPendingTasks] = useState([
    {
      id: 1,
      title: "Reunión de equipo",
      date: "Hoy, 10:00 am",
      color: "#f00",
      isChecked: false,
    },
    {
      id: 2,
      title: "Planificación semanal",
      date: "Mañana, 3:00 pm",
      color: "#0f0",
      isChecked: false,
    },
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    {
      id: 3,
      title: "Reporte mensual",
      date: "Ayer, 2:00 pm",
      color: "#00f",
      isChecked: true,
    },
  ]);

  const [predictedColumn, setPredictedColumn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", color: "#000" });

  const pendingRef = useRef(null);
  const completedRef = useRef(null);

  const removeDuplicates = (tasks) => {
    const uniqueTasks = tasks.filter(
      (task, index, self) => self.findIndex((t) => t.id === task.id) === index
    );
    return uniqueTasks;
  };

  const moveTask = (task, toCompleted) => {
    if (toCompleted) {
      // setPendingTasks((prev) => prev.filter((t) => t.id !== task.id));
      // setCompletedTasks((prev) => [...prev, { ...task, isChecked: true }]);
      setPendingTasks((prev) =>
        removeDuplicates(prev.filter((t) => t.id !== task.id))
      );
      setCompletedTasks((prev) =>
        removeDuplicates([...prev, { ...task, isChecked: true }])
      );
    } else {
      setCompletedTasks((prev) =>
        removeDuplicates(prev.filter((t) => t.id !== task.id))
      );
      setPendingTasks((prev) =>
        removeDuplicates([...prev, { ...task, isChecked: false }])
      );
    }
    setPredictedColumn(null);
  };

  const handleDrag = (event, fromColumn) => {
    const pendingBox = pendingRef.current.getBoundingClientRect();
    const completedBox = completedRef.current.getBoundingClientRect();

    const draggedX = event.clientX;
    const draggedY = event.clientY;

    if (
      draggedX > pendingBox.left &&
      draggedX < pendingBox.right &&
      draggedY > pendingBox.top &&
      draggedY < pendingBox.bottom
    ) {
      setPredictedColumn("pending");
    } else if (
      draggedX > completedBox.left &&
      draggedX < completedBox.right &&
      draggedY > completedBox.top &&
      draggedY < completedBox.bottom
    ) {
      setPredictedColumn("completed");
    } else {
      setPredictedColumn(fromColumn);
    }
  };

  const handleDragEnd = (event, task, fromPending) => {
    const pendingBox = pendingRef.current.getBoundingClientRect();
    const completedBox = completedRef.current.getBoundingClientRect();

    const droppedX = event.clientX;
    const droppedY = event.clientY;

    if (
      droppedX > pendingBox.left &&
      droppedX < pendingBox.right &&
      droppedY > pendingBox.top &&
      droppedY < pendingBox.bottom
    ) {
      if (!fromPending) moveTask(task, false);
    } else if (
      droppedX > completedBox.left &&
      droppedX < completedBox.right &&
      droppedY > completedBox.top &&
      droppedY < completedBox.bottom
    ) {
      if (fromPending) moveTask(task, true);
    }
    setPredictedColumn(null);
  };

  const handleCheckboxChange = (task, fromPending) => {
    moveTask(task, fromPending);
  };

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveTask = () => {
    const newTaskWithId = {
      ...newTask,
      id: Date.now(),
      date: "Sin fecha",
      isChecked: false,
    };
    setPendingTasks((prev) => [...prev, newTaskWithId]);
    setNewTask({ title: "", color: "#000" });
    handleCloseModal();
  };

  return (
    <PageContainer>
      <Toolbar />

      <Title
        title="Tus"
        highlight="tareas"
        description="Gestiona tus tareas de usuario"
        hiddenTitle="Tareas de Usuario"
      />

      <Grid2 container spacing={4}>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <SectionIntro
            smaller
            title="Tus tareas pendientes"
            description="Gestiona tus tareas en la lista de pendientes"
          />
          <Column
            predictedColumn={predictedColumn}
            tasks={pendingTasks}
            ref={pendingRef}
            onDrag={(event) => handleDrag(event, "pending")}
            onDragEnd={(event, task) => handleDragEnd(event, task, true)}
            onCheckboxChange={(task) => handleCheckboxChange(task, true)}
            columnType="pending"
          />
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <SectionIntro
            smaller
            title="Tus tareas completadas"
            description="Consulta tus tareas ya realizadas"
          />
          <Column
            predictedColumn={predictedColumn}
            tasks={completedTasks}
            ref={completedRef}
            onDrag={(event) => handleDrag(event, "completed")}
            onDragEnd={(event, task) => handleDragEnd(event, task, false)}
            onCheckboxChange={(task) => handleCheckboxChange(task, false)}
            columnType="completed"
          />
        </Grid2>
      </Grid2>

      <Fab
        color="primary"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "black",
        }}
        onClick={handleOpenModal}
      >
        +
      </Fab>

      <CreateNewTask 
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        newTask={newTask}
        setNewTask={setNewTask}
        handleSaveTask={handleSaveTask}
      />
     
    </PageContainer>
  );
};

export default TaskPage;
