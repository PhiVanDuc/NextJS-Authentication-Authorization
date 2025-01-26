"use client"

import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
  } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import { actionSignIn } from "@/actions/auth";
import { toast } from "sonner";

export default function FormSignIn() {
    const form = useForm({
        defaultValues: {
            permission: "none"
        }
    });

    const handleSubmit = async (values) => {
        const result = await actionSignIn(
            {
                payload: {
                    fullname: "Phí Văn Đức",
                    image: "https://images.unsplash.com/photo-1737559217439-a5703e9b65cb?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    ...values,
                },
                time: "10s",
            }
        );

        if (result?.response) {
            toast.error(result?.response?.message);
        }
    };   
    
    return (
        <Dialog>
            <DialogTrigger className="bg-blue-500 hover:bg-blue-400 text-[14px] font-medium px-[25px] py-[10px] rounded-[10px] text-white">
                Đăng nhập
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Đăng nhập</DialogTitle>
                    <DialogDescription>Chào mừng đến với trang web của chúng tôi. Hãy đăng nhập để trải nhiệm toàn bộ chức năng của trang web.</DialogDescription>
                </DialogHeader>

                <div className="pt-[20px]">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="space-y-[20px]"
                        >
                            <FormField
                                control={form.control}
                                name="permission"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Chọn quyền quản trị.</FormLabel>

                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex items-center gap-x-[20px]"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="none" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-[14px]">
                                                            Không có quyền
                                                        </FormLabel>
                                                    </FormItem>

                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="admin" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-[14px]">
                                                            Quản lý cơ bản
                                                        </FormLabel>
                                                    </FormItem>

                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="admin-blog" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-[14px]">
                                                            Quản lý nhật ký
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )
                                }}
                            />

                            <div className="flex justify-center">
                                <Button className="w-[200px] bg-blue-500 hover:bg-blue-400">Đăng nhập</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}