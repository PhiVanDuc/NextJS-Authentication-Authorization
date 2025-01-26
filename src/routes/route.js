export const publicRoute = ["/"];

export const permissionRules = [
    {
        path: "/admin/blog",
        permissions: ["admin-blog"]
    },
    {
        path: "/admin",
        permissions: ["admin", "admin-blog"]
    },
    {
        path: "/blog",
        permissions: ["none", "admin", "admin-blog"]
    },
    {
        path: "/",
        permissions: ["none", "admin", "admin-blog"]
    },
];