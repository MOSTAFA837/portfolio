import Navbar from "@/components/ui/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="w-[90%] m-auto">{children}</div>
    </>
  );
}
