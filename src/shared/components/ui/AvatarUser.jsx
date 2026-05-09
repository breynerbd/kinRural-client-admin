import { useState, useRef, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useAuthStore } from "../../../features/auth/store/authStore.js";

import defaultAvatarImg from "../../../assets/img/kinrural_logo.png";

export const AvatarUser = () => {
  const { user, logout } = useAuthStore();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const toggleMenu = () => setOpen((prev) => !prev);

  // cerrar el dropdown cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();

    navigate("/", { replace: true });
  };

  const avatarSrc =
    user?.profilePicture && user.profilePicture.trim() !== ""
      ? user.profilePicture
      : defaultAvatarImg;

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        onClick={toggleMenu}
        src={avatarSrc}
        alt={user?.username}
        className="
          w-10
          h-10
          rounded-full
          object-cover
          border
          cursor-pointer
        "
        onError={(e) => {
          e.target.onerror = null;

          e.target.src = defaultAvatarImg;
        }}
      />

      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-56
            bg-white
            border
            border-gray-200
            rounded-lg
            shadow-lg
            animate-fadeIn
            z-50
            overflow-hidden
          "
        >
          <div className="px-4 py-3 border-b space-y-3">
            <div>
              <span
                className="
        text-[10px]
        uppercase
        tracking-wider
        text-gray-400
        font-bold
      "
              >
                Nombre de usuario
              </span>

              <p className="font-semibold text-gray-800 truncate">
                {user?.username || "Administrador"}
              </p>
            </div>

            <div>
              <span
                className="
        text-[10px]
        uppercase
        tracking-wider
        text-gray-400
        font-bold
      "
              >
                Correo electrónico
              </span>

              <p className="text-sm text-gray-500 truncate">
                {user?.email || "Sin correo"}
              </p>
            </div>

            <div>
              <span
                className="
        text-[10px]
        uppercase
        tracking-wider
        text-gray-400
        font-bold
      "
              >
                Rol
              </span>

              <p className="text-xs text-[#8B4513] font-semibold uppercase tracking-wide">
                {user?.role || "ADMIN"}
              </p>
            </div>
          </div>

          <ul className="p-2 text-sm text-gray-700 font-medium">
            {/*
            <li>
              <Link
                to="/dashboard"
                className="block w-full p-2 rounded-md hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/users"
                className="block w-full p-2 rounded-md hover:bg-gray-100"
              >
                Usuarios
              </Link>
            </li>
            */}

            <li>
              <button
                onClick={handleLogout}
                className="
                  block
                  w-full
                  text-left
                  p-2
                  rounded-md
                  hover:bg-red-100
                  text-red-600
                  transition
                "
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
