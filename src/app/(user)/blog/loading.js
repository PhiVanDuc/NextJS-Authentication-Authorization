import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-full space-y-[20px]">
            <Skeleton className="max-w-[250px] w-full h-[35px] rounded-[10px] bg-slate-200" />
            <Skeleton className="w-full h-[100px] rounded-[10px] bg-slate-200" />

            <div className="space-y-[20px]">
                <Skeleton className="h-[35px] w-[250px] rounded-[10px] bg-slate-200" />
                
                <div className="grid grid-cols-3 gap-[10px]">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton 
                            key={i}
                            className="h-[80px] w-full rounded-[10px] bg-slate-200" 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}