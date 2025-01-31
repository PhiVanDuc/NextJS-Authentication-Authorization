// Giả lập tình huống nhiều Server Component fetch api mà ra lỗi 401
// import Test from "./Test";
// import Test2 from "./Test2";

import Data from "@/components/custom/page/homepage/Data";

export default function page() {
    return (
        <div className="w-full space-y-[20px]">
            <h2 className="text-[20px] font-semibold text-blue-500">Trang Chủ</h2>

            <p>Đây sẽ là trang chủ nơi người dùng nặc danh (Chưa đăng nhập) và người dùng đã đăng nhập (Người dùng bình thường hoặc admin) có thể truy cập được.</p>

            <p>Mục đích của dự án - Làm quan với các kiến thức cơ bản khi học NextJS</p>

            <Data />

            {/* Giả lập tình huống nhiều Server Component fetch api mà ra lỗi 401 */}
            {/* {
                Array.from({ length: 10 }, (_, index) => {
                    return <Test key={index + 'a'} message={`Test ${index + 1}`} />
                })
            }

            <Test2 message="Test 11" /> */}
        </div>
    )
}