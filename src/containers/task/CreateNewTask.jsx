import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Modal, Box, Button, FormLabel } from "@mui/material";
import PropTypes from "prop-types";
import { CirclePicker } from "react-color";
import { taskSchema } from "../../validations/TaskSchema";
import CustomInput from "../../components/generic/CustomInput";

const CreateNewTask = ({
  isModalOpen,
  handleCloseModal,
  newTask,
  setNewTask,
  handleSaveTask,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleColorChange = (color) => {
    setNewTask((prev) => ({ ...prev, color: color.hex }));
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 500,
          width: "95%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <CustomInput
            innerRef={register("title")}
            labelText="Título"
            name="title"
            type="text"
            placeholder="Escribe el título de la tarea"
            errors={errors.title}
          />

          <CustomInput
            innerRef={register("description")}
            labelText="Descripción"
            name="description"
            placeholder="Escribe la descripción de la tarea"
            errors={errors.description}
            multiline
            rows={4}
          />

          <div>
            <FormLabel
              htmlFor={name}
              sx={{
                color: "#202124",
                fontWeight: "800",
                lineHeight: "45px",
                marginBottom: 2,
              }}
              className="!text-xl"
            >
              Color
            </FormLabel>

            <CirclePicker
              width="100%"
              color={newTask.color}
              onChangeComplete={handleColorChange}
            />
          </div>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseModal} style={{ marginRight: "8px" }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveTask}
            >
              Guardar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

CreateNewTask.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  newTask: PropTypes.object.isRequired,
  setNewTask: PropTypes.func.isRequired,
  handleSaveTask: PropTypes.func.isRequired,
};

export default CreateNewTask;
