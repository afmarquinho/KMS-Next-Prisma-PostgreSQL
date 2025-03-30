import axios from "axios";

const API = axios.create({ baseURL: "/api/notes/procurement" });



export const useProcurementNotes = () => {

  const createNote = async (id: number, note: string) => {
    try {
      const { data } = await API.post(`/${id}`, { note });
      return { ok: data.ok, data: data.data, message: data.message };
    } catch (error: unknown) {
      console.error("Error al procesesar la solicitud:", error);

      //* Verifica si el error es una instancia de axios o solo un error
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : "Error al crear el comentario.";

      return { ok: false, data: null, message: errorMessage };
    }
  };

  return {
    createNote,
  };
};
