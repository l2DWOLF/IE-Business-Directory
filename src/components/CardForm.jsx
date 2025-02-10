import './css/forms.css'


const CardForm = ({ initialValues, onSubmit, errors, touched, handleBlur, handleChange, isValid, dirty, isSubmitting, btnText }) => {

    return (
        <form className="card-form" onSubmit={onSubmit} >
            <div className="info-box">
            <h4>Business Info:</h4>

            {/* Title Input */}
            <div className="input-box">
                    <label htmlFor="title">*Title:</label>
                    <input type="text" name="title" id="title" placeholder="Enter Title" autoComplete="on"
                    value={initialValues.title}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched?.title && errors?.title && <p>{errors?.title}</p>}
            </div>
            {/* Subtitle Input */}
            <div className="input-box">
                    <label htmlFor="subtitle">*Subtitle:</label>
                    <input type="text" name="subtitle" id="subtitle" placeholder="Enter Subtitle" autoComplete="on"
                    value={initialValues.subtitle}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched.subtitle && errors.subtitle && <p>{errors.subtitle}</p>}
            </div>

            {/* Description Input */}
            <div className="input-box">
                    <label htmlFor="description">*Description:</label>
                    <input type="text" name="description" id="description" placeholder="Enter Description" autoComplete="on"
                    value={initialValues.description}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched.description && errors.description && <p>{errors.description}</p>}
            </div>

            {/* Phone Input */}
            <div className="input-box">
                    <label htmlFor="phone">*Phone:</label>
                    <input type="text" name="phone" id="phone" placeholder="Enter Phone Number" autoComplete="on"
                    value={initialValues.phone}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched.phone && errors.phone && <p>{errors.phone}</p>}
            </div>

            {/* Email Input */}
            <div className="input-box">
                    <label htmlFor="email">*Email:</label>
                    <input type="email" name="email" id="email" placeholder="Enter Email" autoComplete="on"
                    value={initialValues.email}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched.email && errors.email && <p>{errors.email}</p>}
            </div>

            {/* Website Input */}
            <div className="input-box">
                <label htmlFor="web">Website:</label>
                    <input type="text" name="web" id="web" placeholder="Enter Website" autoComplete="on"
                    value={initialValues.web}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched?.web && errors?.web && <p>{errors?.web}</p>}
            </div>
            </div>
            
            <div className="info-box gridT2">
                <h4>Business Image:</h4>
                {/* Image URL Input */}
                <div className="input-box">
                <label htmlFor="url">Image URL:</label>
                    <input type="text" name="image.url" id="url" placeholder="Enter Image URL" autoComplete="on"
                    value={initialValues.image.url}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched.image?.url && errors.image?.url && <p>{errors.image?.url}</p>}
                </div>
                {/* Image Alt Input */}
                <div className="input-box">
                <label htmlFor="alt">Image Alt:</label>
                    <input type="text" name="image.alt" id="alt" placeholder="Enter Image Alt" autoComplete="on"
                    value={initialValues.image.alt}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched.image?.alt && errors.image?.alt && <p>{errors.image?.alt}</p>}
                </div>
            </div>

            <div className="info-box">
                <h4>Business Address:</h4>
                {/* Country Input */}
                <div className="input-box">
                    <label htmlFor="country">*Country:</label>
                    <input type="text" name="address.country" id="country" placeholder="Enter  Country" autoComplete="on"
                        value={initialValues.address.country}
                        onBlur={handleBlur}
                        onFocus={handleBlur}
                        onChange={handleChange}
                    />
                    {touched.address?.country && errors.address?.country && <p>{errors.address?.country}</p>}
                </div>
                {/* State Input */}
                <div className="input-box">
                <label htmlFor="state">State:</label>
                    <input type="text" name="address.state" id="state" placeholder="Enter State" autoComplete="on"
                    value={initialValues.address.state}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched.address?.state && errors.address?.state && <p>{errors.address?.state}</p>}
                </div>
                {/* City Input */}
                <div className="input-box">
                    <label htmlFor="city">*City:</label>
                    <input type="text" name="address.city" id="city" placeholder="Enter City" autoComplete="on"
                    value={initialValues.address.city}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched.address?.city && errors.address?.city && <p>{errors.address?.city}</p>}
                </div>
                {/* House Number Input */}
                <div className="input-box">
                    <label htmlFor="houseNumber">*House #:</label>
                    <input type="number" name="address.houseNumber" id="houseNumber" placeholder="House Number" autoComplete="on"
                        value={initialValues.address.houseNumber}
                        onBlur={handleBlur}
                        onFocus={handleBlur}
                        onChange={handleChange}
                    />
                    {touched.address?.houseNumber && errors.address?.houseNumber && <p>{errors.address?.houseNumber}</p>}
                </div>
                {/* Street Input */}
                <div className="input-box">
                    <label htmlFor="street">*Street:</label>
                    <input type="text" name="address.street" id="street" placeholder="Enter Street" autoComplete="on"
                    value={initialValues.address.street}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched.address?.street && errors.address?.street && <p>{errors.address?.street}</p>}
                </div>
                {/* Zip Code Input */}
                <div className="input-box">
                    <label htmlFor="zip">*Zip Code:</label>
                    <input type="number" name="address.zip" id="zip" placeholder="Enter Zip Code" autoComplete="on"
                    value={initialValues.address.zip}
                    onBlur={handleBlur}
                    onFocus={handleBlur}
                    onChange={handleChange}
                />
                {touched.address?.zip && errors.address?.zip && <p>{errors.address?.zip}</p>}
                </div>
            </div>
            <button
                type="submit"
                disabled={isSubmitting || !(dirty && isValid)}
                title="Submit New Business Card"
            >{btnText}</button>
        </form>
    );
};
export default CardForm;
