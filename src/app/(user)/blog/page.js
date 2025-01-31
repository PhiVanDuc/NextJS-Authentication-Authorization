import Data from "@/components/custom/page/blog/Data";

export default function page() {
    return (
        <div className="w-full space-y-[20px]">
            <h2 className="text-[20px] font-semibold text-blue-500">Nhật ký</h2>

            <p>Đây sẽ là trang nhật ký nơi người dùng đã đăng nhập (Người dùng bình thường hoặc admin) có thể truy cập được.</p>

            <p>Những người dùng chưa đăng nhập sẽ không thể truy cập được trang này.</p>

            <Data url="/blogs" />
            <Data url="/blogs2" />
            <Data url="/blogs3" />
            <Data url="/blogs4" />
            <Data url="/blogs5" />
        </div>
    )
}