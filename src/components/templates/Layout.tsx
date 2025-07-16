import { Outlet } from 'react-router-dom';
import Navbar from '@/components/organisms/Navbar';
import Footbar from '@/components/organisms/Footbar';
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footbar />
    </div>
  );
}
