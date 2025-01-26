import AdminNavbar from '@/components/custom/navbar/AdminNavbar';
import { SidebarProvider } from '@/components/ui/sidebar';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

export default async function AdminLayout({ children }) {
    const cookieStore = await cookies();
    let userInfo;

    try {
        const accessToken = cookieStore.get("accessToken")?.value;
        userInfo = accessToken
            ?
            { ...jwtDecode(accessToken) }
            : null;
    }
    catch (err) { userInfo = null }

    return (
        <SidebarProvider>
            <AdminNavbar userInfo={userInfo} />
            {children}
        </SidebarProvider>
    )
}
