"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import Image from "next/image";

export type SkillColumn = {
  id: string;
  name: string;
  imageUrl: string;
};

export const columns: ColumnDef<SkillColumn>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          title={row.getValue("name")}
          width={40}
          height={40}
          src={row.getValue("imageUrl")}
          alt={row.getValue("name")}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
