import { actionSignOut } from "@/actions/serverAction/auth";
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

            <Image
                src={userInfo?.image}
                alt="Avatar"
                width={500}
                height={500}
                className="w-[50px] h-[50px] rounded-full bg-slate-100 object-cover object-center"
            />
        </div>
    )
}