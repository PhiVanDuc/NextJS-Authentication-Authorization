import { Home, Inbox } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter
} from "@/components/ui/sidebar";
import Link from "next/link";

import { permissionRules } from "@/routes/route";
import { cn } from "@/lib/utils";

const items = [
    {
        title: "Thống kê",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Nhật ký",
        url: "/admin/blog",
        icon: Inbox,
    },
];

export default function AdminNavbar({ userInfo }) {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="text-[24px] font-semibold text-blue-500 cursor-pointer w-full text-center p-[20px] py-[15px] hover:bg-neutral-200 rounded-[10px]">Logo</SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Ứng dụng</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem
                                    key={item.title}
                                    className={cn(
                                        "",
                                        permissionRules.find(perItem => perItem.path === item.url).permissions.includes(userInfo?.permission) ? "" : "hidden"
                                    )}
                                >
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="flex items-center gap-x-[10px] text-[14px] text-neutral-600">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-[20px]">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href="/" className="flex items-center gap-x-[10px] text-[14px] text-neutral-600">
                            <Home />
                            <span>Trở về trang chủ</span>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}