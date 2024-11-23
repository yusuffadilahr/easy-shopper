'use client'
import { ErrorMessage, Form, Formik } from "formik";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { registerValidation } from "@/features/register/schemas/registerSchemas";
import { useRegisterHooks } from "@/features/register/hooks";
import InputForm from "@/components/core/inputForm";

export default function Page() {
    const { isVisible, handleRegisterSubmit, isPending, handleVisiblePassword } = useRegisterHooks()

    return (
        <main className="lg:w-full h-[100svh] md:h-[100mvh] lg:h-[100lvh] bg-white flex justify-center items-center lg:px-20 px-5 lg:py-10 py-2">
            <section className="w-full h-full bg-red-600 lg:flex">
                <div className="w-full h-full bg-white border">
                    <div className="w-full h-full flex justify-center items-center">
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                password: '',
                                address: '',
                                phoneNumber: ''
                            }}
                            validationSchema={registerValidation}
                            onSubmit={(values: any) => {
                                handleRegisterSubmit({
                                    name: values?.name,
                                    email: values?.email,
                                    password: values?.password,
                                    address: values?.address,
                                    phoneNumber: values?.phoneNumber
                                })
                            }}
                        >
                            <Form className="w-full h-full flex flex-col justify-center items-center lg:px-10 px-2">
                                <InputForm htmlFor="name" name="name" type="name" labelname="F U L L N A M E " id="name" placeholder="Masukan Nama..." >
                                    <ErrorMessage className="absolute bg-white md:bg-none right-2 md:top-2 md:right-0 text-xs text-red-500 flex items-center" component='div' name="name" />
                                </InputForm>
                                <InputForm htmlFor="email" name="email" type="email" labelname="E M A I L " id="email" placeholder="Masukan Email..." >
                                    <ErrorMessage className="absolute bg-white md:bg-none right-2 md:top-2 md:right-0 text-xs text-red-500 flex items-center" component='div' name="email" />
                                </InputForm>
                                <div className="relative w-full flex">
                                    <InputForm htmlFor="password" name="password" type={`${isVisible ? 'text' : 'password'}`} labelname="P A S S W O R D " id="password" placeholder="Masukan Password..." >
                                        <ErrorMessage className="absolute bg-white md:bg-none right-2 md:top-2 md:right-0 text-xs text-red-500 flex items-center" component='div' name="password" />
                                    </InputForm>
                                    <span onClick={handleVisiblePassword}>
                                        {isVisible ?
                                            <FaEyeSlash className="cursor-pointer hover:text-neutral-700 lg:text-sm absolute text-neutral-800 top-[53px] right-4" />
                                            :
                                            <FaEye className="cursor-pointer hover:text-neutral-700 lg:text-sm absolute text-neutral-800 top-[53px] right-4" />
                                        }
                                    </span>
                                </div>
                                <InputForm htmlFor="address" name="address" type="address" labelname="A D D R E S S " id="address" placeholder="Masukan Alamat...">
                                    <ErrorMessage className="absolute bg-white md:bg-none right-2 md:top-2 md:right-0 text-xs text-red-500 flex items-center" component='div' name="address" />
                                </InputForm>
                                <InputForm htmlFor="phoneNumber" name="phoneNumber" type="phoneNumber" labelname="P H O N E N U M B E R " id="phoneNumber" placeholder="Masukan Nomor Telepon...">
                                    <ErrorMessage className="absolute bg-white md:bg-none right-2 md:top-2 md:right-0 text-xs text-red-500 flex items-center" component='div' name="phoneNumber" />
                                </InputForm>
                                <button disabled={isPending} className="disabled:bg-neutral-900 w-full py-2 text-sm mt-2 border bg-black text-white hover:bg-neutral-900" type="submit">S U B M I T</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <div className="w-full  h-full bg-red-950"></div>
            </section>
        </main>
    );
}