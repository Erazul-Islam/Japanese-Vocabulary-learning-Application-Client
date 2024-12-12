import { Link, useNavigate, } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { useLoginMutation } from '../../redux/feature/auth/authApi';
import { FieldValues, useForm } from "react-hook-form"
// import "./Style.css"


import { Button, notification } from 'antd';
import { setUser, useCurrentToken } from '../../redux/feature/auth/auth.slice';
import { verifyToken } from '../../utils/verifyToken';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { register, handleSubmit } = useForm();
    const token = useAppSelector(useCurrentToken);
    let user;

    if (token) {
        user = verifyToken(token);
    }

    console.log(user)

    const [login] = useLoginMutation()

    const onSubmit = async (data: FieldValues) => {
        console.log(data)

        try {
            const userInfo = {
                email: data.email,
                password: data.password
            }
            const res = await login(userInfo).unwrap()
            console.log(res)
            dispatch(setUser({ user: res.data, token: res.token }))
            const decodedUser = verifyToken(res.token);
            notification.success({
                message: "Log in !!",
                description: "You successfully logged in",
            });
            if (decodedUser.role === "ADMIN") {
                navigate("/admin/dashboard/lesson-management")
            } else {
                navigate("/lessions");
            }

        } catch {
            notification.error({
                message: "Something went wrong",
                description: "Invalid password or email"
            })
        }

    }

    return (
        <div className="h-screen flex justify-center items-center transition-colors duration-200">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#001529] text-white p-10 rounded-lg shadow-lg w-96 h-auto space-y-8 transition-colors duration-200"
            >
                <h2 className="text-blue-800 dark:text-teal-200 text-3xl font-semibold text-center">Login</h2>

                <div className=" border border-blue-300  px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">🚀 Try it Out!</strong>
                    <span className="block sm:inline"> Use the demo credentials below:</span>
                    <div className="mt-2">
                        <strong>Email:</strong> <span className="">demo@gmail.com</span> <br />
                        <strong>Password:</strong> <span className="">123456</span>
                    </div>
                </div>
                <input
                    className="w-full px-5 py-3 bg-blue-100 dark:bg-teal-700 text-blue-800 dark:text-teal-100 placeholder-blue-400 dark:placeholder-teal-300 border border-blue-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-400 transition duration-200"
                    placeholder="Email"
                    type="email"
                    {...register('email', { required: true })}
                />

                <input
                    className="w-full px-5 py-3 bg-blue-100 dark:bg-teal-700 text-blue-800 dark:text-teal-100 placeholder-blue-400 dark:placeholder-teal-300 border border-blue-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-400 transition duration-200"
                    placeholder="Password"
                    type="password"
                    {...register('password', { required: true })}
                />

                <Button
                    htmlType="submit"
                    className="w-full py-3 mt-6 bg-blue-600 dark:bg-teal-600 text-white rounded-md hover:bg-blue-700 dark:hover:bg-teal-500 transition duration-200"
                >
                    Login
                </Button>

                <div className="text-center text-blue-600 dark:text-teal-200 mt-6">
                    Don’t have an account? <br />
                    <Link className="text-blue-500 dark:text-teal-300 hover:text-blue-400 dark:hover:text-teal-200 transition duration-200" to="/signup">
                        Create Account
                    </Link>
                </div>
            </form>
        </div>

    );
}

export default Login