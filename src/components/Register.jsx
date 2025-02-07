import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { infoMsg, successMsg, warningMsg } from "../services/feedbackService";
import { addUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "./utilities/authService";
import { useDispatch, useSelector } from "react-redux";
import { siteTheme } from "../App";

function Register() {
    const theme = useContext(siteTheme);
    const dispatch = useDispatch();
    let navit = useNavigate();
    const user = useSelector((state) => state.user);
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
            name: { first: "", middle: "", last: "" },
            phone: "",
            email: "",
            password: "",
            image: { url: "", alt: "" },
            address: { state: "", country: "", city: "", street: "", houseNumber: "", zip: "" },
            isBusiness: false, 
            isAdmin: false
        },
        validationSchema: yup.object().shape({
            name: yup.object().shape({
                first: yup.string().required("First Name is Required.").min(2,"Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
                middle: yup.string().min(2,"Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
                last: yup.string().required("Last Name is Required.").min(2,"Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
            }),
            phone: yup.string().required("Phone is Required.").min(9, "Must contain 9 or more digits.").max(11, "Must contain less than 11 characters.").matches(/^0[0-9]{1}-?[0-9]{8}$/, "Must begin with 0 and contain only numbers."),
            email: yup.string().required("Email is Required.").email().min(5, "Must contain 5 or more characters.").max(125, "Must contain less than 125 characters."),
            password: yup.string().required().min(9, "Password must contain 9 - 20 characters.").max(20, "Password must contain less than 20 characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=(.*\d){4,})(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{9,20}$/, "Must Contain: [1 uppercase letter, 1 lowercase letter, 4 digits, 1 or more special characters (!@#$%^&*-)"),
            image: yup.object().shape({
                url: yup.string().url("Must include url scheme: http:// | https:// | ftp:// | etc").min(14, "Must contain 14 or more characters.").max(1024, "Must contain less than 1024 characters."),
                alt: yup.string().min(2, "Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."), 
            }),
            address: yup.object().shape({
                state: yup.string().min(2, "Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
                country: yup.string().required("Country is Required.").min(2, "Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
                city: yup.string().required("City is Required.").min(2, "Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
                street: yup.string().required("Street is Required.").min(2, "Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
                houseNumber: yup.number().required("House Number is Required.").min(1, "Must contain 1 or more characters.").max(9999999999, "Must contain less than 10 characters."),
                zip: yup.number().required("Zip Code is Required.").min(2, "Must contain more than 2").max(99999999, "Must contain less than 8 characters."),
            }),
        }),
        onSubmit: async (values) => {
            try {
                await addUser(values).then (async () => {
                    successMsg("New User Registered Successfully :)");
                    infoMsg("Redirecting to Home Page.");
                    await handleLogin(values, dispatch);
                    formik.resetForm();
                    setTimeout(() => navit("/"), 1000);
                }).catch((err) => {
                    console.log(err);
                    warningMsg(`Error Occured: ${err.response.data}`)
                });
            } catch (error) {
                    console.error(error);
                    warningMsg(`Login Failed: ${error.response?.data || error.message}`);
                }
        },
    });

    return ( <div className="register-div">
        <h2>Register</h2>

        <div className="form-wrapper" style={{ backgroundColor: theme.background, color: theme.color}}>

            <form className="card-form" style={{ backgroundColor: theme.background, color: theme.color }} onSubmit={formik.handleSubmit}>
            <h4>Create an Account</h4>
                <div className="info-box">
                <h4> User Information:</h4>

                <div className="input-box">
                    {/* First Name Input */}
                    <label htmlFor="first">*First Name:</label>
                    <input type="text" name="name.first" id="first"
                        placeholder="Enter First Name" value={formik.values.name.first} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.name?.first && formik.errors.name?.first && (<p>{formik.errors.name?.first}</p>)}
                </div>
                    <div className="input-box">
                    {/* Middle Name Input */}
                    <label htmlFor="middle">Middle Name:</label>
                    <input type="text" name="name.middle" id="middle"
                        placeholder="Enter middle Name" value={formik.values.name.middle} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.name?.middle && formik.errors.name?.middle && (<p>{formik.errors.name?.middle}</p>)}
                </div>
                    <div className="input-box">
                    {/* Last Name Input */}
                    <label htmlFor="last">*Last Name:</label>
                    <input type="text" name="name.last" id="last"
                        placeholder="Enter last Name" value={formik.values.name.last} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.name?.last && formik.errors.name?.last && (<p>{formik.errors.name?.last}</p>)}
                </div>
                    <div className="input-box">
                    {/* phone Input */}
                    <label htmlFor="phone">*Phone:</label>
                    <input type="text" name="phone" id="phone"
                        placeholder="Enter phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.phone && formik.errors.phone && (<p>{formik.errors.phone}</p>)}
                </div>
                    <div className="input-box">
                    {/* Email Input */}
                    <label htmlFor="email">*Email:</label>
                    <input type="email" name="email" id="email"
                        placeholder="Enter email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.email && formik.errors.email && (<p>{formik.errors.email}</p>)}
                </div>
                    <div className="input-box">
                    {/* Password Input */}
                    <label htmlFor="password">*Password:</label>
                    <input type="password" name="password" id="password"
                        placeholder="Enter password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.password && formik.errors.password && (<p>{formik.errors.password}</p>)}
                </div>
                </div>

                <div className="info-box gridT2">
                    <h4>Profile Image:</h4>
                    {/* Image URL Input */}
                    <div className="input-box">
                    <label htmlFor="url">Image URL:</label>
                    <input type="text" name="image.url" id="url"
                        placeholder="Enter Image URL" value={formik.values.image.url} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.image?.url && formik.errors.image?.url && (<p>{formik.errors.image?.url}</p>)}
                    </div>
                    {/* Image Alt Input */}
                    <div className="input-box">
                    <label htmlFor="alt">Image Alt:</label>
                    <input type="text" name="image.alt" id="alt"
                        placeholder="Enter Image Alt" value={formik.values.image.alt} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.image?.alt && formik.errors.image?.alt && (<p>{formik.errors.image?.alt}</p>)}
                    </div>
                </div>
                <div className="info-box">
                    <h4>Address:</h4>
                    {/* Country Input */}
                    <div className="input-box">
                        <label htmlFor="country">*Country:</label>
                        <input type="text" name="address.country" id="country"
                            placeholder="Enter Country" value={formik.values.address.country} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.address?.country && formik.errors.address?.country && (<p>{formik.errors.address?.country}</p>)}
                    </div>
                    {/* State Input */}
                    <div className="input-box">
                    <label htmlFor="state">State:</label>
                    <input type="text" name="address.state" id="state"
                        placeholder="Enter State" value={formik.values.address.state} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.address?.state && formik.errors.address?.state && (<p>{formik.errors.address?.state}</p>)}
                    </div>
                    {/* City Input */}
                        <div className="input-box">
                    <label htmlFor="city">*City:</label>
                    <input type="text" name="address.city" id="city"
                        placeholder="Enter City" value={formik.values.address.city} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.address?.city && formik.errors.address?.city && (<p>{formik.errors.address?.city}</p>)}
                    </div>
                    {/* House Number Input */}
                    <div className="input-box">
                        <label htmlFor="houseNumber">*House #:</label>
                        <input type="number" name="address.houseNumber" id="houseNumber"
                            placeholder="House Number" value={formik.values.address.houseNumber} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                        {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (<p>{formik.errors.address?.houseNumber}</p>)}
                    </div>
                    {/* Street Input */}
                            <div className="input-box">
                    <label htmlFor="street">*Street:</label>
                    <input type="text" name="address.street" id="street"
                        placeholder="Enter Street" value={formik.values.address.street} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.address?.street && formik.errors.address?.street && (<p>{formik.errors.address?.street}</p>)}
                    </div>
                    {/* Zip Code Input */}
                                    <div className="input-box">
                    <label htmlFor="zip">*Zip Code:</label>
                    <input type="number" name="address.zip" id="zip"
                        placeholder="Enter Zip" value={formik.values.address.zip} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.address?.zip && formik.errors.address?.zip && (<p>{formik.errors.address?.zip}</p>)}
                    </div>
                </div>

                <div className="info-box gridT2">
                    <h4>User Type:</h4>
                <div className="input-box">
                    {/* Business CheckBox */}
                    <label htmlFor="isBusiness">Business User?</label>
                    <input type="checkbox" name="isBusiness" id="isBusiness" 
                    checked={formik.values.isBusiness} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.isBusiness && formik.errors.isBusiness && (<p>{formik.errors.isBusiness}</p>)}
                </div>
                <div className="input-box">
                    {/* Admin CheckBox */}
                    <label htmlFor="isAdmin">Admin User?</label>
                    <input type="checkbox" name="isAdmin" id="isAdmin" 
                    checked={formik.values.isAdmin} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.touched.isAdmin && formik.errors.isAdmin && (<p>{formik.errors.isAdmin}</p>)}
                </div>
                </div>
                <button type="submit" disabled={!formik.dirty || !formik.isValid}>
                    Register
                </button>
            </form>
        </div>
    </div> );
}
export default Register;