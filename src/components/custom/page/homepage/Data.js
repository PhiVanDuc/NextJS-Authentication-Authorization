import { fetchPublic } from "@/actions/utils"

export default async function Data() {
    const blogs = await fetchPublic.get('/blogs-public', { cache: "no-cache" });

    return (
        <div className="space-y-[20px]">
            <h2 className="text-[20px] font-semibold text-blue-500">Dữ liệu public</h2>
            
            <div className="grid grid-cols-3 gap-[10px]">
                {
                    blogs?.data?.posts?.map((post) => {
                        return (
                            <p
                                key={post.title + '1'}
                                className="p-[20px] rounded-[10px] bg-slate-100 hover:bg-slate-200 transition duration-300 cursor-pointer">{post?.title}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}