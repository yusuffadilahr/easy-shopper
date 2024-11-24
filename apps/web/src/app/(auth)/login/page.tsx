'use client'
import { ErrorMessage, Form, Formik } from "formik";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import InputForm from "../../../components/core/inputForm";
import { loginValidation } from "@/features/login/schemas";
import { useLoginHooks } from "@/features/login/hooks";

export default function Page() {
    const { handleSubmitLogin, isPending, handleVisiblePassword, isVisible } = useLoginHooks()

    return (
        <main className="lg:w-full h-[100svh] md:h-[100mvh] lg:h-[100lvh] bg-white flex justify-center items-center lg:px-20 px-5 lg:py-10 py-2">
            <section className="w-full h-full bg-red-600 lg:flex">
                {/* <div className="w-full h-full bg-red-950"></div> */}
                <div className="w-full h-full bg-white border">
                    <div className="w-full h-full flex justify-center items-center">
                        <Formik
                            initialValues={{
                                email: '', /* *template: bomude@polkaroad.net */
                                password: '', /* *template: @Tes123123 */
                            }}
                            validationSchema={loginValidation}
                            onSubmit={(values: any) => {
                                handleSubmitLogin({
                                    email: values?.email,
                                    password: values?.password
                                })
                                console.log(values)
                            }}
                        >
                            <Form className="w-full h-full flex flex-col justify-center items-center lg:px-10 px-2">
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
                                <button disabled={isPending} className="disabled:bg-neutral-900 w-full py-2 text-sm mt-2 border bg-black text-white hover:bg-neutral-900" type="submit">S U B M I T</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </section>
        </main>
    );
}