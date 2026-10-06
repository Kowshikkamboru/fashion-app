import Navigation from "@/components/Navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Navigation />
      <div style={{ paddingTop: '96px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </ProtectedRoute>
  );
}
