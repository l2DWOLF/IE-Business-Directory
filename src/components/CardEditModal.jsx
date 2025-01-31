import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import { editCard, getUserCards } from "../services/cardServices";
import { useDispatch } from "react-redux";
import { SetMyCardIds } from "../redux/UserState";
import CardForm from "./CardForm";

export default function CardEditModal({ isOpen, onClose, cardData, token }) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.querySelector(".modal-content")?.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    const initialValues = cardData || {
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        image: { url: "", alt: "" },
        address: { state: "", country: "", city: "", street: "", houseNumber: "", zip: "" },
    };
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            title: yup.string().required("Title is required").min(2).max(256),
            subtitle: yup.string().required("Subtitle is required").min(2).max(256),
            description: yup.string().required("Description is required").min(2).max(1024),
            phone: yup.string().required("Phone is required").matches(/^0[0-9]{1}-?[0-9]{8}$/, "Invalid phone format"),
            email: yup.string().required("Email is required").email(),
            web: yup.string().url("Invalid URL format").nullable(),
            image: yup.object().shape({
                url: yup.string().url("Invalid URL format").nullable(),
                alt: yup.string().min(2).max(256),
            }),
            address: yup.object().shape({
                state: yup.string().min(2).max(256),
                country: yup.string().required("Country is required").min(2).max(256),
                city: yup.string().required("City is required").min(2).max(256),
                street: yup.string().required("Street is required").min(2).max(256),
                houseNumber: yup.number().required("House Number is required"),
                zip: yup.number().required("Zip Code is required"),
            }),
        }),
        onSubmit: async (values) => {
            const { title, subtitle, description, phone, email, web, image, address } = values;
            const filteredCardInfo = {
                title,
                subtitle,
                description,
                phone,
                email,
                web,
                image: { url: image.url, alt: image.alt },
                address: {
                    state: address.state,
                    country: address.country,
                    city: address.city,
                    street: address.street,
                    houseNumber: address.houseNumber,
                    zip: address.zip
                }
            };

            try {
                await editCard(cardData._id, filteredCardInfo, token);
                console.log("Submitting Edits..");
                const userCards = await getUserCards(token);
                const userCardIds = userCards.map((card) => card._id);
                dispatch(SetMyCardIds(userCardIds));

                onClose();
            } catch (error) {
                console.log(error);
            }
        },
    });

    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✖</button>
                <>
                <h2>Edit Business Card</h2>

                <CardForm
                    initialValues={formik.values}
                    onSubmit={formik.handleSubmit}
                    errors={formik.errors}
                    touched={formik.touched}
                    handleBlur={formik.handleBlur}
                    handleChange={formik.handleChange}
                    isValid={formik.isValid}
                    dirty={formik.dirty}
                    isSubmitting={formik.isSubmitting}
                    btnText="Submit Edits"
                />
                </>
            </div>
        </div>
    );
}
