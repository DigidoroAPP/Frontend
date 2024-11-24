import React, { useEffect, useState } from 'react'
import PageContainer from '../../containers/home/PageContainer'
import { Fab, Grid2, Tab, Tabs, Toolbar } from '@mui/material'
import Title from '../../components/generic/Title'
import { AnimatePresence } from 'framer-motion'
import { Counter } from '../../components/pomodoro/counter'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import SectionIntro from '../../components/generic/SectionIntro'
import { SesionItem } from '../../components/pomodoro/sesionItem'
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import CreateNewPomodoro from '../../containers/pomodoro/CreateNewPomodoro'
import ProgressRadioButtons from '../../components/pomodoro/ProgressRadioButtons'

const TIME = {
    POMODORO: 0.05 * 60,
    SHORT_BREAK: 0.05 * 60,
    SECONDS: 60,
}

export const Pomodoro = () => {
    const [value, setValue] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [taskSelected, setTaskSelected] = useState(null)
    const [timeLeft, setTimeLeft] = useState(TIME.POMODORO);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSession, setNewSession] = useState({ title: "", color: "#000", maxValue: 0, actualValue: 0 });
    const [sessions, setSessions] = useState([
        {
            id: 1,
            title: "Reporte mensual",
            color: "#00f",
            maxValue: 4,
            actualValue: 0
        },
        {
            id: 2,
            title: "Reporte mensual",
            color: "#0f0",
            maxValue: 3,
            actualValue: 0
        }
    ]);

    const handleChange = (event, newValue) => {
        setValue(newValue)
        if (newValue === 0) setTimeLeft(TIME.POMODORO);
        if (newValue === 1) setTimeLeft(TIME.SHORT_BREAK);
    }

    const onTaskSelected = (values) => {
        setTaskSelected({
            id: values.id,
            title: values.title,
            color: values.color,
            maxValue: values.maxValue,
            actualValue: values.actualValue
        })

        setValue(0);
        setTimeLeft(TIME.POMODORO);
        setIsPlaying(false);
    }

    const handlePausePlayButton = () => {
        if (!taskSelected) return
        setIsPlaying(!isPlaying)
    }

    const handleResetButton = () => {
        if (value === 0) {
            setTimeLeft(TIME.POMODORO);
        } else if (value === 1) {
            setTimeLeft(TIME.SHORT_BREAK);
        }
    }

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleSaveSession = () => {
        setSessions((prevSessions) => [
            ...prevSessions,
            {
                ...newSession,
                id: Date.now(),
            },
        ]);
        setNewSession({ title: "", maxValue: 0, color: "#000", actualValue: 0 });
        handleModal();
    };

    useEffect(() => {
        if (!taskSelected) return;

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

                setTaskSelected((prevTask) => {
                    const updatedTask = {
                        ...prevTask,
                        actualValue: prevTask.actualValue + 1,
                    };

                    if (updatedTask.actualValue >= updatedTask.maxValue) {
                        console.log("Todos los ciclos de Pomodoro han terminado.");
                        setIsPlaying(false);
                    }

                    return updatedTask;
                });
            }
        }
    }, [timeLeft, isPlaying, value, taskSelected]);

    const minutes = Math.floor(timeLeft / TIME.SECONDS);
    const seconds = timeLeft % TIME.SECONDS;

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

            <Toolbar />
            <Title
                title="Tus"
                highlight="pomos"
                description="Pesonaliza y crea tus sesiones"
                hiddenTitle="Pomos de Usuario"
            />


            <Grid2 container justifyContent={"center"} marginTop={2}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Pomo" disabled={!taskSelected} />
                    <Tab label="Short Break" disabled={!taskSelected} />
                </Tabs>
            </Grid2>

            <Grid2 container justifyContent={"center"} marginTop={2}>
                {
                    taskSelected && (
                        <ProgressRadioButtons
                            actualValue={taskSelected.actualValue}
                            maxValue={taskSelected.maxValue}
                        />
                    )
                }
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
                {isPlaying && taskSelected ? (
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
                    sessions.map((session) => (
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
                                onClick={() => onTaskSelected(session)}
                            />
                        </Grid2>
                    ))
                }
            </Grid2>

            <CreateNewPomodoro
                isModalOpen={isModalOpen}
                handleCloseModal={handleModal}
                newSession={newSession}
                setNewSession={setNewSession}
                handleSaveSession={handleSaveSession}
            />
        </PageContainer>
    )
}
