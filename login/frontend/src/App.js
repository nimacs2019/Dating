import "./App.css";
import { Routes, Route ,Navigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Login from "./Pages/Login/Login.jsx";
import Sign from "./Pages/SignUp/Sign.jsx";
import Home from "./Pages/Home/Home.jsx";

function App() {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            setUser(data.user.json);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/signup" element={user ? <Navigate to="/" /> : <Sign />} />
            </Routes>
        </div>
    );
}

export default App;
