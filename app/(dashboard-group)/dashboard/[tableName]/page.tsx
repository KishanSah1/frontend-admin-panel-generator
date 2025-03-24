"use client";
import TableView from "@/components/TableView";
import { usePathname } from "next/navigation";
export default function TablePage() {
  const pathName = usePathname();
  const tableName = pathName.split('/')[2];

  if (!tableName) return <div>Loading...</div>;

  return (
    <div>
      <TableView tableName={tableName} />
    </div>
  );
}
