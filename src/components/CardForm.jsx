const CardForm = ({ initialValues, onSubmit, errors, touched, handleBlur, handleChange, isValid, dirty, isSubmitting, btnText }) => {
    return (
        <form onSubmit={onSubmit} style={{ display: "grid", width: "90%", gridTemplateColumns: "1fr 1fr", justifyContent: "center", gap: "20px" }}>
            <h4 style={{ textAlign: "center", textDecoration: "underline", gridColumn: "span 2" }}>Business Info:</h4>

            {/* Title Input */}
            <div>
                <label htmlFor="title">Title:*</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter Title"
                    value={initialValues.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.title && errors.title && <p>{errors.title}</p>}
            </div>

            {/* Subtitle Input */}
            <div>
                <label htmlFor="subtitle">Subtitle:*</label>
                <input
                    type="text"
                    name="subtitle"
                    id="subtitle"
                    placeholder="Enter Subtitle"
                    value={initialValues.subtitle}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.subtitle && errors.subtitle && <p>{errors.subtitle}</p>}
            </div>

            {/* Description Input */}
            <div>
                <label htmlFor="description">Description:*</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Enter Description"
                    value={initialValues.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.description && errors.description && <p>{errors.description}</p>}
            </div>

            {/* Phone Input */}
            <div>
                <label htmlFor="phone">Phone:*</label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter Phone Number"
                    value={initialValues.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.phone && errors.phone && <p>{errors.phone}</p>}
            </div>

            {/* Email Input */}
            <div>
                <label htmlFor="email">Email:*</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    value={initialValues.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.email && errors.email && <p>{errors.email}</p>}
            </div>

            {/* Website Input */}
            <div>
                <label htmlFor="web">Website:</label>
                <input
                    type="text"
                    name="web"
                    id="web"
                    placeholder="Enter Website"
                    value={initialValues.web}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.web && errors.web && <p>{errors.web}</p>}
            </div>

            <div style={{ gridColumn: "span 2" }}>
                <h4 style={{ textAlign: "center", textDecoration: "underline" }}>Image:</h4>
                {/* Image URL Input */}
                <label htmlFor="url">Image URL:</label>
                <input
                    type="text"
                    name="image.url"
                    id="url"
                    placeholder="Enter Image URL"
                    value={initialValues.image.url}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.image?.url && errors.image?.url && <p>{errors.image?.url}</p>}

                {/* Image Alt Input */}
                <label htmlFor="alt">Image Alt:</label>
                <input
                    type="text"
                    name="image.alt"
                    id="alt"
                    placeholder="Enter Image Alt"
                    value={initialValues.image.alt}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.image?.alt && errors.image?.alt && <p>{errors.image?.alt}</p>}
            </div>

            <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "2px", alignItems: "center" }}>
                <h4 style={{ textAlign: "center", textDecoration: "underline" }}>Address:</h4>
                {/* State Input */}
                <label htmlFor="state">State:</label>
                <input
                    type="text"
                    name="address.state"
                    id="state"
                    placeholder="Enter State"
                    value={initialValues.address.state}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.address?.state && errors.address?.state && <p>{errors.address?.state}</p>}

                {/* Country Input */}
                <label htmlFor="country">Country:*</label>
                <input
                    type="text"
                    name="address.country"
                    id="country"
                    placeholder="Enter Country"
                    value={initialValues.address.country}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.address?.country && errors.address?.country && <p>{errors.address?.country}</p>}

                {/* City Input */}
                <label htmlFor="city">City:*</label>
                <input
                    type="text"
                    name="address.city"
                    id="city"
                    placeholder="Enter City"
                    value={initialValues.address.city}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.address?.city && errors.address?.city && <p>{errors.address?.city}</p>}

                {/* Street Input */}
                <label htmlFor="street">Street:*</label>
                <input
                    type="text"
                    name="address.street"
                    id="street"
                    placeholder="Enter Street"
                    value={initialValues.address.street}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.address?.street && errors.address?.street && <p>{errors.address?.street}</p>}

                {/* House Number Input */}
                <label htmlFor="houseNumber">House Number:*</label>
                <input
                    type="number"
                    name="address.houseNumber"
                    id="houseNumber"
                    placeholder="Enter House Number"
                    value={initialValues.address.houseNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.address?.houseNumber && errors.address?.houseNumber && <p>{errors.address?.houseNumber}</p>}

                {/* Zip Code Input */}
                <label htmlFor="zip">Zip Code:*</label>
                <input
                    type="number"
                    name="address.zip"
                    id="zip"
                    placeholder="Enter Zip Code"
                    value={initialValues.address.zip}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.address?.zip && errors.address?.zip && <p>{errors.address?.zip}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !(dirty && isValid)}   // Check if the form is valid and dirty
                style={{ gridColumn: "span 2" }}
                title="Submit New Business Card"
            >{btnText}</button>
        </form>
    );
};

export default CardForm;
