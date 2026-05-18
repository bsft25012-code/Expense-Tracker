import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(

                "https://expense-tracker-ukw9.onrender.com/api/auth/login",

                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert(response.data.message);

            navigate("/dashboard");

        } catch (error) {

            alert(
    error.response?.data?.message || "Login Failed"
);
        }
    };


    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card p-4 shadow">

                        <h2 className="text-center mb-4">
                            Login
                        </h2>


                        <form onSubmit={handleLogin}>


                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control mb-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />


                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="form-control mb-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />


                            <button className="btn btn-primary w-100">

                                Login

                            </button>

                        </form>


                        <p className="mt-3 text-center">

                            Don't have account?

                            <Link to="/register">

                                Register

                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;