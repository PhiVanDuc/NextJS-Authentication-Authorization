"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import FormSignIn from "../auth/FormSignIn";
import FormSignedIn from "../auth/FormSignedIn";

import { cn } from "@/lib/utils";
import { v4 } from "uuid";

const navItems = [
    {
        id: v4(),
        label: "Trang chủ",
        href: "/",
        pathname: "/home"
    },
    {
        id: v4(),
        label: "Nhật ký",
        href: "/blog",
        pathname: "/blog"
    },
    {
        id: v4(),
        label: "Quản trị",
        href: "/admin",
        pathname: "/admin"
    },
];

export default function UserNavbar({ userInfo }) {
    const pathname = usePathname();
    const finalPathname = pathname === "/" ? "/home" : pathname;

    return (
        <nav className="flex items-center justify-between px-[20px] md:px-[80px] py-[20px] shadow-sm">
            <h1 className="text-[24px] font-semibold text-blue-500">Logo</h1>

            <ul className="flex items-center gap-x-[40px]">
                {
                    navItems.map(navItem => {
                        return (
                            <li
                                key={navItem.id}
                            >
                                <Link
                                    href={navItem.href}
                                    className={cn(
                                        "text-[15px] font-medium transition duration-300",
                                        finalPathname.startsWith(navItem.pathname) ? "text-blue-500" : "text-neutral-500 hover:text-neutral-600"
                                    )}
                                >
                                    {navItem.label}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

            {
                !userInfo ?
                <FormSignIn /> :
                <FormSignedIn userInfo={userInfo} />
            }
        </nav>
    )
}