import { useFormik } from "formik";
import * as yup from 'yup';
import { addCard, getUserCards } from "../services/cardServices";
import { infoMsg, successMsg, warningMsg } from "../services/feedbackService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { SetMyCardIds } from "../redux/UserState";
import CardForm from "./CardForm";
import { siteTheme } from "../App";

function CardNew() {
    const theme = useContext(siteTheme);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    let navit = useNavigate();
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
            title: yup.string().required("Title is Required.").min(2, "Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
            subtitle: yup.string().required("Subtitle is Required.").min(2, "Must contain 2 or more characters.").max(256, "Must contain less than 256 characters."),
            description: yup.string().required("Description is Required.").min(2, "Must contain 2 or more characters.").max(1024, "Must contain less than 1024 characters."),
            phone: yup.string().required("Phone is Required.").min(8, "Must contain 8 or more digits.").max(11, "Must contain less than 11 characters.").matches(/^0[0-9]{1}-?[0-9]{7}$/, "Must begin with 0 and contain only numbers."),
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

    return (
        <div style={{ width: "100%", padding: "1em", display:"flex", flexDirection:"column", alignItems:"center", background: theme.background, color: theme.color }}>
            
            <h1>Create New Business Card</h1>

            <CardForm className="card-form"
                initialValues={formik.values}
                onSubmit={formik.handleSubmit}
                errors={formik.errors}
                touched={formik.touched}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                isValid={formik.isValid}
                dirty={formik.dirty}
                isSubmitting={formik.isSubmitting}
                btnText="Add New Business"
            />
        </div>
    );
}
export default CardNew;