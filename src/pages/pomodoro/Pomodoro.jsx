import React, { useEffect, useState } from 'react'
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
import { getAllPomodoros, patchTodosInPomodoros } from '../../services/pomo.service'
import { getTasks } from '../../services/task.sevice'

export const Pomodoro = () => {
    // Manejo del pomodoro (Segundos y minutos)
    const [selectedPomodoroTask, setSelectedPomodoroTask] = useState(null);
    
    // Para traer todo lo que se encuentra remoto y manejo de datos
    const [remoteTasks, setRemoteTasks] = useState([]);
    const [remoteTaksPomodoro, setRemotePomodorosTasks] = useState([]);
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
            const todos = tasks.map(task => task._id);
            const newPomodoroTask = await patchTodosInPomodoros({todos}, user?.token);
            console.log(newPomodoroTask);
        } catch (error) {
            console.error("Error al guardar la tarea", error);
        }
    }

    return (
        <PageContainer>
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

            <Title
                title="Tus"
                highlight="pomos"
                description="Pesonaliza y crea tus sesiones"
                hiddenTitle="Pomos de Usuario"
            />

            <Grid2 container spacing={4}>
                <Grid2 item size={{ xs: 12, md: 6 }}>
                    <SectionIntro
                        smaller
                        title="Sesiones"
                        description="Mira tus tareas completadas"
                    />
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2}>
                {
                    remoteTaksPomodoro.length > 0 ? (
                        remoteTaksPomodoro.map((session) => (
                            <Grid2
                                key={session.id}
                                item
                                size={{ xs: 12, md: 6, lg: 4 }}
                            >
                                <SesionItem
                                    title={session.title}
                                    dividerColor={session.color}
                                    maxValue={session.maxValue}
                                    actualValue={session.actualValue}
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

            <CreateNewPomodoro
                isModalOpen={isModalOpen}
                handleCloseModal={handleModal}
                handleSavePomodoroTask={handleSavePomodoroTask}
                options={remoteTasks}
            />
        </PageContainer>
    )
}
