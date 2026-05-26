import { useUsersStore } from "../store/userStore";

export const useSaveUser = () => {
  const createUser = useUsersStore((state) => state.createUser);
  const updateUser = useUsersStore((state) => state.updateUser);

  const saveUser = async (data, userId = null) => {
    const payload = {
      nombre: data.nombre,
      apellido: data.apellido,
      dpi: data.dpi,
      correo: data.correo,
      telefono: data.telefono,
      direccion: data.direccion,
      ingresos_mensuales: Number(data.ingresos_mensuales),

      // 👇 CAMBIO IMPORTANTE
      role: data.role,
    };

    if (!userId) {
      payload.username = data.username;
      payload.password = data.password;
    }

    if (userId) {
      await updateUser(userId, payload);
    } else {
      await createUser(payload);
    }
  };

  return { saveUser };
};
