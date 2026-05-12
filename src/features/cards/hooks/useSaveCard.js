import { CardsStore } from "../store/CardsStore";

export const useSaveCard = () => {
  const approveCard = CardsStore((state) => state.approveCard);
  const activateCard = CardsStore((state) => state.activateCard);
  const blockCard = CardsStore((state) => state.blockCard);

  return {
    approveCard,
    activateCard,
    blockCard,
  };
};
