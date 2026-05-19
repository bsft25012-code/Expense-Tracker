import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function Dashboard() {

    const navigate = useNavigate();

    // GET USER FROM LOCAL STORAGE
    const userData = localStorage.getItem("user");

    const user = userData
        ? JSON.parse(userData)
        : null;

    // STATES
    const [transactions, setTransactions] = useState([]);

    const [title, setTitle] = useState("");

    const [amount, setAmount] = useState("");

    const [type, setType] = useState("expense");

    const [category, setCategory] = useState("");



    // FETCH TRANSACTIONS
    const fetchTransactions = async () => {

        try {

            const response = await axios.get(
                `https://expense-tracker-ukw9.onrender.com/api/transactions/${user?._id}`
            );

            setTransactions(response.data);

        } catch (error) {

            console.log(error);
        }
    };



    // LOAD DATA
    useEffect(() => {

        if (!user) {

            navigate("/");

            return;
        }

        fetchTransactions();

    }, []);



    // ADD TRANSACTION
    const handleAddTransaction = async (e) => {

        e.preventDefault();

        try {

            const newTransaction = {

                userId: user._id,

                title,

                amount,

                type,

                category,
            };

            await axios.post(
                "https://expense-tracker-ukw9.onrender.com/api/transactions/add",
                newTransaction
            );

            alert("Transaction Added");

            setTitle("");

            setAmount("");

            setCategory("");

            setType("expense");

            fetchTransactions();

        } catch (error) {

            console.log(error);
        }
    };



    // DELETE TRANSACTION
    const handleDelete = async (id) => {

        try {

            await axios.delete(
                `https://expense-tracker-ukw9.onrender.com/api/transactions/${id}`
            );

            fetchTransactions();

        } catch (error) {

            console.log(error);
        }
    };



    // LOGOUT
    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/");
    };



    // CALCULATIONS
    const income = transactions
        .filter((item) => item.type === "income")
        .reduce((acc, item) => acc + Number(item.amount), 0);

    const expense = transactions
        .filter((item) => item.type === "expense")
        .reduce((acc, item) => acc + Number(item.amount), 0);

    const balance = income - expense;



    // CHART DATA
    const data = {

        labels: ["Income", "Expense"],

        datasets: [
            {
                label: "Amount",

                data: [income, expense],

                backgroundColor: [
                    "green",
                    "red",
                ],

                borderWidth: 1,
            },
        ],
    };



    return (

        <div className="container mt-4">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center">

                <h2>
                    Welcome {user?.name}
                </h2>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            <hr />



            {/* BALANCE CARDS */}
            <div className="row text-center">

                <div className="col-md-4 mb-3">

                    <div className="card p-3 shadow">

                        <h4>Total Balance</h4>

                        <h3>Rs {balance}</h3>

                    </div>

                </div>



                <div className="col-md-4 mb-3">

                    <div className="card p-3 shadow">

                        <h4>Total Income</h4>

                        <h3 className="text-success">
                            Rs {income}
                        </h3>

                    </div>

                </div>



                <div className="col-md-4 mb-3">

                    <div className="card p-3 shadow">

                        <h4>Total Expense</h4>

                        <h3 className="text-danger">
                            Rs {expense}
                        </h3>

                    </div>

                </div>

            </div>



            {/* ADD TRANSACTION */}
            <div className="card p-4 shadow mt-4">

                <h3 className="mb-3">
                    Add Transaction
                </h3>

                <form onSubmit={handleAddTransaction}>

                    <div className="row">

                        <div className="col-md-3 mb-3">

                            <input
                                type="text"
                                placeholder="Title"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />

                        </div>



                        <div className="col-md-2 mb-3">

                            <input
                                type="number"
                                placeholder="Amount"
                                className="form-control"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />

                        </div>



                        <div className="col-md-3 mb-3">

                            <input
                                type="text"
                                placeholder="Category"
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />

                        </div>



                        <div className="col-md-2 mb-3">

                            <select
                                className="form-control"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >

                                <option value="income">
                                    Income
                                </option>

                                <option value="expense">
                                    Expense
                                </option>

                            </select>

                        </div>



                        <div className="col-md-2 mb-3">

                            <button className="btn btn-primary w-100">
                                Add
                            </button>

                        </div>

                    </div>

                </form>

            </div>



            {/* CHART */}
            <div className="card p-4 shadow mt-4">

                <h3 className="mb-3">
                    Expense Report
                </h3>

                <div style={{ width: "300px" }}>

                    <Pie data={data} />

                </div>

            </div>



            {/* TRANSACTION TABLE */}
            <div className="card p-4 shadow mt-4 mb-5">

                <h3 className="mb-3">
                    Transactions
                </h3>

                <table className="table">

                    <thead>

                        <tr>

                            <th>Title</th>

                            <th>Amount</th>

                            <th>Category</th>

                            <th>Type</th>

                            <th>Action</th>

                        </tr>

                    </thead>



                    <tbody>

                        {
                            transactions.map((item) => (

                                <tr key={item._id}>

                                    <td>{item.title}</td>

                                    <td>{item.amount}</td>

                                    <td>{item.category}</td>

                                    <td>

                                        <span
                                            className={
                                                item.type === "income"
                                                    ? "text-success"
                                                    : "text-danger"
                                            }
                                        >

                                            {item.type}

                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(item._id)}
                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Dashboard;