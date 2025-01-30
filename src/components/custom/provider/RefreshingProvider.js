"use client";

import { useContext, createContext, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const RefreshingContext = createContext({
    refresh: () => {},
    refreshing: false,
});

export default function RefreshingProvider({ children }) {
    const router = useRouter();
    const refreshing = useRef(false);

    const refresh = useCallback(async (message) => {
        if (refreshing.current) return;
    
        refreshing.current = true;
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log(message);
            router.refresh();
        } finally {
            refreshing.current = false;
        }
    }, [router]);

    return (
        <RefreshingContext.Provider value={{ refresh, refreshing: refreshing.current }}>
            {children}
        </RefreshingContext.Provider>
    );
}

export function useRefreshingContext() {
    return useContext(RefreshingContext);
}