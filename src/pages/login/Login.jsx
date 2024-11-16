import { Button, Icon, Grid2, Container, Paper, Box } from "@mui/material";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Email, People, Visibility, VisibilityOff } from "@mui/icons-material";

import CustomInput from "../../components/generic/CustomInput";
import SectionIntro from "../../components/generic/SectionIntro";
import { loginSchema } from "../../validations/LoginSchema";
import DigiLogo from "../../components/generic/DigiLogo";
import { EmailIcon } from "../../components/generic/Icons";
import PageContainer from "../../components/generic/PageContainer";
import CustomButton from "../../components/generic/CustomButton";
import CustomLink from "../../components/generic/CustomLink";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    // TODO Conectar con los servicios SA. de SV.
    console.log(data);
  };

  return (
    <PageContainer
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: { xs: 3, sm: 6 },
          mx: "auto",
          maxWidth: "450px",
          boxShadow:
            "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
        }}
      >
        <DigiLogo />
        <SectionIntro
          title="Iniciar sesión"
          description="Inicia sesión para continuar"
        />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid2 container spacing={4}>
            <Grid2 item size={12}>
              <CustomInput
                innerRef={register("email")}
                labelText="Tu correo"
                name="email"
                type="email"
                placeholder="Correo electrónico"
                errors={errors.email}
                icon={<EmailIcon width={30} height={30} />}
              />
            </Grid2>

            <Grid2 item size={12}>
              <CustomInput
                innerRef={register("password")}
                labelText="Tu contraseña"
                name="password"
                placeholder="Contraseña"
                errors={errors.password}
                type={showPassword ? "text" : "password"}
                icon={
                  showPassword ? (
                    <VisibilityOff
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                      width={30}
                      height={30}
                    />
                  ) : (
                    <Visibility
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                      width={30}
                      height={30}
                    />
                  )
                }
                iconPosition="right"
              />
            </Grid2>

            <Grid2 item size={12}>
              <CustomButton
                action={() => {
                  console.log("Iniciar sesión");
                }}
                type="submit"
                className="mt-4"
              >
                Iniciar sesión
              </CustomButton>
            </Grid2>

            <Grid2 item size={12} className="text-center">
              <CustomLink
                href="/register"
                title="¿No tienes cuenta? Regístrate"
              />
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </PageContainer>
  );
};

export default Login;
