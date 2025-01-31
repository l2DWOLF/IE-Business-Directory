import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { errorMsg, infoMsg, successMsg, warningMsg } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetMyCardIds } from "../redux/UserState";
import { getUserCards } from "../services/cardServices";
import { handleLogin } from "./utilities/authService";

function Login() {
    let navit = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    let [payload, setPayload] = useState({});
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
            password: yup.string().required().min(9, "Password must contain 9 - 20 characters.").max(20, "Password must contain less than 20 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{8,}$/, "Must Contain: [1 uppercase letter, 1 lowercase letter, 1 or more special characters (!@#$%^&*-)")
        }),
        onSubmit: async (values) => {
            try {
                const token = await handleLogin(values, dispatch);
                const userCards = await getUserCards(token);
                const userCardIds = userCards.map((card) => card._id);
                dispatch(SetMyCardIds(userCardIds));
                successMsg(`Welcome Back!`);
                setTimeout(() => infoMsg("Redirecting to Homepage :)"), 1000);
                setJustLoggedIn(true);
                navit("/");
                formik.resetForm();
            } catch (error) {
                console.error(error);
                errorMsg("Login Failed..Try Again :)");
            }
        },
    });

    return ( <div style={{padding: "1em", gap: "1em"}}>

        <h2>Login:</h2>
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "Column", gap: "20px" }}>

            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email"
            placeholder="Enter Email" value={formik.values.email}onBlur={formik.handleBlur} onChange={formik.handleChange}/>
            {formik.touched.email && formik.errors.email && (<p>{formik.errors.email}</p>)}

            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password"
            placeholder="Enter Password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
            {formik.touched.password && formik.errors.password && (<p>{formik.errors.password}</p>)}

            <button type="submit" disabled={!formik.dirty || !formik.isValid}>Login</button>
        </form>
    </div> );
}
export default Login;