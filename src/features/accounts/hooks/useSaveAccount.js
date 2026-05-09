import { useAccountStore } from "../store/accountStore";

export const useSaveAccount = () => {

  const createAccount = useAccountStore(
    (state) => state.createAccount
  );

  const saveAccount = async (form) => {

    const payload = {
      tipo: form.tipo,
      saldo: Number(form.saldo),
      user_id: Number(form.user_id),
    };

    await createAccount(payload);
  };

  return {
    saveAccount,
  };
};