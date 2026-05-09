// src/features/transactions/hooks/useSaveTransaction.js

import { TransactionsStore } from "../store/TransactionsStore";

export const useSaveTransaction = () => {

  const createTransactionStore = TransactionsStore(
    (state) => state.createTransaction
  );

  const handleCreate = async (formData) => {

    if (
      !formData.cuenta_origen_id ||
      !formData.cuenta_destino_id ||
      !formData.monto
    ) {
      return false;
    }

    const response = await createTransactionStore(formData);

    return response.ok;
  };

  return {
    handleCreate,
  };
};