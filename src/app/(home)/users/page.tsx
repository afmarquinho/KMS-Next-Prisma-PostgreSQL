import { UserContainer } from "@/components";
import { Metadata } from "next";

//TODO: LO SIGUIENTE ES COLOCAR EL MODAL CON EL FORMULARIO PARA CREAR O EDITAR UN NUEVO USUARIO, 1. CREAR EL COMPONENTE Y UBICARLO EN EL FONDO DE ESTA PAGINA. 2.COLOCAR EL FONDO OPACO, NEGRO PERO CON EFECTO BLUR
export const metadata: Metadata = {
  title: "KMS - Usuarios",
  description: "Mange your processes eficiently",
};

const UserPage = () => {
  return <UserContainer />;
};
export default UserPage;
