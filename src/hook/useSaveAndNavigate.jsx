import { useNavigate } from 'react-router-dom';
import { patchPomodoroStateAndTime } from '../services/pomo.service';

const useSaveAndNavigate = () => {
    const navigate = useNavigate();

    const saveAndNavigate = async (path, { state, time }, userToken) => {
        try {
            await patchPomodoroStateAndTime({ state, time }, userToken);
            navigate(path);
        } catch (error) {
            console.error("Error al guardar el estado del pomodoro antes de navegar:", error);
        }
    };

    return saveAndNavigate;
};

export default useSaveAndNavigate;