import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function getServerSession() {
    try {
        const cookieStorage = await cookies();
        const accessToken = cookieStorage.get("accessToken")?.value;
        if (!accessToken) return null;

        const session = jwtDecode(accessToken);
    
        return session;
    }
    catch(error) {
        return null;
    }
}