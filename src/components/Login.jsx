import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { errorMsg, infoMsg, successMsg, warningMsg } from "../services/feedbackService";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetMyCardIds } from "../redux/UserState";
import { getUserCards } from "../services/cardServices";
import { handleLogin } from "./utilities/authService";

function Login() {
    let navit = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [justLoggedIn, setJustLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    //Page Permissions//
    useEffect(() => {
        if (user?.user && !justLoggedIn) {
            setIsLoading(false);
            if (user.user._id !== "") {
                warningMsg("You're Already Logged in :)");
                navit("/");
            }
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required().email().min(5, "Email must contain more than 5 characters"),
            password: yup.string().required().min(9, "Password must contain 9 - 20 characters.").max(20, "Password must contain less than 20 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=(.*\d){4,})(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{9,20}$/, "Must Contain: [1 uppercase letter, 1 lowercase letter, 4 digits, 1 or more special characters (!@#$%^&*-)")
        }),
        onSubmit: async (values) => {
            try {
                const token = await handleLogin(values, dispatch);
                if(token){
                    const userCards = await getUserCards(token);
                    const userCardIds = userCards.map((card) => card._id);
                    dispatch(SetMyCardIds(userCardIds));
                    successMsg(`Welcome Back!`);
                    setTimeout(() => infoMsg("Redirecting to Homepage :)"), 300);
                    setJustLoggedIn(true);
                    navit("/");
                    formik.resetForm();
                }
            } catch (error) {
                console.error(error);
                errorMsg(`${error}`);
            };
        },
    });

    return ( <div style={{width:"100%"}}>
        <h2>Login to your Account</h2>
        <div className="form-wrapper gridT1">
            <form onSubmit={formik.handleSubmit} className="card-form login gridT1" style={{padding:"2em 1em"}}>
                <h2>Login:</h2>
                <div className="info-box gridT1" style={{padding: "1.5em", gap:"1em"}}>

                <div className="input-box">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" autoComplete="on"
                placeholder="Enter Email" value={formik.values.email}onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                {formik.touched.email && formik.errors.email && (<p>{formik.errors.email}</p>)}
                </div>
                <div className="input-box">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" autoComplete="on"
                placeholder="Enter Password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                {formik.touched.password && formik.errors.password && (<p>{formik.errors.password}</p>)}
                </div>
                <button className="spanT1" type="submit" disabled={!formik.dirty || !formik.isValid}>Login</button>
                </div>
            </form>
            <p>Don't have an account yet? <br /> <NavLink to="/register">Register Here.</NavLink></p>
        </div> 
    
    </div>);
}
export default Login;