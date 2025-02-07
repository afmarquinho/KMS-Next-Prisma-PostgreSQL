import Image from "next/image";
import logo from "../../../public/logo.png";
import { LoginForm } from "@/components/login";

//TODO: Revisar que no puedo hacer el Login.module.css

const LoginPage = () => {
  return (
    <div
      className={`bg-login bg-login w-full h-screen bg-cover bg-top relative flex flex-col`}
    >
      <div className={`absolute inset-0 bg-black bg-opacity-80`} />
      <h1
        className={`text-red-600 font-black text-2xl md:text-5xl lg:text-7xl relative z-20`}
      >
        Kassya
      </h1>
      <div className={`relative z-20 flex justify-center items-center flex-1`}>
        <div
          className={`absolute w-32 h-32 z-10 bg-gray-400 top-[5rem] md:top-[1rem] p-4 rounded-full`}
        >
          <div
            className={`bg-white h-full w-full rounded-full flex justify-center items-center`}
          >
            <div className={`w-16 relative bg-orange`}>
              <Image src={logo} width={100} height={100} alt="Kassya" />
            </div>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
