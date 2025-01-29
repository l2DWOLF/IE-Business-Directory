import { useFormik } from "formik";
import * as yup from 'yup';
import { addCard, getUserCards } from "../services/cardServices";
import { infoMsg, successMsg, warningMsg } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SetMyCardIds } from "../redux/UserState";

function CardNew() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    let navit = useNavigate();

    //Page Permissions//
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => { 
        if (user?.user) {
            setIsLoading(false);
            if (!user.user.isBusiness && !user.user.isAdmin) {
                warningMsg("You must be a Business or Admin to create a card.");
                navit("/");
            }
        }
    }, [user]);

    const formik = useFormik({
        initialValues: {
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
            image: {
                url: "",
                alt: ""
            },
            address: {
                state: "",
                country: "",
                city: "",
                street: "",
                houseNumber: "",
                zip: ""
            },
        },
        validationSchema: yup.object().shape({
            title: yup.string().required("Title is Required.").min(2,"Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
            subtitle: yup.string().required("Subtitle is Required.").min(2, "Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
            description: yup.string().required("Description is Required.").min(2, "Must contain 2 or more characters.").max(1024, "Must contain less than 1024 characters."),
            phone: yup.string().required("Phone is Required.").min(9, "Must contain 9 or more digits.").max(11, "Must contain less than 11 characters.").matches(/^0[0-9]{1}-?[0-9]{8}$/, "Must begin with a 0, Numbers Only."),
            email: yup.string().required("Email is Required.").email().min(5, "Must contain 5 or more characters.").max(125, "Must contain less than 125 characters."),
            web: yup.string().url("Must include the url scheme: http:// | https:// | ftp:// | etc").min(14, "Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
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
            })
        }),
        onSubmit: async (values, { resetForm }) => {
            try { 
                await addCard(values, user.token);

                const userCards = await getUserCards(user.token); // Fetch user's cards
                const userCardIds = userCards.map((card) => card._id); // Extract IDs
                dispatch(SetMyCardIds(userCardIds));

                successMsg("New Business Card Added :)");
                infoMsg("Redirecting to Your Cards Page...");
                resetForm();
                setTimeout(() => navit("/business/user"), 1000);
            } catch (error) {
                console.error(error);
                warningMsg(`Error Occurred: ${error.response?.data || error.message}`);
            }
        },
    });

    return ( <>
        <h2>Create New Business Card</h2>

        <div className="form-wrapper" style={{ padding: "1em", width:"60%", display:"flex", textAlign: "left", gap: "1px", justifyContent: "center" }}>
        <form onSubmit={formik.handleSubmit} style={{ display: "grid", width: "90%",gridTemplateColumns:"1fr 1fr", justifyContent:"center", gap: "20px" }}>

                <h4 style={{ textAlign: "Center", textDecoration: "underline", gridColumn: "span 2" }}> Business Info:</h4>
            <div>
            {/* Title Input */}
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" title="Business Name / Title" 
                placeholder="Enter Title" value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.title && formik.errors.title && (<p>{formik.errors.title}</p>)}
            </div>
            
            <div>
            {/* Subtitle Input */}
            <label htmlFor="subtitle">Subtitle:</label>
            <input type="text" name="subtitle" id="subtitle" title="Subtitle"
                placeholder="Enter Subtitle" value={formik.values.subtitle} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.subtitle && formik.errors.subtitle && (<p>{formik.errors.subtitle}</p>)}
            </div>

            <div>
            {/* Description Input */}
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" id="description" title="Description"
                placeholder="Enter Description" value={formik.values.description} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.description && formik.errors.description && (<p>{formik.errors.description}</p>)}
            </div>

            <div>
            {/* phone Input */}
            <label htmlFor="phone">Phone:</label>
            <input type="text" name="phone" id="phone" title="Phone Number"
                placeholder="Enter Phone Number" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.phone && formik.errors.phone && (<p>{formik.errors.phone}</p>)}
            </div>

            <div>
            {/* Email Input */}
            <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" title="Email"
                placeholder="Enter Email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.email && formik.errors.email && (<p>{formik.errors.email}</p>)}
            </div>

            <div>
            {/* Website Input */}
            <label htmlFor="web">Website:</label>
                    <input type="text" name="web" id="web" title="Website"
                placeholder="Enter Website" value={formik.values.web} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.web && formik.errors.web && (<p>{formik.errors.web}</p>)}
            </div>

            <div style={{gridColumn:"span 2"}}> 
                <h4 style={{textAlign:"Center", textDecoration:"underline"}}>Image:</h4> <br />
            {/* Image URL Input */}
                <label htmlFor="url">Image URL:</label>
                    <input type="text" name="image.url" id="url" title="Image URL" 
                    placeholder="Enter Image URL" value={formik.values.image.url} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.image?.url && formik.errors.image?.url && (<p>{formik.errors.image?.url}</p>)}

                {/* Image Alt Input */}
                <label htmlFor="alt">Image Alt:</label>
                    <input type="text" name="image.alt" id="alt" title="Image Alt Text / Description"
                    placeholder="Enter Image Alt" value={formik.values.image.alt} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.image?.alt && formik.errors.image?.alt && (<p>{formik.errors.image?.alt}</p>)}
            </div>

                <div style={{ gridColumn: "span 2", display: "flex", gap: "2px" }}> 
                    <h4 style={{ textAlign: "Center", textDecoration: "underline" }}>Address:</h4> <br />
                {/* State Input */}
                <label htmlFor="state">State:</label>
                    <input type="text" name="address.state" id="state" title="State"
                    placeholder="Enter State" value={formik.values.address.state} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.address?.state && formik.errors.address?.state && (<p>{formik.errors.address?.state}</p>)}

                {/* Country Input */}
                <label htmlFor="country">Country:</label>
                    <input type="text" name="address.country" id="country" title="Country"
                    placeholder="Enter Country" value={formik.values.address.country} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.address?.country && formik.errors.address?.country && (<p>{formik.errors.address?.country}</p>)}

                {/* City Input */}
                <label htmlFor="city">City:</label>
                    <input type="text" name="address.city" id="city" title="City"
                    placeholder="Enter City" value={formik.values.address.city} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.address?.city && formik.errors.address?.city && (<p>{formik.errors.address?.city}</p>)}

                {/* Street Input */}
                <label htmlFor="street">Street:</label>
                    <input type="text" name="address.street" id="street" title="Street"
                    placeholder="Enter Street" value={formik.values.address.street} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.address?.street && formik.errors.address?.street && (<p>{formik.errors.address?.street}</p>)}

                {/* House Number Input */}
                <label htmlFor="houseNumber">House Number:</label>
                    <input type="number" name="address.houseNumber" id="houseNumber" title="House Number"
                    placeholder="Enter House Number" value={formik.values.address.houseNumber} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (<p>{formik.errors.address?.houseNumber}</p>)}

                {/* Zip Code Input */}
                <label htmlFor="zip">Zip Code:</label>
                    <input type="number" name="address.zip" id="zip" title="Zip Code"
                    placeholder="Enter Zip Code" value={formik.values.address.zip} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                {formik.touched.address?.zip && formik.errors.address?.zip && (<p>{formik.errors.address?.zip}</p>)}
                </div>
                <button type="submit" disabled={!formik.dirty || !formik.isValid} style={{ gridColumn: "span 2" }} title="Submit New Business Card">
                Create Business Card
                </button>
        </form>
        </div>
    </> );
}

export default CardNew;