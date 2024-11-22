import React from "react";
import PageContainer from "../../containers/home/PageContainer";
import { Box, Grid2, Toolbar } from "@mui/material";
import SectionIntro from "../../components/generic/SectionIntro";
import TaskPreview from "../../components/home/TaskPreview";
import CustomInput from "../../components/generic/CustomInput";
import PomodoroPreview from "../../components/home/PomodoroPreview";
import { useAuth } from "../../context/AuthContext";
import Title from "../../components/generic/Title";

const ProtectedHome = () => {
  const { user, loading } = useAuth();
  
  return (
    <PageContainer>
      <Title
        as="h2"
        title="Hola de nuevo, "
        highlight={user?.name || "Usuario"}
        description="Bienvenido a nuestra plataforma"
        hiddenTitle="Página de Inicio"
      />

      <p className="bg-red-600">{JSON.stringify(user)}</p>

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
