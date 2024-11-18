import { clsx } from "clsx";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import TaskItem from "../../components/task/TaskItem";
import { AssignmentTurnedIn, AssignmentLate } from "@mui/icons-material";

const Column = React.forwardRef(
  (
    {
      predictedColumn,
      tasks,
      onDrag,
      onDragEnd,
      onCheckboxChange,
      columnType,
    },
    ref
  ) => {
    const [draggingTaskId, setDraggingTaskId] = useState(null);
    const [removingTaskId, setRemovingTaskId] = useState(null);

    // Esta funcion se encarga de manejar el cambio de estado de la tarea
    const handleCheckboxChange = (task) => {
      setRemovingTaskId(task.id); 
      setTimeout(() => {
        onCheckboxChange(task); 
        setRemovingTaskId(null);
      }, 300);
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "p-4 bg-tertiary_color border-4 border-tertiary_color rounded-lg",
          predictedColumn === columnType && "!border-accent_color"
        )}
      >
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-500 text-sm gap-3">
            {columnType === "pending" ? (
              <AssignmentLate fontSize="medium" className="text-gray-400" />
            ) : (
              <AssignmentTurnedIn fontSize="medium" className="text-gray-400" />
            )}
            <p>
              {columnType === "pending"
                ? "¡No tienes tareas pendientes!"
                : "¡No hay tareas completadas aún!"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    removingTaskId === task.id
                      ? { opacity: 0, y: 10 } 
                      : {}
                  }
                  drag
                  dragSnapToOrigin
                  onDragStart={() => setDraggingTaskId(task.id)}
                  onDrag={(event) => onDrag(event, columnType)}
                  onDragEnd={(event) => {
                    onDragEnd(event, task);
                    setDraggingTaskId(null);
                  }}
                  className={clsx(
                    "cursor-pointer",
                    draggingTaskId === task.id && "z-[1000]"
                  )}
                >
                  <TaskItem
                    {...task}
                    onCheckboxChange={() => handleCheckboxChange(task)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);

Column.displayName = "Column";

Column.propTypes = {
  predictedColumn: PropTypes.string,
  tasks: PropTypes.array.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  columnType: PropTypes.string.isRequired,
};

export default Column;
