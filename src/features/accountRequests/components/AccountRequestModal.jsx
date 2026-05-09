import { useSaveAccountRequest } from "../hooks/useSaveAccountRequest";
import { useAccountRequestStore } from "../store/accountRequestStore";

export const AccountRequestModal = ({
  isOpen,
  onClose,
  request,
}) => {

  const {
    handleApprove,
    handleReject,
  } = useSaveAccountRequest();

  const actionLoading = useAccountRequestStore(
    (state) => state.actionLoading
  );

  if (!isOpen || !request) return null;

  // =========================
  // ACTIONS
  // =========================
  const approve = async () => {

    const success = await handleApprove(
      request.id
    );

    if (success) {
      onClose();
    }

  };

  const reject = async () => {

    const success = await handleReject(
      request.id
    );

    if (success) {
      onClose();
    }

  };

  // =========================
  // STATUS STYLES
  // =========================
  const statusStyles = {
    PENDIENTE:
      "bg-yellow-100 text-yellow-700",

    APROBADA:
      "bg-green-100 text-green-700",

    RECHAZADA:
      "bg-red-100 text-red-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="bg-[#677750] p-6 text-white">

          <h2 className="text-2xl font-bold">
            Gestión de Solicitud
          </h2>

          <p className="text-sm opacity-80">
            Revisa la información del solicitante
          </p>

        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* FULL NAME */}
            <div>
              <p className="label">
                Nombre completo
              </p>

              <p className="value">
                {request.fullName}
              </p>
            </div>

            {/* EMAIL */}
            <div>
              <p className="label">
                Correo
              </p>

              <p className="value">
                {request.email}
              </p>
            </div>

            {/* DPI */}
            <div>
              <p className="label">
                DPI
              </p>

              <p className="value">
                {request.dpi}
              </p>
            </div>

            {/* PHONE */}
            <div>
              <p className="label">
                Teléfono
              </p>

              <p className="value">
                {request.phone}
              </p>
            </div>

            {/* ACCOUNT TYPE */}
            <div>
              <p className="label">
                Tipo de cuenta
              </p>

              <span
                className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    request.tipo === "AHORRO"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }
                `}
              >
                {request.tipo}
              </span>
            </div>

            {/* STATUS */}
            <div>
              <p className="label">
                Estado
              </p>

              <span
                className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${statusStyles[request.status]}
                `}
              >
                {request.status}
              </span>
            </div>

            {/* USER ID */}
            <div>
              <p className="label">
                Usuario ID
              </p>

              <p className="value">
                {request.user_id}
              </p>
            </div>

            {/* CREATED DATE */}
            <div>
              <p className="label">
                Fecha de solicitud
              </p>

              <p className="value">
                {
                  new Date(
                    request.createdAt
                  ).toLocaleDateString()
                }
              </p>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="pt-5 border-t border-[#677750]/10 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="
                px-4 py-2 rounded-lg
                bg-gray-100 text-gray-700
                hover:bg-gray-200
                transition
              "
            >
              Cerrar
            </button>

            {/* REJECT */}
            <button
              onClick={reject}
              disabled={
                actionLoading ||
                request.status !== "PENDIENTE"
              }
              className="
                px-5 py-2 rounded-lg
                bg-red-600 text-white
                hover:bg-red-700
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {
                actionLoading
                  ? "Procesando..."
                  : "Rechazar"
              }
            </button>

            {/* APPROVE */}
            <button
              onClick={approve}
              disabled={
                actionLoading ||
                request.status !== "PENDIENTE"
              }
              className="
                px-5 py-2 rounded-lg
                bg-green-600 text-white
                hover:bg-green-700
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {
                actionLoading
                  ? "Procesando..."
                  : "Aprobar"
              }
            </button>

          </div>

        </div>

      </div>

      {/* STYLES */}
      <style>
        {`
          .label {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 4px;
          }

          .value {
            font-weight: 600;
            color: #677750;
          }
        `}
      </style>

    </div>
  );
};