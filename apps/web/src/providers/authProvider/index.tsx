'use client'
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

export default function AuthProviders({ children }: { children: ReactNode }) {
    const token = useSelector((state: any) => state.token.token)
    console.log(token)

    useEffect(() => {
        if (token) {
            console.log('ada token woy')
        }
    }, [token])
    return (
        <>
            {children}
        </>
    );
}