// import { Field } from "formik";
// import { ReactNode } from "react";

// interface InputRegisterProps {
//     labelname: string;
//     name: string;
//     id: string;
//     placeholder: string;
//     type: string;
//     htmlFor: string
//     children: ReactNode
// }

// export default function InputRegister({ labelname, name, id, placeholder, type, htmlFor, children }: InputRegisterProps) {
//     return (
//         <div className="w-full h-fit py-2">
//             <div className="md:flex w-full relative">
//                 <label htmlFor={htmlFor}>{labelname} <span className="text-red-500">*</span></label>
//                 {children}
//             </div>
//             <Field name={name} id={id} placeholder={placeholder} type={type} className='w-full mt-2 py-2 text-sm px-3 focus:outline-none border' />
//         </div>
//     );
// }