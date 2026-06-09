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

      let message = errorMsg;

      if (Array.isArray(data?.error) && data.error.length > 0) {
        message = data.error[0].message;
      } else if (typeof data?.message === "string") {
        message = data.message;
      } else if (typeof data?.error === "string") {
        message = data.error;
      }

      showError(message);
    }
  };

  return { handleSubmit };
};
