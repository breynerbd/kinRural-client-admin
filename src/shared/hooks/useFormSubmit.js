import { showSuccess, showError } from "../utils/toast";

export const useFormSubmit = () => {
  const handleSubmit = async ({
    action,
    successMsg,
    errorMsg = "Error al guardar",
    reset,
    onClose,
  }) => {
    try {
      await action();
      showSuccess(successMsg);
      reset();
      onClose();
    } catch (error) {
      const data = error.response?.data;

      const message =
        typeof data?.message === "string"
          ? data.message
          : typeof data?.error === "string"
            ? data.error
            : errorMsg;

      showError(message);
    }
  };

  return { handleSubmit };
};