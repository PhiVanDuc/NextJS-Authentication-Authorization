import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { verifyJwt } from './utils/jwt'; 

import { publicRoute, permissionRules } from './routes/route';
import { actionRefresh } from './actions/serverAction/auth';

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    let userInfo, authentication = true;
    let res = NextResponse.next();

    // Xác thực
    const accessToken = req.cookies.get('accessToken')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!accessToken || !refreshToken || (!accessToken && !refreshToken)) authentication = false;
    else {
        const infoAccess = await verifyJwt(accessToken);
        userInfo = jwtDecode(accessToken);

        if (!infoAccess?.valid && infoAccess?.error === 'TokenExpired') {
            delete userInfo["iat"];
            delete userInfo["exp"];

            const refresh = await actionRefresh({
                payload: userInfo,
                time: '10s',
                refreshToken
            });
            authentication = refresh?.success;
        }
        else if (!infoAccess?.valid) authentication = false;
    }

    const isPublicRoute = publicRoute.some((publicPath) => {
        return pathname === publicPath;
    });

    if (!authentication) {
        if (!isPublicRoute) res = NextResponse.redirect(new URL('/', req.url));
        else res = NextResponse.next();

        if (accessToken) res.cookies.delete("accessToken");
        if (refreshToken) res.cookies.delete("refreshToken");
        return res;
    }

    // Phân quyền
    const permissionRule = permissionRules.find(item => pathname.startsWith(item.path));
    if (permissionRule) {
        const check = permissionRule.permissions.includes(userInfo.permission);
        if (!check) return NextResponse.redirect(new URL('/', req.url));
    }

    // Thành công
    return res;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};