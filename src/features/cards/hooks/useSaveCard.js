import toast from "react-hot-toast";
import { CardsStore } from "../store/CardsStore";

export const useSaveCard = () => {
  const approveCardStore = CardsStore(
    (state) => state.approveCard
  );

  const activateCardStore = CardsStore(
    (state) => state.activateCard
  );

  const blockCardStore = CardsStore(
    (state) => state.blockCard
  );

  /* =========================
     APPROVE / REJECT
  ========================= */

  const handleAction = async (id, action) => {
    try {

      await approveCardStore(id, action);

      toast.success(
        action === "APROBADA"
          ? "Tarjeta aprobada"
          : "Tarjeta rechazada"
      );

      return true;

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
          "Error al procesar tarjeta"
      );

      return false;
    }
  };

  /* =========================
     ACTIVATE
  ========================= */

  const handleActivate = async (id) => {
    try {

      await activateCardStore(id);

      toast.success("Tarjeta activada");

      return true;

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
          "Error al activar tarjeta"
      );

      return false;
    }
  };

  /* =========================
     BLOCK
  ========================= */

  const handleBlock = async (id) => {
    try {

      await blockCardStore(id);

      toast.success("Tarjeta bloqueada");

      return true;

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
          "Error al bloquear tarjeta"
      );

      return false;
    }
  };

  return {
    handleAction,
    handleActivate,
    handleBlock,
  };
};