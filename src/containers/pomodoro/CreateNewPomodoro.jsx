import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sessionSchema } from "../../validations/SessionSchema";
import { Box, Button, FormLabel, Modal } from "@mui/material";
import CustomInput from "../../components/generic/CustomInput";
import { CirclePicker } from "react-color";
import PropTypes from "prop-types";

const CreateNewPomodoro = ({
    isModalOpen,
    handleCloseModal,
    newSession,
    setNewSession,
    handleSaveSession,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(sessionSchema),
        defaultValues: {
            title: newSession.title,
            session: newSession.maxValue,
            color: newSession.color,
        },
    });


    const onSubmit = (data) => {
        console.log(data);
    };

    const handleColorChange = (color) => {
        setNewSession({ ...newSession, color: color.hex });
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
                        placeholder="Escribe el título de la sesión"
                        errors={errors.title}
                    />

                    <CustomInput
                        innerRef={register("session", { valueAsNumber: true })}
                        labelText="Sesión"
                        name="session"
                        placeholder="Número de sesiones"
                        errors={errors.session}
                        type="number"
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
                            color={newSession.color}
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
                            onClick={handleSaveSession}
                        >
                            Guardar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

CreateNewPomodoro.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    newSession: PropTypes.object.isRequired,
    setNewSession: PropTypes.func.isRequired,
    handleSaveSession: PropTypes.func.isRequired,
};

export default CreateNewPomodoro;