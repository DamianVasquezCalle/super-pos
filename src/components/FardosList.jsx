import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Chip,
} from "@nextui-org/react";
import { useState, useEffect, useCallback } from "react";
import { useSupabase } from "../hooks/useSupabase";
import { getFardos } from "../services/fardosService";

const PAGE_SIZE = 10;

const formatCost = (cost) =>
  Number(cost).toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

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
        const supabase = await getClient();
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Fardos</h2>
        {!isLoading && (
          <Chip size="sm" variant="flat" color="default">
            {totalCount} {totalCount === 1 ? "registro" : "registros"}
          </Chip>
        )}
      </div>

      <Table
        aria-label="Lista de fardos"
        isStriped
        removeWrapper
        classNames={{
          base: "overflow-x-auto",
          th: "bg-primary text-white",
        }}
        bottomContent={
          totalPages > 1 ? (
            <div className="flex justify-center py-2">
              <Pagination
                total={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showControls
                isDisabled={isLoading}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Costo</TableColumn>
          <TableColumn className="hidden sm:table-cell">Fecha</TableColumn>
        </TableHeader>

        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner color="primary" />}
          emptyContent={
            error ? (
              <p className="text-danger text-sm">{error}</p>
            ) : (
              <p className="text-default-400 text-sm">
                No hay fardos registrados.
              </p>
            )
          }
          items={fardos}
        >
          {(fardo) => (
            <TableRow key={fardo.id}>
              <TableCell className="font-medium">{fardo.name}</TableCell>
              <TableCell>${formatCost(fardo.cost)}</TableCell>
              <TableCell className="hidden sm:table-cell text-default-500">
                {formatDate(fardo.created_at)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FardosList;
