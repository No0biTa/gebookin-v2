import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./register.css";
import logo from "../../assets/Logo GeBookIn .png";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        country: "",
        city: "",
        phone: "",
        img:""
    });
    const [file, setFile] = useState(null);
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER_START" });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "upload"); // Replace with your Cloudinary upload preset
        formData.append("cloud_name", "gebookin"); // Replace with your Cloudinary cloud name

        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/gebookin/image/upload", // Replace with your Cloudinary API endpoint
                formData
            );

            const { url } = uploadRes.data;
            const res = await axios.post("/auth/register", {
                ...credentials,
                profilePicture: url,
            });

            dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
            navigate("/");
        } catch (err) {
            dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
            setTimeout(() => {
                dispatch({ type: "CLEAR_ERROR" });
            }, 5000);
        }
    };

    return (
        <div className="register">
            <div className="lContainer">
                <div className="logoContainer">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <form onSubmit={handleRegister} className="formContainer">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder="Country"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="City"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <input
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder="Phone"
                        onChange={handleChange}
                        className="lInput"
                    />
                    <div className="formInput">
                        <label htmlFor="file">
                            Profile Picture:
                            <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                    </div>
                    {file && (
                        <div className="image-preview">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="preview-img"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        onClick={handleRegister}
                        className="lButton"
                    >
                        Register
                    </button>
                    {error && (
                        <div className="errorContainer">
                            <span className="error">{error.message}</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;
