"use server"

import { cookies } from "next/headers";
import { fetchPublic } from "../utils";
import { redirect } from "next/navigation";

export async function actionSignIn(data) {
    try {
        const cookieStorage = await cookies();
        const result = await fetchPublic.post(
            "/sign-in",
            { body: JSON.stringify(data) }
        );

        if (result?.success && result?.data?.accessToken) {
            cookieStorage.set({
                name: "accessToken",
                value: result?.data?.accessToken,
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            });

            cookieStorage.set({
                name: "refreshToken",
                value: result?.data?.refreshToken,
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            });
        }

        return result;
    }
    catch(error) {
        console.log(error);

        return {
            frontend: true,
            success: false,
            status: 500,
            message: error.message
        };
    }
}

export async function actionRefresh(data) {
    try {
        const cookieStorage = await cookies();
        const result = await fetchPublic.post(
            "/refresh",
            { body: JSON.stringify(data) }
        );

        if (result?.success && result?.data?.accessToken) {
            cookieStorage.set({
                name: "accessToken",
                value: result?.data?.accessToken,
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
            });

            cookieStorage.set({
                name: "refreshToken",
                value: result?.data?.refreshToken,
                path: "/",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
            });
        }
        else {
            cookieStorage.delete("accessToken");
            cookieStorage.delete("refreshToken");
        }
        
        return result;
    }
    catch(error) {
        console.log(error);

        return {
            frontend: true,
            success: false,
            status: 500,
            message: error.message
        };
    }
}

export async function actionSignOut() {
    const cookieStorage = await cookies();
    cookieStorage.delete("accessToken");
    cookieStorage.delete("refreshToken");

    redirect('/');
}