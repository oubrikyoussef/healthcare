"use client";

import { Button } from "@/components/ui/button";
import { DeletePharmacieDialog } from "@/components/ui/pharmacies/DeletePharmacieDialog";
import { UpdatePharmacieDialog } from "@/components/ui/pharmacies/UpdatePharmacieDialog";
import { Pharmacie, PharmacieStatus } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaLocationArrow, FaTimesCircle } from "react-icons/fa";

export const pharmaciesColumns: ColumnDef<Pharmacie>[] = [
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full justify-start mr-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <p className="text-14-medium">{row.original.nom}</p>,
  },
  {
    accessorKey: "adresse",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Adresse
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <p className="text-14-medium">{row.original.adresse}</p>,
  },
  {
    accessorKey: "responsable",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Responsable
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.responsable}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex items-center">
          {status === PharmacieStatus.Active ? (
            <FaCheckCircle className="text-green-500 mr-2" />
          ) : (
            <FaTimesCircle className="text-red-500 mr-2" />
          )}
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();
      const id = row.original.id;
      return (
        <div className="flex gap-7">
          <UpdatePharmacieDialog pharmacie={row.original} />
          <DeletePharmacieDialog id={row.original.id} />
          <FaLocationArrow
            className="text-gray-500 cursor-pointer"
            title="Localiser"
            onClick={() => {
              router.push(`/admin/pharmacies/${id}`);
            }}
          />
        </div>
      );
    },
  },
];
