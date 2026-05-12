import { useAccountRequestStore } from "../store/accountRequestStore";

export const useSaveAccountRequest = () => {
  const approveAccountRequest = useAccountRequestStore(
    (state) => state.approveAccountRequest
  );
  const rejectAccountRequest = useAccountRequestStore(
    (state) => state.rejectAccountRequest
  );

  return {
    approveAccountRequest,
    rejectAccountRequest,
  };
};