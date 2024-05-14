import { useState } from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export const Auth = () => {

    return (
        <div className="auth">
        <Login />
        <Register />
        </div>
    )

}


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault(); 
        setLoading(true);
        setError("");
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });

            console.log("Login response data:", response.data);

            setCookies("access_token", response.data.token); // Set path if needed
            setCookies("UserID", response.data.userID)
            window.localStorage.setItem("UserID", response.data.userID);
            navigate("/"); // Navigate to home page after successful login
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to login. Please check your username and password.");
            setLoading(false);
        }
    }

    return (
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={onSubmit}
            loading={loading}
            error={error}
        />
    );
}


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            await axios.post("http://localhost:3001/auth/register", { username, password });
            alert("Registration Completed! Please Login!");
        } catch (err) {
            console.error(err);
            setError("Failed to register. Please try again.");
        }
        setLoading(false);
    }

    return (
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Register"
            onSubmit={onSubmit}
            loading={loading}
            error={error}
        />
    )
}

const Form = ({
    username, 
    setUsername, 
    password, 
    setPassword, 
    label, 
    onSubmit,
    loading,
    error
}) => {
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Loading...' : label}</button>
            </form>
        </div>
    )
}