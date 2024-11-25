import React, { useEffect, useRef, useState } from 'react'
import PageContainer from '../../containers/home/PageContainer'
import { Fab, Grid2, Tab, Tabs } from '@mui/material'
import Title from '../../components/generic/Title'
import { AnimatePresence } from 'framer-motion'
import { Counter } from '../../components/pomodoro/counter'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import SectionIntro from '../../components/generic/SectionIntro'
import { SesionItem } from '../../components/pomodoro/sesionItem'
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import CreateNewPomodoro from '../../containers/pomodoro/CreateNewPomodoro'
import { TIME } from '../../lib/const'
import { useAuth } from '../../context/AuthContext'
import { getAllPomodoros, patchPomodoroStateAndTime, patchTodosInPomodoros } from '../../services/pomo.service'
import { getTasks } from '../../services/task.sevice'
import useSaveSessionOnUnload from '../../hook/useSaveSessionOnUnload'

export const Pomodoro = () => {
    // Manejo del pomodoro (Segundos y minutos)
    const [selectedPomodoroTask, setSelectedPomodoroTask] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [value, setValue] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME.POMODORO);

    // Para traer todo lo que se encuentra remoto y manejo de datos
    const [remoteTasks, setRemoteTasks] = useState([]);
    const [remoteTasksPomodoro, setRemotePomodorosTasks] = useState([]);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const { user, loading } = useAuth();

    // Manejo de estados locales 
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (loading) return;

        const fetchPomodoros = async () => {
            setLoadingFetch(true);
            try {
                const remotePomodoroTasks = await getAllPomodoros(user?.token);
                if (remotePomodoroTasks) {
                    setRemotePomodorosTasks(remotePomodoroTasks);
                    setTimeLeft(remotePomodoroTasks.time);
                    setValue(remotePomodoroTasks.state === "work" ? 0 : 1);
                }

                const remoteTasks = await getTasks(user?.token);
                if (remoteTasks) {
                    setRemoteTasks(remoteTasks);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingFetch(false);
            }
        }
        fetchPomodoros();
    }, [loading, user])

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleSavePomodoroTask = async ({ tasks }) => {
        try {
            const id_todos = tasks.map(task => task._id);
            const newPomodoroTask = await patchTodosInPomodoros({ id_todos }, user?.token);
            if (newPomodoroTask) {
                const updatedTasks = await getAllPomodoros(user?.token);
                if (updatedTasks) {
                    setRemotePomodorosTasks(updatedTasks);
                }
            }
        } catch (error) {
            console.error("Error al guardar la tarea", error);
        }
    }

    // Manejo de caso cuando se cierre sesión
    useSaveSessionOnUnload({
        timeLeft,
        sessionState: value,
        user,
        patchPomodoroStateAndTime
    })

    // Funciones de manejo del pomodoro
    useEffect(() => {
        if (timeLeft > 0 && isPlaying) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }

        if (timeLeft === 0) {
            if (value === 0) {
                setValue(1);
                setTimeLeft(TIME.SHORT_BREAK);
            } else if (value === 1) {
                setValue(0);
                setTimeLeft(TIME.POMODORO);
            }
        }
    }, [timeLeft, isPlaying, value]);

    const handlePausePlayButton = () => {
        setIsPlaying(!isPlaying);
    }

    const handleResetButton = () => {
        setIsPlaying(false);
        if (value === 0) { setTimeLeft(1500) }
        if (value === 1) { setTimeLeft(300) }
    }

    const handleChange = async (event, newValue) => {
        try {
            const state = newValue === 0 ? "work" : "break";
            const time = newValue === 0 ? TIME.POMODORO : TIME.SHORT_BREAK;
            const newPomodoroTask = await patchPomodoroStateAndTime({ state, time }, user?.token);
            if (newPomodoroTask) {
                setValue(newValue)
                if (newValue === 0) setTimeLeft(TIME.POMODORO);
                if (newValue === 1) setTimeLeft(TIME.SHORT_BREAK);

                const updatedTasks = await getAllPomodoros(user?.token);
                if (updatedTasks) {
                    setRemotePomodorosTasks(updatedTasks);
                }
            }
        } catch (error) {
            console.error("Error al actualizar el estado de la sesión", error);
        }
    }

    const minutes = timeLeft > 0 ? Math.floor(timeLeft / TIME.SECONDS) : 0;
    const seconds = timeLeft > 0 ? timeLeft % TIME.SECONDS : 0;
    
    if (loadingFetch) return <p>Cargando...</p>;

    return (
        <PageContainer>
            {/* Boton de agregar */}
            <Fab
                color="primary"
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    backgroundColor: "black",
                }}
                onClick={handleModal}
            >
                +
            </Fab>

            {/* Titulo de la pagina */}
            <Title
                title="Tus"
                highlight="pomos"
                description="Pesonaliza y crea tus sesiones"
                hiddenTitle="Pomos de Usuario"
            />

            {/* Parte de la cuenta regresiva */}
            <Grid2 container justifyContent={"center"} marginTop={2}>
                <Tabs value={value} onChange={handleChange} className='rounded-xl'>
                    <Tab label="Pomo" />
                    <Tab label="Short Break" />
                </Tabs>
            </Grid2>

            <Grid2 container spacing={2} justifyContent={"center"} alignItems={"center"} marginTop={4}>
                <AnimatePresence>
                    <Counter time={minutes} />
                </AnimatePresence>

                <p className='font-black text-8xl'>:</p>

                <AnimatePresence>
                    <Counter time={seconds} />
                </AnimatePresence>
            </Grid2>

            <Grid2 container spacing={2} justifyContent={"center"} alignItems={"center"} marginTop={4}>
                <ReplayIcon onClick={handleResetButton} sx={{ fontSize: 40 }} fontSize="medium" />
                {isPlaying && selectedPomodoroTask ? (
                    <PauseCircleOutlineOutlinedIcon
                        onClick={handlePausePlayButton}
                        sx={{ fontSize: 60 }}
                        className="bg-black rounded-full text-white"
                    />
                ) : (
                    <PlayArrowOutlinedIcon
                        onClick={handlePausePlayButton}
                        sx={{ fontSize: 60 }}
                        className="bg-black rounded-full text-white"
                    />
                )}
            </Grid2>

            {/* Parte de sesiones */}
            <Grid2 container spacing={4}>
                <Grid2 item size={{ xs: 12, md: 6 }}>
                    <SectionIntro
                        smaller
                        title="Sesiones"
                        description="Mira tus tareas y comienza a trabajar"
                    />
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2}>
                {
                    remoteTasksPomodoro?.id_todos?.length > 0 ? (
                        remoteTasksPomodoro.id_todos.map((session) => (
                            <Grid2
                                key={session.id}
                                item
                                size={{ xs: 12, md: 6, lg: 4 }}
                            >
                                <SesionItem
                                    title={session.title}
                                    dividerColor={session.color}
                                    onClick={() => setSelectedPomodoroTask(session)}
                                />
                            </Grid2>
                        ))
                    ) : (
                        <Grid2 item size={{ xs: 12 }}>
                            <p className="text-center">No hay sesiones creadas</p>
                        </Grid2>
                    )
                }
            </Grid2>

            {/* Modal */}
            <CreateNewPomodoro
                isModalOpen={isModalOpen}
                handleCloseModal={handleModal}
                handleSavePomodoroTask={handleSavePomodoroTask}
                options={remoteTasks}
            />
        </PageContainer>
    )
}
