import { useState } from "react";
import { jwtDecode } from "jwt-decode"; 
import { useFormik } from "formik";
import * as yup from "yup";
import { errorMsg, infoMsg, successMsg } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetMyCardIds, SetToken, SetUser } from "../redux/UserState";
import { login } from "../services/userServices";
import { getUserCards } from "../services/cardServices";


function Login() {
    let navit = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    let [payload, setPayload] = useState({});

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required().email().min(5, "Email must contain more than 5 characters"),
            password: yup.string().required().min(8, "Password must contain 9 - 20 characters.").max(20, "Password must contain less than 20 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{8,}$/, "Must Contain: [1 uppercase letter, 1 lowercase letter, 1 or more special characters (!@#$%^&*-)")
        }),
        onSubmit: async (vals, { resetForm }) => {
            console.log(vals);

            try {
                // Use the login function from userService
                const { data: token } = await login({
                    email: vals.email,
                    password: vals.password,
                });

                // Decode the token
                const decodedToken = jwtDecode(token);
                setPayload(decodedToken);

                // Save token and update state
                sessionStorage.setItem("x-auth-token", token);
                dispatch(SetToken(token));
                dispatch(SetUser(decodedToken));

                // Step 2: Fetch user cards and save IDs
                const userCards = await getUserCards(token); // Fetch user's cards
                const userCardIds = userCards.map((card) => card._id); // Extract IDs
                dispatch(SetMyCardIds(userCardIds));

                // Show success messages and navigate
                successMsg(`Welcome Back!`);
                setTimeout(() => infoMsg("Redirecting to Homepage :)"), 1000);
                setTimeout(() => navit("/"), 2000);
                resetForm();
            } catch (error) {
                console.error(error);
                errorMsg("Login Failed..Try Again :)");
            }
        },
    });

    return ( <div style={{padding: "1em", gap: "1em"}}>
        {user._id !== "" && (<>
        <h3>id: {payload._id}</h3>
        <h3>isAdmin: {payload.isAdmin==true? 25 : 50}</h3>
        <h3>isBusiness: {payload.isBusiness==true? 25 : 50}</h3>
        </>)}

        <h2>Login 2:</h2>
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "Column", gap: "20px" }}>

            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email"
            placeholder="Enter Email" value={formik.vaemail}onBlur={formik.handleBlur} onChange={formik.handleChange}/>
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