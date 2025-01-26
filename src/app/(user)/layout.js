import { cookies } from 'next/headers'
import UserNavbar from "@/components/custom/navbar/UserNavbar";
import { jwtDecode } from 'jwt-decode';
import { blurImage } from '@/lib/blurImage/blurImage';

export default async function UserLayout({ children }) {
    const cookieStore = await cookies();
    let userInfo;

    try {
        const accessToken = cookieStore.get("accessToken")?.value;
        userInfo = accessToken
            ?
            {
                ...jwtDecode(accessToken),
                ...(jwtDecode(accessToken)?.image && {
                    blurImage: await blurImage(jwtDecode(accessToken).image),
                }),
            }
            : null;
    }
    catch (err) { userInfo = null }

    return (
        <div className="space-y-[40px]">
            <UserNavbar userInfo={userInfo} />

            <div className="px-[20px] md:px-[80px]">
                {children}
            </div>
        </div>
    )
}