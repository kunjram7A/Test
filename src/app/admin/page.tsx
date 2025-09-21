import AdminPageClient from './client';

// This page is now a simple wrapper. The client component handles all auth logic.
export default function AdminPage() {
  return <AdminPageClient />;
}
