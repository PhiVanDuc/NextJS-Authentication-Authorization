import { actionSignOut } from "@/actions/auth";
import Image from "next/image";

export default function FormSignedIn({ userInfo }) {
    const handleClick = async () => {
        await actionSignOut();
    }

    return (
        <div className='flex items-center gap-x-[20px]'>
            <p
                className='text-[14px] font-medium text-red-400 cursor-pointer'
                onClick={handleClick}
            >
                Đăng xuất
            </p>

            {
                userInfo?.image ?
                <Image
                    alt="Avatar"
                    src={userInfo.image}
                    width={100}
                    height={100}
                    className="w-[50px] h-[50px] rounded-full object-cover object-center pointer-events-none"
                    {...userInfo?.blurImage}
                /> :
                <div className="w-[50px] h-[50px] rounded-full bg-slate-300"></div>
            }
        </div>
    )
}