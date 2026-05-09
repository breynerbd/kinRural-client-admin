import { toast } from "react-hot-toast";
import { useAccountRequestStore } from "../store/accountRequestStore";

export const useSaveAccountRequest = () => {

  const approveAccountRequest =
    useAccountRequestStore(
      (state) => state.approveAccountRequest
    );

  const rejectAccountRequest =
    useAccountRequestStore(
      (state) => state.rejectAccountRequest
    );

  // =========================
  // APPROVE
  // =========================
  const handleApprove = async (id) => {

    try {

      await approveAccountRequest(id);

      toast.success(
        "Solicitud aprobada correctamente"
      );

      return true;

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Error al aprobar solicitud"
      );

      return false;

    }

  };

  // =========================
  // REJECT
  // =========================
  const handleReject = async (id) => {

    try {

      await rejectAccountRequest(id);

      toast.success(
        "Solicitud rechazada correctamente"
      );

      return true;

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Error al rechazar solicitud"
      );

      return false;

    }

  };

  return {
    handleApprove,
    handleReject,
  };

};