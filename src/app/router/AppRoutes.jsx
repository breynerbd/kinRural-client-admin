import { Routes, Route } from "react-router-dom";
import AuthPage from "../../features/auth/pages/AuthPage.jsx";
import DashboardPage from "../layouts/DashboardPage.jsx";

// features
import { Users } from "../../features/users/components/Users.jsx";
import { UserModal } from "../../features/users/components/UserModal.jsx";

import { Roles } from "../../features/roles/components/Roles.jsx";
import { RoleModal } from "../../features/roles/components/RoleModal.jsx";

import { Accounts } from "../../features/accounts/components/Accounts.jsx";
import { AccountModal } from "../../features/accounts/components/AccountModal.jsx";

import { AccountRequests } from "../../features/accountRequests/components/AccountRequests.jsx";
import { AccountRequestModal } from "../../features/accountRequests/components/AccountRequestModal.jsx";

import { Loans } from "../../features/loans/components/Loans.jsx";
import { LoanModal } from "../../features/loans/components/LoanModal.jsx";

import { Cards } from "../../features/cards/components/Cards.jsx";
import { CardModal } from "../../features/cards/components/CardModal.jsx";

import { Transactions } from "../../features/transactions/components/Transactions.jsx";
import { TransactionModal } from "../../features/transactions/components/TransactionModal.jsx";


export const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<AuthPage />} />

      {/* Dashboard */}
      <Route path="/dashboard/*" element={<DashboardPage />}>

        {/* Usuarios */}
        <Route path="users" element={<Users />} />
        <Route path="users/create" element={<UserModal />} />

        {/* Roles */}
        <Route path="roles" element={<Roles />} />
        <Route path="roles/create" element={<RoleModal />} />

        {/* Cuentas */}
        <Route path="accounts" element={<Accounts />} />
        <Route path="accounts/create" element={<AccountModal />} />

        {/* Solicitudes */}
        <Route path="account-requests" element={<AccountRequests />} />
        <Route path="account-requests/review" element={<AccountRequestModal />} />

        {/* Préstamos */}
        <Route path="loans" element={<Loans />} />
        <Route path="loans/review" element={<LoanModal />} />

        {/* Tarjetas */}
        <Route path="cards" element={<Cards />} />
        <Route path="cards/review" element={<CardModal />} />

        {/* Transacciones */}
        <Route path="transactions" element={<Transactions />} />
        <Route path="transactions/review" element={<TransactionModal />} />


      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};