import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode'; 

import { publicRoute, permissionRules } from './routes/route';

export function middleware(req) {
    const { pathname } = req.nextUrl;
    let userInfo;
    let authentication = true;

    const accessToken = req.cookies.get('accessToken')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!accessToken || !refreshToken || (!accessToken && !refreshToken)) authentication = false;
    else {
        try { userInfo = jwtDecode(accessToken) }
        catch(err) { authentication = false }
    }

    const isPublicRoute = publicRoute.some((publicPath) => {
        return pathname === publicPath;
    });

    let res;
    if (!authentication) {
        if (!isPublicRoute) res = NextResponse.redirect(new URL('/', req.url));
        else res = NextResponse.next();

        if (accessToken) res.cookies.delete("accessToken");
        if (refreshToken) res.cookies.delete("refreshToken");
        return res;
    }

    const permissionRule = permissionRules.find(item => pathname.startsWith(item.path));
    if (permissionRule) {
        const check = permissionRule.permissions.includes(userInfo.permission);
        if (!check) return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};