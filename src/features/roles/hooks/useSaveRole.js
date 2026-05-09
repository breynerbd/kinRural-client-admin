import { useRoleStore } from "../store/roleStore";

export const useSaveRole = () => {

  const createRole = useRoleStore((state) => state.createRole);

  const saveRole = async (data) => {
    return await createRole(data);
  };

  return {
    saveRole,
  };
};