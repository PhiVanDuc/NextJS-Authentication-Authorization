"use client"

import { toast } from "sonner";

export default async function fetchClient(callback) {
    try {
        const result = await callback();    

        if (result?.success) toast.success(result.message);
        else toast.error(result.message);

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