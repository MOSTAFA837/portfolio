"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { SkillColumn, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

interface Props {
  data: SkillColumn[];
}

export default function SkillsClient({ data }: Props) {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Skills (${data.length})`}
          description="Manage skills for your website"
        />
        <Button onClick={() => router.push(`/admin/skills/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Separator />
    </>
  );
}
