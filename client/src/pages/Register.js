import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";


function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(

                "http://localhost:5000/api/auth/register",

                {
                    name,
                    email,
                    password,
                }
            );

            alert(response.data.message);

            navigate("/");

        } catch (error) {

            alert(
    error.response?.data?.message || "Registration Failed"
);
        }
    };


    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card p-4 shadow">

                        <h2 className="text-center mb-4">
                            Register
                        </h2>


                        <form onSubmit={handleRegister}>


                            <input
                                type="text"
                                placeholder="Enter Name"
                                className="form-control mb-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />


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


                            <button className="btn btn-success w-100">

                                Register

                            </button>

                        </form>


                        <p className="mt-3 text-center">

                            Already have account?

                            <Link to="/">

                                Login

                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;