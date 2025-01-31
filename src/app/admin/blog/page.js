import Data from "@/components/custom/page/blog/Data";

export default function page() {
    return (
        <div className="p-[20px] w-full space-y-[20px]">
            <h2 className="text-[20px] font-semibold text-blue-500">Quản lý nhật ký</h2>

            <p>Đây sẽ là trang nhật ký nơi quản trị viên có vai trò là quản lý nhật ký có thể truy cập được.</p>

            <p>Nhưng người dùng thông thường hoặc quản trị viên không có vai trò quản lý nhật ký sẽ không thể vào được trang.</p>

            <Data url="/blogs" />
        </div>
    )
}