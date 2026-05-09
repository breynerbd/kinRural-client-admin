import { useLoanStore } from "../store/loanStore";

export const useSaveLoan = () => {

  const approveLoan = useLoanStore(
    (state) => state.approveLoan
  );

  const rejectLoan = useLoanStore(
    (state) => state.rejectLoan
  );

  const payLoanInstallment = useLoanStore(
    (state) => state.payLoanInstallment
  );

  return {
    approveLoan,
    rejectLoan,
    payLoanInstallment,
  };
};