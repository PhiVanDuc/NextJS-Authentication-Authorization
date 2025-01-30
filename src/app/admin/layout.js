import AdminNavbar from '@/components/custom/navbar/AdminNavbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getServerSession } from '@/utils/session';

export default async function AdminLayout({ children }) {
    const userInfo = await getServerSession();

    return (
        <SidebarProvider>
            <AdminNavbar userInfo={userInfo} />
            {children}
        </SidebarProvider>
    )
}
