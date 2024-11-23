'use client'

import { instance } from "@/utils/axios.instance"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface IRegisterBody {
    name: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: string
}

export const useRegisterHooks = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const router = useRouter()
    const { mutate: handleRegisterSubmit, isPending } = useMutation({
        mutationFn: async ({ name, email, password, address, phoneNumber }: IRegisterBody) => {
            return await instance.post('/auth/register', {
                name, email, password, address, phoneNumber
            })
        },
        onSuccess: (res) => {
            toast.success(res?.data?.message)
            router.push('/login')
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
        isVisible, setIsVisible,
        handleRegisterSubmit, isPending,
        handleVisiblePassword
    }
}