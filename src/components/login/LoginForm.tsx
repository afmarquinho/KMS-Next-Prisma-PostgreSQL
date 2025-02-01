"use client"

import { AtSignIcon, KeyRoundIcon } from "lucide-react"
import { useRouter } from "next/navigation";

export const LoginForm = () => {

    const router = useRouter();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      router.push("/dashboard");
    };

  return (
    <form
    className={`bg-gray-500 px-6 pb-6 pt-16 w-11/12 max-w-[350px]`}
    onSubmit={handleSubmit}
  >
    <h2 className={`text-center text-white font-light text-xl mb-2`}>
      Mi cuenta
    </h2>
    <div className={`text-base p-6 bg-blue-300 rounded-md`}>
      <h3 className={`text-red-600 font-bold text-center`}>Login</h3>
      <div className={`mb-4`}>
        <div className={`flex gap-1 justify-start items-center mb-2`}>
          <AtSignIcon className={`text-red-600`} />
          <label className={`text-slate-800 dark:text-slate-800`}>
            Correo
          </label>
        </div>
        <input
          type="text"
          className={`w-full p-2 focus:outline-none bg-gray-100`}
        />
      </div>
      <div className={`mb-5`}>
        <div className={`flex gap-1 justify-start items-center mb-2`}>
          <KeyRoundIcon className={`text-red-600`} />
          <label className={`text-slate-800 dark:text-slate-800`}>
            Contraseña
          </label>
        </div>
        <input
          type="password"
          className={`w-full p-2 focus:outline-none bg-gray-100`}
        />
      </div>
      <div className={`mb-`}>
        <input
          type="submit"
          className={`w-full p-2 focus:outline-none bg-red-600 hover:bg-red-700 text-white transition cursor-pointer text-center font-semibold`}
          value={"Iniciar Sesión"}
        />
      </div>
    </div>
  </form>
  )
}