import { cookies } from "next/headers";

const BASE_URL_API = process.env.BASE_URL_API;

export const fetchPublic = {
    get: async (pathname, options = {}) => {
        try {
            options.headers = {
                "Content-Type": "application/json",
                ...options?.headers
            }
            
            const response = await fetch(
                `${BASE_URL_API}${pathname}`,
                {
                    method: "GET",
                    ...options
                }
            );

            return await response.json();
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
    },

    post: async (pathname, options = {}) => {
        try {
            options.headers = {
                "Content-Type": "application/json",
                ...options?.headers
            }
            
            const response = await fetch(
                `${BASE_URL_API}${pathname}`,
                {
                    method: "POST",
                    ...options
                }
            );

            return await response.json();
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
}

export const fetchProtect = {
    get: async (pathname, options = {}) => {
        try {
            const cookieStorage = await cookies();

            options.headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookieStorage.get("accessToken")?.value}`,
                ...options?.headers
            }
            
            const response = await fetch(
                `${BASE_URL_API}${pathname}`,
                {
                    method: "GET",
                    ...options
                }
            );

            const result = await response.json();
            
            return {
                ...result,
                status: response.status
            }
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
}