import UserNavbar from "@/components/custom/navbar/UserNavbar";
import { getServerSession } from "@/utils/session";

export default async function UserLayout({ children }) {
    const userInfo = await getServerSession();
    
    return (
        <div className="space-y-[40px]">
            <UserNavbar userInfo={userInfo} />

            <div className="px-[20px] md:px-[80px]">
                {children}
            </div>
        </div>
    )
}