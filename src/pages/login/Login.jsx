import { Grid2, Box } from "@mui/material";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/generic/CustomInput";
import SectionIntro from "../../components/generic/SectionIntro";
import { loginSchema } from "../../validations/LoginSchema";
import DigiLogo from "../../components/generic/DigiLogo";
import { EmailIcon } from "../../components/generic/Icons";
import CustomButton from "../../components/generic/CustomButton";
import CustomLink from "../../components/generic/CustomLink";
import PasswordToggleIcon from "../../components/login/PasswordToggleIcon";
import { VIEWS } from "../../lib/views";
import LoginPageContainer from "../../containers/login/LoginPageContainer";

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

  const onSubmit = async (data) => {
    const { name, email } = data;

    try {
      setLoading(true);
      await loginUser(name, email);
    } catch (error) {
      console.error("Error al registrarse", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      <Box
        sx={{
          p: { xs: 3, sm: 4.5 },
          borderRadius: 2,
          mx: "auto",
          maxWidth: "500px",
          backgroundColor: "white",
          boxShadow:
            "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
        }}
      >
        <DigiLogo className="justify-center" />
        <SectionIntro
          title="Iniciar sesión"
          description="Inicia sesión para continuar"
        />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid2 container spacing={3}>
            {/* correo */}
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

            {/* contraseña */}
            <Grid2 item size={12}>
              <CustomInput
                innerRef={register("password")}
                labelText="Tu contraseña"
                name="password"
                placeholder="Contraseña"
                errors={errors.password}
                type={showPassword ? "text" : "password"}
                iconPosition="right"
                icon={
                  <PasswordToggleIcon
                    showPassword={showPassword}
                    onToggle={togglePasswordVisibility}
                  />
                }
              />
            </Grid2>

            <Grid2 item size={12}>
              <CustomButton type="submit" className="mt-4">
                Iniciar sesión
              </CustomButton>
            </Grid2>

            <Grid2 item size={12} className="text-center">
              <CustomLink
                href={VIEWS.register}
                title="¿No tienes cuenta? Regístrate"
              />
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </LoginPageContainer>
  );
};

export default Login;
