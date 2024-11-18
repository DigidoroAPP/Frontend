import { Grid2, Box } from "@mui/material";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/generic/CustomInput";
import SectionIntro from "../../components/generic/SectionIntro";
import { registerSchema } from "../../validations/RegisterSchema";
import DigiLogo from "../../components/generic/DigiLogo";
import { EmailIcon } from "../../components/generic/Icons";
import CustomButton from "../../components/generic/CustomButton";
import CustomLink from "../../components/generic/CustomLink";
import PasswordToggleIcon from "../../components/login/PasswordToggleIcon";
import { VIEWS } from "../../lib/views";
import LoginPageContainer from "../../containers/login/LoginPageContainer";

const Register = () => {
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
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    // TODO Conectar con los servicios SA. de SV.
    console.log(data);
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
          title="Regístrate"
          description="Crea una cuenta para continuar"
        />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid2 container spacing={3}>
            {/* nombre */}
            <Grid2 item size={12}>
              <CustomInput
                innerRef={register("name")}
                labelText="Tu nombre"
                name="name"
                placeholder="Nombre"
                errors={errors.name}
              />
            </Grid2>

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
                Regístrate
              </CustomButton>
            </Grid2>

            <Grid2 item size={12} className="text-center">
              <CustomLink
                href={VIEWS.login}
                title="¿Ya tienes cuenta? Inicia sesión"
              />
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </LoginPageContainer>
  );
};

export default Register;