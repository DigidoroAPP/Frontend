import React from "react";
import PageContainer from "../../containers/home/PageContainer";
import { Box, Grid2, Toolbar } from "@mui/material";
import SectionIntro from "../../components/generic/SectionIntro";
import TaskPreview from "../../components/home/TaskPreview";
import CustomInput from "../../components/generic/CustomInput";
import PomodoroPreview from "../../components/home/PomodoroPreview";

const ProtectedHome = () => {
  return (
    <PageContainer>
      <Toolbar />
      <h2 className="text-[#202124] font-extrabold text-6xl">
        Hola de nuevo, <span className="text-accent_color">Usuario</span>
      </h2>
      <Grid2 container spacing={4}>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <SectionIntro
            smaller
            title="Tus actividades"
            description="Hecha un vistazo a tus tareas pendientes"
          />
          <div className="grid grid-cols-1 gap-4">
            <TaskPreview
              title="Reunión de equipo"
              date="Hoy, 10:00 am"
              dividerColor="bg-accent_color"
              link="/reunion"
            />
            <TaskPreview
              title="Reunión de equipo"
              date="Hoy, 10:00 am"
              dividerColor="bg-cherry_red_accent"
              link="/reunion"
            />
            <TaskPreview
              title="Reunión de equipo"
              date="Hoy, 10:00 am"
              dividerColor="bg-mint_accent"
              link="/reunion"
            />
          </div>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }}>
          <SectionIntro
            smaller
            title="Tus pomodoros"
            description="Tus sesiones recientes"
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <PomodoroPreview
              color="#FFDD93"
              title="Estudiar para Matemáticas"
              session="Sesión #2"
            />
            <PomodoroPreview
              color="#f00"
              title="Estudiar para Matemáticas"
              session="Sesión #2"
            />
            {/* <PomodoroPreview
              color="#FF2D93"
              title="Estudiar para Matemáticas"
              session="Sesión #2"
            /> */}
          </Box>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

export default ProtectedHome;
