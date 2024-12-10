import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useSignupMutation } from '../../redux/feature/auth/authSignup';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

// _id: string;
//     name: string,
//     email: string,
//     password: string,
//     photo : string

const Signup = () => {

    const navigate = useNavigate()
    const [signup] = useSignupMutation()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<FieldValues>()

    const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
        console.log(data)

        try {
            const userInfo = {
                email: data.email,
                password: data.password,
                name: data.name,
                photo: data.photo,
                role: 'USER',
            }
            console.log(userInfo)
            const res = await signup(userInfo).unwrap()
            console.log(res.data)


            Swal.fire({
                title: "Good job!",
                text: "Sign up Successfully",
                icon: "success"
            });

            navigate('/login')
        } catch {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }

    }

    return (
        <div>
            <div className="h-screen flex items-center justify-center transition-colors duration-200">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-10 rounded-lg shadow-lg w-96 space-y-6 transition-colors duration-200"
                >
                    <h2 className="text-blue-800 dark:text-teal-200 text-3xl font-semibold text-center">Sign Up</h2>

                    <input
                        className="w-full px-4 py-3 bg-blue-100 dark:bg-teal-700 text-blue-800 dark:text-teal-100 placeholder-blue-400 dark:placeholder-teal-300 border border-blue-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-400 transition duration-200"
                        placeholder="Email"
                        type="email"
                        {...register('email', { required: true })}
                    />

                    <input
                        className="w-full px-4 py-3 bg-blue-100 dark:bg-teal-700 text-blue-800 dark:text-teal-100 placeholder-blue-400 dark:placeholder-teal-300 border border-blue-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-400 transition duration-200"
                        placeholder="Name"
                        type="text"
                        {...register('name', { required: true })}
                    />

                    <input
                        className="w-full px-4 py-3 bg-blue-100 dark:bg-teal-700 text-blue-800 dark:text-teal-100 placeholder-blue-400 dark:placeholder-teal-300 border border-blue-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-400 transition duration-200"
                        placeholder="Password"
                        type="password"
                        {...register('password', { required: true })}
                    />

                    <input
                        className="w-full px-4 py-3 bg-blue-100 dark:bg-teal-700 text-blue-800 dark:text-teal-100 placeholder-blue-400 dark:placeholder-teal-300 border border-blue-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-teal-400 transition duration-200"
                        placeholder="photo"
                        type="text"
                        {...register('photo', { required: true })}
                    />

                    <Button
                        type="link"
                        color="primary"
                        disabled={isSubmitting}
                        className="w-full py-3 mt-4 bg-blue-600 dark:bg-teal-600 text-white rounded-md hover:bg-blue-700 dark:hover:bg-teal-500 transition duration-200"
                    >
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </Button>

                    <div className="text-center text-blue-600 dark:text-teal-200 mt-6">
                        Already have an account? <br />
                        <Link className="text-blue-500 dark:text-teal-300 hover:text-blue-400 dark:hover:text-teal-200 transition duration-200" to="/login">
                            Login Now
                        </Link>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Signup;