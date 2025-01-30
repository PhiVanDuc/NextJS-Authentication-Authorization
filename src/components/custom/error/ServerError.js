"use client"

import { useEffect } from "react";
import { useRefreshingContext } from "../provider/RefreshingProvider";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServerError({ error }) {
    const [status, message] = error.split(" || ");
    const { refresh, refreshing } = useRefreshingContext();

    useEffect(() => {
        if ((+status === 401 || +status === 410) && !refreshing) {
            refresh(message);
        }
    }, []);

    return (
        <div className="space-y-[20px]">
            <Skeleton className="h-[35px] w-[250px] rounded-[10px] bg-slate-200" />

            <div className="grid grid-cols-3 gap-[10px]">
                <Skeleton className="h-[80px] w-full rounded-[10px] bg-slate-200" />
                <Skeleton className="h-[80px] w-full rounded-[10px] bg-slate-200" />
                <Skeleton className="h-[80px] w-full rounded-[10px] bg-slate-200" />
                <Skeleton className="h-[80px] w-full rounded-[10px] bg-slate-200" />
                <Skeleton className="h-[80px] w-full rounded-[10px] bg-slate-200" />
                <Skeleton className="h-[80px] w-full rounded-[10px] bg-slate-200" />
            </div>
        </div>
    )
}