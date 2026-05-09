import { useEffect, useMemo, useState } from "react";
import { CardModal } from "./CardModal.jsx";
import { CardsStore } from "../store/CardsStore.js";

export const Cards = () => {

  const cards = CardsStore(
    (state) => state.cards
  );

  const getCards = CardsStore(
    (state) => state.getCards
  );

  const isLoading = CardsStore(
    (state) => state.isLoading
  );

  const [selectedCard, setSelectedCard] =
    useState(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("TODOS");

  /* =========================
     LOAD CARDS
  ========================= */

  useEffect(() => {
    getCards();
  }, [getCards]);

  /* =========================
     FILTERS
  ========================= */

  const filteredCards = useMemo(() => {

    return cards.filter((card) => {

      const matchesSearch =
        card.numero_tarjeta
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        card.id.toString().includes(search);

      const matchesStatus =
        statusFilter === "TODOS"
          ? true
          : card.estado === statusFilter;

      return matchesSearch && matchesStatus;

    });

  }, [cards, search, statusFilter]);

  /* =========================
     SYNC MODAL CARD
  ========================= */

  const updatedSelectedCard = selectedCard
    ? cards.find(
        (card) => card.id === selectedCard.id
      )
    : null;

  /* =========================
     MODAL
  ========================= */

  const openModal = (card) => {

    setSelectedCard(card);

    setIsModalOpen(true);

  };

  const closeModal = () => {

    setSelectedCard(null);

    setIsModalOpen(false);

  };

  /* =========================
     HELPERS
  ========================= */

  const getStatusStyles = (status) => {

    switch (status) {

      case "PENDIENTE":
        return "bg-yellow-100 text-yellow-700";

      case "APROBADA":
        return "bg-green-100 text-green-700";

      case "ACTIVA":
        return "bg-blue-100 text-blue-700";

      case "BLOQUEADA":
        return "bg-gray-200 text-gray-700";

      case "RECHAZADA":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };

  return (
    <div className="p-3 sm:p-4 md:p-6">

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
          mb-6
          sm:mb-8
        "
      >

        <div className="min-w-0">

          <h1
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-[#677750]
              break-words
            "
          >
            Gestión de Tarjetas
          </h1>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/70
              mt-1
            "
          >
            Administra las tarjetas bancarias
          </p>

        </div>

      </div>

      {/* FILTERS */}

      <div
        className="
          bg-white
          border border-[#677750]/10
          rounded-xl sm:rounded-2xl
          shadow-sm
          p-4
          sm:p-5
          mb-6
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

          {/* SEARCH */}

          <div className="min-w-0">

            <label
              className="
                block
                text-xs
                sm:text-sm
                text-[#677750]/60
                mb-1
              "
            >
              Buscar tarjeta
            </label>

            <input
              type="text"
              placeholder="Número o ID"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                border border-[#677750]/20
                rounded-lg
                px-3 py-2.5
                text-sm
                sm:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-[#677750]/30
              "
            />

          </div>

          {/* STATUS */}

          <div className="min-w-0">

            <label
              className="
                block
                text-xs
                sm:text-sm
                text-[#677750]/60
                mb-1
              "
            >
              Filtrar por estado
            </label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="
                w-full
                border border-[#677750]/20
                rounded-lg
                px-3 py-2.5
                text-sm
                sm:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-[#677750]/30
              "
            >

              <option value="TODOS">
                Todos
              </option>

              <option value="PENDIENTE">
                Pendiente
              </option>

              <option value="APROBADA">
                Aprobada
              </option>

              <option value="ACTIVA">
                Activa
              </option>

              <option value="BLOQUEADA">
                Bloqueada
              </option>

              <option value="RECHAZADA">
                Rechazada
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* MODAL */}

      <CardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        card={updatedSelectedCard}
      />

      {/* TABLE */}

      <div
        className="
          bg-white
          border border-[#677750]/10
          rounded-xl sm:rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >

        {/* TABLE HEADER */}

        <div
          className="
            p-4
            sm:p-5
            border-b
            border-[#677750]/10
          "
        >

          <h2
            className="
              text-base
              sm:text-lg
              font-semibold
              text-[#677750]
            "
          >
            Lista de tarjetas
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              text-[#677750]/60
              mt-1
            "
          >
            Tarjetas registradas en el sistema
          </p>

        </div>

        {/* MOBILE / TABLET */}

        <div className="block lg:hidden">

          {
            isLoading ? (

              <div
                className="
                  text-center
                  p-8
                  text-sm
                  text-[#677750]/60
                "
              >
                Cargando tarjetas...
              </div>

            ) : filteredCards.length > 0 ? (

              <div className="divide-y divide-[#677750]/10">

                {
                  filteredCards.map((card) => (

                    <div
                      key={card.id}
                      onClick={() => openModal(card)}
                      className="
                        p-4
                        space-y-4
                        cursor-pointer
                        hover:bg-[#fffaf2]/50
                        transition
                      "
                    >

                      {/* ID + ACCOUNT */}

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >

                        <span
                          className="
                            text-sm
                            font-semibold
                            text-[#677750]
                          "
                        >
                          #{card.id}
                        </span>

                        <span
                          className="
                            text-xs
                            text-[#677750]/60
                          "
                        >
                          Cuenta #{card.account_id}
                        </span>

                      </div>

                      {/* NUMBER */}

                      <div>

                        <p
                          className="
                            text-xs
                            text-[#677750]/50
                            mb-1
                          "
                        >
                          Número
                        </p>

                        <p
                          className="
                            text-sm
                            sm:text-base
                            font-medium
                            text-[#677750]
                            break-words
                          "
                        >
                          {card.numero_tarjeta}
                        </p>

                      </div>

                      {/* TYPE + STATUS */}

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >

                        <span
                          className="
                            text-sm
                            text-[#677750]/70
                          "
                        >
                          {card.tipo}
                        </span>

                        <span
                          className={`
                            px-2 py-1
                            rounded-full
                            text-xs
                            font-medium
                            ${getStatusStyles(card.estado)}
                          `}
                        >
                          {card.estado}
                        </span>

                      </div>

                      {/* EXPIRATION */}

                      <div>

                        <p
                          className="
                            text-xs
                            text-[#677750]/50
                            mb-1
                          "
                        >
                          Expiración
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#677750]/70
                          "
                        >
                          {card.fecha_expiracion}
                        </p>

                      </div>

                      {/* ACTION */}

                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          openModal(card);

                        }}
                        className="
                          w-full
                          sm:w-auto
                          px-4 py-2
                          rounded-lg
                          text-sm
                          bg-[#677750]
                          text-white
                          hover:opacity-90
                          transition
                        "
                      >
                        Gestionar
                      </button>

                    </div>

                  ))
                }

              </div>

            ) : (

              <div
                className="
                  text-center
                  p-8
                  text-sm
                  text-[#677750]/60
                "
              >
                No hay tarjetas disponibles
              </div>

            )
          }

        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden lg:block overflow-x-auto">

          <table
            className="
              w-full
              text-sm
              min-w-[1000px]
            "
          >

            <thead
              className="
                bg-[#677750]/5
                text-left
                text-[#677750]/70
                border-b
                border-[#677750]/10
              "
            >

              <tr>

                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                  Cuenta
                </th>

                <th className="p-4">
                  Número
                </th>

                <th className="p-4">
                  Tipo
                </th>

                <th className="p-4">
                  Expiración
                </th>

                <th className="p-4">
                  Estado
                </th>

                <th className="p-4 text-center">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody>

              {
                isLoading ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="
                        text-center
                        p-8
                        text-[#677750]/60
                      "
                    >
                      Cargando tarjetas...
                    </td>

                  </tr>

                ) : filteredCards.length > 0 ? (

                  filteredCards.map((card) => (

                    <tr
                      key={card.id}
                      onClick={() => openModal(card)}
                      className="
                        border-b
                        border-[#677750]/5
                        hover:bg-[#fffaf2]/50
                        transition
                        cursor-pointer
                      "
                    >

                      <td
                        className="
                          p-4
                          font-medium
                          text-[#677750]
                        "
                      >
                        #{card.id}
                      </td>

                      <td
                        className="
                          p-4
                          font-medium
                          text-[#677750]
                        "
                      >
                        #{card.account_id}
                      </td>

                      <td
                        className="
                          p-4
                          font-medium
                          text-[#677750]
                          break-words
                        "
                      >
                        {card.numero_tarjeta}
                      </td>

                      <td
                        className="
                          p-4
                          text-[#677750]/70
                        "
                      >
                        {card.tipo}
                      </td>

                      <td
                        className="
                          p-4
                          text-[#677750]/60
                        "
                      >
                        {card.fecha_expiracion}
                      </td>

                      <td className="p-4">

                        <span
                          className={`
                            px-2 py-1
                            rounded-full
                            text-xs
                            font-medium
                            ${getStatusStyles(card.estado)}
                          `}
                        >
                          {card.estado}
                        </span>

                      </td>

                      <td className="p-4 text-center">

                        <button
                          onClick={(e) => {

                            e.stopPropagation();

                            openModal(card);

                          }}
                          className="
                            px-3 py-1
                            rounded-lg
                            text-xs
                            bg-[#677750]
                            text-white
                            hover:opacity-90
                            transition
                          "
                        >
                          Gestionar
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="
                        text-center
                        p-8
                        text-[#677750]/60
                      "
                    >
                      No hay tarjetas disponibles
                    </td>

                  </tr>

                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};