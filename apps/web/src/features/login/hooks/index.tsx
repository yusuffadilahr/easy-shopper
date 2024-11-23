'use client'

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { instance } from "@/utils/axios.instance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ILoginBody {
    email: string
    password: string
}

export const useLoginHooks = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const router = useRouter()
    const { mutate: handleSubmitLogin, isPending } = useMutation({
        mutationFn: async ({ email, password }: ILoginBody) => {
            return await instance.post('/auth/login', {
                email, password
            })
        },
        onSuccess: (res) => {
            toast.success(res?.data?.message)
            // router.push('/login') * ganti ke dashboard
            console.log(res)
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message)
            console.log(err)
        }
    })

    const handleVisiblePassword = () => {
        setIsVisible(!isVisible)
        setTimeout(() => {
            setIsVisible(false)
        }, 5000)
    }

    return {
        handleSubmitLogin, isPending, handleVisiblePassword, isVisible, setIsVisible
    }
}