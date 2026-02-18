import { Pagination, Spinner, Chip, Button } from "@nextui-org/react";
import { useState, useEffect, useCallback } from "react";
import { useSupabase } from "../hooks/useSupabase";
import { getFardos } from "../services/fardosService";
import Icon from "./common/Icon";

const PAGE_SIZE = 10;

const formatCost = (cost) =>
  Number(cost).toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const FardoRow = ({ fardo, isLast }) => (
  <div
    className={`flex flex-col sm:flex-row sm:items-center gap-3 py-4 px-5 hover:bg-default-50 transition-colors${
      !isLast ? " border-b border-default-100" : ""
    }`}
  >
    {/* Name + cost */}
    <div className="flex items-baseline justify-between gap-4 sm:flex-1 min-w-0">
      <p className="text-2xl font-bold text-foreground truncate leading-tight">
        {fardo.name}
      </p>
      <p className="text-sm font-medium text-default-500 shrink-0">
        ${formatCost(fardo.cost)}
      </p>
    </div>

    {/* Action buttons */}
    <div className="flex items-center gap-2 justify-end sm:shrink-0">
      <Button
        isIconOnly
        size="md"
        variant="flat"
        color="default"
        aria-label="Ver"
      >
        <Icon icon="fa-solid fa-eye" />
      </Button>
      <Button
        isIconOnly
        size="md"
        variant="flat"
        color="warning"
        aria-label="Editar"
      >
        <Icon icon="fa-solid fa-pen-to-square" />
      </Button>
      <Button
        isIconOnly
        size="md"
        variant="flat"
        color="danger"
        aria-label="Eliminar"
      >
        <Icon icon="fa-solid fa-trash" />
      </Button>
    </div>
  </div>
);

const FardosList = () => {
  const { getClient } = useSupabase();
  const [fardos, setFardos] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const loadPage = useCallback(
    async (targetPage) => {
      setIsLoading(true);
      setError(null);
      try {
        const supabase = getClient();
        const { data, count } = await getFardos(supabase, {
          page: targetPage,
          pageSize: PAGE_SIZE,
        });
        setFardos(data);
        setTotalCount(count ?? 0);
      } catch (err) {
        setError(err.message ?? "Error al cargar los fardos.");
      } finally {
        setIsLoading(false);
      }
    },
    [getClient]
  );

  useEffect(() => {
    loadPage(page);
  }, [page, loadPage]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Fardos</h2>
        {!isLoading && (
          <Chip size="sm" variant="flat" color="default">
            {totalCount} {totalCount === 1 ? "registro" : "registros"}
          </Chip>
        )}
      </div>

      {/* List */}
      <div className="rounded-xl border border-default-200 overflow-hidden">
        {isLoading && (
          <div className="flex justify-center items-center py-14">
            <Spinner color="primary" />
          </div>
        )}

        {!isLoading && error && (
          <div className="flex justify-center items-center py-14">
            <p className="text-danger text-sm">{error}</p>
          </div>
        )}

        {!isLoading && !error && fardos.length === 0 && (
          <div className="flex justify-center items-center py-14">
            <p className="text-default-400 text-sm">
              No hay fardos registrados.
            </p>
          </div>
        )}

        {!isLoading &&
          !error &&
          fardos.map((fardo, index) => (
            <FardoRow
              key={fardo.id}
              fardo={fardo}
              isLast={index === fardos.length - 1}
            />
          ))}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center py-2">
          <Pagination
            total={totalPages}
            page={page}
            onChange={setPage}
            color="primary"
            showControls
          />
        </div>
      )}
    </div>
  );
};

export default FardosList;
