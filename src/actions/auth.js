"use server";

import fetchPublic from "@/lib/fetch/public";
import { cookies } from 'next/headers';

export const actionSignIn = async (data) => {
    const cookieStore = await cookies();
    const result = await fetchPublic.post(
        "/login",
        data,
    );

    if (result?.data) {
        cookieStore.set({
            name: "accessToken",
            value: result?.data?.accessToken,
            httpOnly: false,
            path: "/",
            maxAge: 8 * 24 * 60 * 60, // 8 ngày
        });

        cookieStore.set({
            name: "refreshToken",
            value: result?.data?.refreshToken,
            httpOnly: true,
            path: "/",
            maxAge: 8 * 24 * 60 * 60, // 8 ngày
        });
    }

    return {
        response: result?.response?.data,
        status: result?.status,
        data: result?.data,
    };
}

export const actionSignOut = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
}