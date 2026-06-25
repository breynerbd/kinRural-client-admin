import { TransactionsStore } from "../store/TransactionsStore";

export const useSaveTransaction = () => {
  const createTransactionStore = TransactionsStore(
    (state) => state.createTransaction,
  );

  const handleCreate = async (formData) => {
    const { tipo, cuenta_origen_id, cuenta_destino_id, monto } = formData;

    // Validación: Lanzar errores en lugar de retornar false
    if (!monto || !tipo) {
      throw new Error("Monto y tipo son obligatorios");
    }

    if (tipo === "TRANSFERENCIA" && (!cuenta_origen_id || !cuenta_destino_id)) {
      throw new Error("Debe seleccionar cuenta origen y destino");
    }

    if (tipo === "DEPOSITO" && !cuenta_destino_id) {
      throw new Error("Debe seleccionar cuenta destino");
    }

    if (tipo === "RETIRO" && !cuenta_origen_id) {
      throw new Error("Debe seleccionar cuenta origen");
    }

    // Al haber relanzado el error en el store, await permitirá que
    // useFormSubmit capture cualquier fallo y dispare el toast.
    await createTransactionStore(formData);
  };

  return {
    handleCreate,
  };
};
