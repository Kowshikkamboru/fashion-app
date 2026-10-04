import Navigation from "@/components/Navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </>
  );
}
