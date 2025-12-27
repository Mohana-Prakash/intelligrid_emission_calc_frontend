import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b p-4 flex gap-4">
        <Link to="/" className="font-medium">Calculator</Link>
        <Link to="/audit" className="font-medium">Audit</Link>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
