import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUsersStore } from "../store/userStore";
import { useSaveUser } from "../hooks/useSaveUser";
import { useFormSubmit } from "../../../shared/hooks/useFormSubmit";
import { useAuthStore } from "../../auth/store/authStore";

export const UserModal = ({ isOpen, onClose, user }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { saveUser } = useSaveUser();

  const currentUser = useAuthStore((state) => state.user);

  const isMasterAdmin = currentUser?.role === "MASTER_ADMIN";

  const isEditingMasterAdmin = user?.role === "MASTER_ADMIN";

  const loading = useUsersStore((state) => state.loading);

  useEffect(() => {
    if (isOpen) {
      if (user) {
        reset({
          nombre: user.nombre,
          apellido: user.apellido,
          dpi: user.dpi,
          correo: user.correo,
          telefono: user.telefono,
          direccion: user.direccion,
          ingresos_mensuales: user.ingresos_mensuales,
          role: user.role,
        });
      } else {
        reset({
          nombre: "",
          apellido: "",
          dpi: "",
          correo: "",
          telefono: "",
          direccion: "",
          ingresos_mensuales: "",
          role: "USER",
          username: "",
          password: "",
        });
      }
    }
  }, [isOpen, user, reset]);

  const { handleSubmit: submitWithFeedback } = useFormSubmit();

  const onSubmit = (data) =>
    submitWithFeedback({
      action: () => saveUser(data, user?.id),
      successMsg: user ? "Usuario actualizado" : "Usuario creado",
      errorMsg: "Error al guardar usuario",
      reset,
      onClose,
    });

  if (isEditingMasterAdmin && !isMasterAdmin) {
    return null;
  }

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[70]
        bg-black/50 backdrop-blur-sm
        flex justify-center items-center
        p-2 sm:p-4
      "
    >
      <div
        className="
          bg-white
          rounded-xl sm:rounded-2xl
          shadow-2xl
          w-full
          max-w-[95vw]
          sm:max-w-2xl
          lg:max-w-4xl
          max-h-[95vh]
          flex flex-col
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div
          className="
            px-4 py-4
            sm:px-5 sm:py-5
            lg:px-6 lg:py-6
            text-white
            bg-[#677750]
          "
        >
          <h2
            className="
              text-xl
              sm:text-2xl
              font-bold
              break-words
            "
          >
            {user ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              opacity-80
              mt-1
            "
          >
            Completa la información del usuario
          </p>
        </div>

        {/* FORM */}
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="
            p-4
            sm:p-6
            overflow-y-auto
            space-y-5
          "
        >
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >
            {/* NOMBRE */}
            <div className="flex flex-col min-w-0">
              <label className="label">Nombre</label>

              <input
                className="input"
                placeholder="Ej. Juan"
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                  minLength: {
                    value: 2,
                    message: "Debe tener al menos 2 caracteres",
                  },
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "Solo se permiten letras",
                  },
                })}
              />

              {errors.nombre && (
                <p className="error">{errors.nombre.message}</p>
              )}
            </div>

            {/* APELLIDO */}
            <div className="flex flex-col min-w-0">
              <label className="label">Apellido</label>

              {/* APELLIDO */}
              <input
                className="input"
                placeholder="Ej. López"
                {...register("apellido", {
                  required: "El apellido es obligatorio",
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "Solo se permiten letras",
                  },
                })}
              />

              {errors.apellido && (
                <p className="error">{errors.apellido.message}</p>
              )}
            </div>

            {/* DPI */}
            {!user && (
              <div className="flex flex-col min-w-0">
                <label className="label">DPI</label>

                <input
                  className="input"
                  placeholder="1234567890101"
                  {...register("dpi", {
                    required: "El DPI es obligatorio",
                    pattern: {
                      value: /^[0-9]{13}$/,
                      message: "El DPI debe tener exactamente 13 dígitos",
                    },
                  })}
                />

                {errors.dpi && <p className="error">{errors.dpi.message}</p>}
              </div>
            )}

            {/* CORREO */}
            <div className="flex flex-col min-w-0">
              <label className="label">Correo</label>

              <input
                className="input"
                placeholder="juanlopez@gmail.com"
                {...register("correo", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Correo inválido",
                  },
                })}
              />

              {errors.correo && (
                <p className="error">{errors.correo.message}</p>
              )}
            </div>

            {/* TELEFONO */}
            <div className="flex flex-col min-w-0">
              <label className="label">Teléfono</label>

              <input
                className="input"
                placeholder="12345678"
                {...register("telefono", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^[0-9]{8}$/,
                    message: "El teléfono debe tener 8 números",
                  },
                })}
              />

              {errors.telefono && (
                <p className="error">{errors.telefono.message}</p>
              )}
            </div>

            {/* INGRESOS */}
            <div className="flex flex-col min-w-0">
              <label className="label">Ingresos mensuales</label>

              <input
                type="number"
                className="input"
                placeholder="Q8000"
                {...register("ingresos_mensuales", {
                  required: "Los ingresos son obligatorios",
                  min: {
                    value: 100,
                    message: "Mínimo Q100",
                  },
                })}
              />

              {errors.ingresos_mensuales && (
                <p className="error">{errors.ingresos_mensuales.message}</p>
              )}
            </div>

            {/* DIRECCION */}
            <div
              className="
                flex flex-col
                md:col-span-2
                min-w-0
              "
            >
              <label className="label">Dirección</label>

              <input
                className="input"
                placeholder="14 calle A 3-18 zona 8"
                {...register("direccion", {
                  required: "La dirección es obligatoria",
                })}
              />

              {errors.direccion && (
                <p className="error">{errors.direccion.message}</p>
              )}
            </div>

            {/* ROL */}
            <div className="flex flex-col min-w-0">
              <label className="label">Rol</label>

              <select
                className="input"
                {...register("role", {
                  required: "El rol es obligatorio",
                })}
              >
                <option value="">Seleccione un rol</option>

                {/* TODOS PUEDEN CREAR USER */}
                <option value="USER">USUARIO</option>

                {/* SOLO MASTER_ADMIN PUEDE CREAR ADMIN */}
                {isMasterAdmin && <option value="ADMIN">ADMINISTRADOR</option>}

                {/* SOLO MASTER_ADMIN PUEDE CREAR MASTER_ADMIN */}
                {isMasterAdmin && (
                  <option value="MASTER_ADMIN">MASTER ADMIN</option>
                )}
              </select>

              {errors.role && <p className="error">{errors.role.message}</p>}
            </div>

            {!user && (
              <>
                {/* USERNAME */}
                <div className="flex flex-col min-w-0">
                  <label className="label">Username</label>

                  <input
                    autoComplete="new-username"
                    className="input"
                    placeholder="juanperez"
                    {...register("username", {
                      required: "El username es obligatorio",
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: "Solo letras, números y guion bajo",
                      },
                    })}
                  />

                  {errors.username && (
                    <p className="error">{errors.username.message}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div
                  className="
                    flex flex-col
                    md:col-span-2
                    min-w-0
                  "
                >
                  <label className="label">Password</label>

                  <input
                    type="password"
                    autoComplete="new-password"
                    className="input"
                    placeholder="******"
                    {...register("password", {
                      required: "La contraseña es obligatoria",
                      minLength: {
                        value: 8,
                        message: "Debe tener al menos 8 caracteres",
                      },
                    })}
                  />

                  {errors.password && (
                    <p className="error">{errors.password.message}</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* BOTONES */}
          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              sm:justify-end
              gap-3
              pt-4
              border-t
              border-[#677750]/10
            "
          >
            <button
              type="button"
              onClick={() => {
                reset();

                onClose();
              }}
              className="
                w-full
                sm:w-auto
                px-4 py-2.5
                rounded-lg
                bg-gray-100
                text-gray-600
                text-sm
                sm:text-base
                hover:bg-gray-200
                transition
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                sm:w-auto
                px-5 py-2.5
                rounded-lg
                text-white
                text-sm
                sm:text-base
                font-medium
                bg-[#677750]
                hover:opacity-90
                transition
                shadow
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Guardando..."
                : user
                  ? "Guardar cambios"
                  : "Crear usuario"}
            </button>
          </div>
        </form>
      </div>

      {/* ESTILOS */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 10px 12px;
            border-radius: 10px;
            border: 2px solid #e5e7eb;
            background: #f9fafb;
            transition: all 0.2s;
            font-size: 14px;
            min-width: 0;
          }

          .input:focus {
            outline: none;
            border-color: #677750;
            box-shadow: 0 0 0 2px rgba(103, 119, 80, 0.2);
          }

          .label {
            font-size: 13px;
            font-weight: 600;
            color: #677750;
            margin-bottom: 6px;
            word-break: break-word;
          }

          .error {
            color: #dc2626;
            font-size: 12px;
            margin-top: 4px;
            word-break: break-word;
          }

          @media (min-width: 640px) {

            .input {
              font-size: 15px;
              padding: 11px 14px;
            }

            .label {
              font-size: 14px;
            }

            .error {
              font-size: 13px;
            }

          }

          @media (min-width: 1024px) {

            .input {
              font-size: 16px;
            }

          }
        `}
      </style>
    </div>
  );
};
