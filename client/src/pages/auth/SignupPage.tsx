import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../../schema/signupSchema";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../store/actions/userActions";
import { AppDispatch, RootState } from "../../store/store";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";

interface IinitialState {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   confirmPassword: string;
   role: string;
}

const SignupPage: FC = () => {
   const initialState: IinitialState = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
   };

   const isLoading = useSelector((state: RootState) => state?.user?.user?.loading);
   const error = useSelector((state: RootState) => state?.user?.user?.error);
   const dispatch = useDispatch<AppDispatch>();
   const navigate=useNavigate()
   const handleSubmit = (values: IinitialState) => {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);
      dispatch(userSignup(formData))
         .unwrap()
         .then((res: any) => {
            navigate('/')
         })
         .catch((err: any) => {
            toast.error(err);
         });
   };

   return (
      <div className="flex flex-col items-center justify-center   mx-auto md:h-screen lg:py-0 ">
         <div className=" w-[600px] mt-20">
            <h1 className="font-bold text-blue-500 text-2xl">Signup</h1>
         </div>
         <div className="w-[600px] h-auto pb-3 mt-2  border-2 border-blue-500 rounded-lg">
            <div className="mt-5">
               <Formik initialValues={initialState} onSubmit={handleSubmit} validationSchema={signupSchema}>
                  <Form>
                     <div className="flex flex-col p-5">
                        <Field name="firstName" placeholder="First Name" className="border border-gray-500 h-10 pl-2" />

                        <ErrorMessage name="firstName" className="text-red-500 h-5" component={"div"} />

                        <Field name="lastName" placeholder="Last Name" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="lastName" className="text-red-500 h-5" component={"div"} />

                        <Field name="email" placeholder="Email" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="email" className="text-red-500 h-5" component={"div"} />

                        <Field name="password" type="password" placeholder="Password" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="password" className="text-red-500 h-5" component={"div"} />

                        <Field
                           name="confirmPassword"
                           type="password"
                           placeholder="Confirm Password"
                           className="border border-gray-500 h-10 pl-2 mt-5"
                        />
                        <ErrorMessage name="confirmPassword" className="text-red-500 h-5" component={"div"} />
                        <div className="mt-5">
                           <label className="block text-lg font-semibold mb-3">Select Role:</label>
                           <div className="flex gap-5 items-center">
                              <label className="flex items-center cursor-pointer">
                                 <Field
                                    type="radio"
                                    name="role"
                                    value="employee"
                                    className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                 />
                                 <span className="ml-2 text-gray-700 hover:text-blue-500">Employee</span>
                              </label>
                              <label className="flex items-center cursor-pointer">
                                 <Field
                                    type="radio"
                                    name="role"
                                    value="manager"
                                    className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                                 />
                                 <span className="ml-2 text-gray-700 hover:text-blue-500">Manager</span>
                              </label>
                           </div>
                           <ErrorMessage name="role" className="text-red-500 mt-2" component="div" />
                        </div>
                     </div>

                     <div className="p-5 pt-0">
                        {isLoading ? (
                           <Loading width={"w-full"} />
                        ) : (
                           <button type="submit" className="bg-blue-500 w-full h-10 text-white">
                              Signup
                           </button>
                        )}
                     </div>

                     <div className="flex gap-2 justify-center">
                        <p>Already have an account?</p>
                        <Link to={"/login"} className="text-blue-400">
                           Login
                        </Link>
                     </div>
                  </Form>
               </Formik>
            </div>
         </div>
      </div>
   );
};

export default SignupPage;
