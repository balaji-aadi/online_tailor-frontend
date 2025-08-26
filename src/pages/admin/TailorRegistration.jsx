import { useFormik } from 'formik';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import InputField from '../../components/ui/InputField';


const TailorRegistrationForm = ({ onSubmit, initialValues = {} }) => {
    const locationOptions = [
        { value: 'dubai', label: 'Dubai' },
        { value: 'abu-dhabi', label: 'Abu Dhabi' },
        { value: 'sharjah', label: 'Sharjah' },
        { value: 'ajman', label: 'Ajman' },
        { value: 'ras-al-khaimah', label: 'Ras Al Khaimah' },
        { value: 'fujairah', label: 'Fujairah' },
        { value: 'umm-al-quwain', label: 'Umm Al Quwain' }
    ];

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'both', label: 'Both Male & Female' }
    ];

    const specialtyOptions = [
        { value: 'kandura', label: 'Kandura' },
        { value: 'bisht', label: 'Bisht' },
        { value: 'traditional-wear', label: 'Traditional Wear' },
        { value: 'formal-wear', label: 'Formal Wear' },
        { value: 'casual-alterations', label: 'Casual Alterations' },
        { value: 'wedding-dress', label: 'Wedding Dress' },
        { value: 'suits', label: 'Suits' },
        { value: 'abayas', label: 'Abayas' },
        { value: 'thobes', label: 'Thobes' },
        { value: 'evening-wear', label: 'Evening Wear' },
        { value: 'casual-wear', label: 'Casual Wear' },
        { value: 'uniforms', label: 'Uniforms' }
    ];

    const experienceOptions = [
        { value: '1-2', label: '1-2 years' },
        { value: '3-5', label: '3-5 years' },
        { value: '6-10', label: '6-10 years' },
        { value: '11-15', label: '11-15 years' },
        { value: '15+', label: '15+ years' }
    ];

    const languageOptions = [
        { value: 'english', label: 'English' },
        { value: 'arabic', label: 'Arabic' },
        { value: 'hindi', label: 'Hindi' },
        { value: 'urdu', label: 'Urdu' },
        { value: 'tamil', label: 'Tamil' },
        { value: 'malayalam', label: 'Malayalam' },
        { value: 'bengali', label: 'Bengali' },
        { value: 'punjabi', label: 'Punjabi' }
    ];

    const formik = useFormik({
        initialValues: {
            businessName: initialValues.businessName || '',
            ownerName: initialValues.ownerName || '',
            email: initialValues.email || '',
            phone: initialValues.phone || '',
            whatsapp: initialValues.whatsapp || '',
            locations: initialValues.locations || [],
            address: initialValues.address || '',
            gender: initialValues.gender || '',
            specialties: initialValues.specialties || [],
            experience: initialValues.experience || '',
            description: initialValues.description || '',

            // Documents
            tradeLicense: null,
            emiratesId: null,
            certificates: null,
            portfolioImages: null,

            // Business Details
            workingHours: initialValues.workingHours || '',
            homeMeasurement: initialValues.homeMeasurement || false,
            rushOrders: initialValues.rushOrders || false,

            // Additional Information
            socialMedia: {
                instagram: initialValues.socialMedia?.instagram || '',
                facebook: initialValues.socialMedia?.facebook || '',
                website: initialValues.socialMedia?.website || ''
            }
        },
        validate: (values) => {
            const errors = {};

            // Required field validations
            if (!values.businessName) errors.businessName = 'Business name is required';
            if (!values.ownerName) errors.ownerName = 'Owner name is required';
            if (!values.email) errors.email = 'Email is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = 'Invalid email format';
            }
            if (!values.phone) errors.phone = 'Phone is required';
            if (!values.locations.length) errors.locations = 'At least one location is required';
            if (!values.address) errors.address = 'Address is required';
            if (!values.gender) errors.gender = 'Gender preference is required';
            if (!values.specialties.length) errors.specialties = 'At least one specialty is required';
            if (!values.experience) errors.experience = 'Experience is required';

            return errors;
        },
        onSubmit: (values) => {
            // Create payload for backend
            const payload = {
                // Basic Information
                businessInfo: {
                    businessName: values.businessName,
                    ownerName: values.ownerName,
                    email: values.email,
                    phone: values.phone,
                    whatsapp: values.whatsapp,
                    locations: values.locations,
                    address: values.address
                },

                // Professional Information
                professionalInfo: {
                    gender: values.gender,
                    specialties: values.specialties,
                    experience: values.experience,
                    description: values.description,
                    workingHours: values.workingHours
                },

                // Services
                services: {
                    homeMeasurement: values.homeMeasurement,
                    rushOrders: values.rushOrders
                },

                // Documents (these would be file uploads)
                documents: {
                    tradeLicense: values.tradeLicense,
                    emiratesId: values.emiratesId,
                    certificates: values.certificates,
                    portfolioImages: values.portfolioImages
                },

                // Additional Info
                additionalInfo: {
                    socialMedia: values.socialMedia
                },

                // Metadata
                submittedAt: new Date().toISOString(),
                status: 'pending'
            };

            onSubmit(payload);
        }
    });

    const handleFileChange = (fieldName) => (e) => {
        const file = e.target.files[0];
        formik.setFieldValue(fieldName, file);
    };

    const handlePhoneChange = (value) => {
        formik.setFieldValue('phone', value || '');
    };

    const handleWhatsAppChange = (value) => {
        formik.setFieldValue('whatsapp', value || '');
    };

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Business Name"
                        name="businessName"
                        type="text"
                        value={formik.values.businessName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.businessName && formik.errors.businessName}
                        isRequired
                        placeholder="Enter business name"
                    />

                    <InputField
                        label="Owner Name"
                        name="ownerName"
                        type="text"
                        value={formik.values.ownerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.ownerName && formik.errors.ownerName}
                        isRequired
                        placeholder="Enter owner name"
                    />

                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email}
                        isRequired
                        placeholder="Enter email address"
                    />

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <PhoneInput
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="AE"
                            value={formik.values.phone}
                            onChange={handlePhoneChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-2 border rounded-lg outline-none border-gray-300"
                            style={{
                                '--PhoneInputCountryFlag-height': '1em',
                                '--PhoneInputCountrySelectArrow-color': '#6b7280',
                            }}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            WhatsApp
                        </label>
                        <PhoneInput
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="AE"
                            value={formik.values.whatsapp}
                            onChange={handleWhatsAppChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-2 border rounded-lg outline-none border-gray-300"
                            style={{
                                '--PhoneInputCountryFlag-height': '1em',
                                '--PhoneInputCountrySelectArrow-color': '#6b7280',
                            }}
                        />
                    </div>

                    <InputField
                        label="Locations"
                        name="locations"
                        type="select"
                        value={formik.values.locations}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        options={locationOptions}
                        error={formik.touched.locations && formik.errors.locations}
                        isRequired
                        isMulti
                        placeholder="Select locations"
                    />
                </div>

                <InputField
                    label="Address"
                    name="address"
                    type="textarea"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.address && formik.errors.address}
                    isRequired
                    placeholder="Enter full address"
                />
            </div>

            {/* Professional Information */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Gender Specialization"
                        name="gender"
                        type="select"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        options={genderOptions}
                        error={formik.touched.gender && formik.errors.gender}
                        isRequired
                        placeholder="Select gender specialization"
                    />

                    <InputField
                        label="Specialties"
                        name="specialties"
                        type="select"
                        value={formik.values.specialties}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        options={specialtyOptions}
                        error={formik.touched.specialties && formik.errors.specialties}
                        isRequired
                        isMulti
                        placeholder="Select specialties"
                    />

                    <InputField
                        label="Experience"
                        name="experience"
                        type="select"
                        value={formik.values.experience}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        options={experienceOptions}
                        error={formik.touched.experience && formik.errors.experience}
                        isRequired
                        placeholder="Select experience level"
                    />

                    <InputField
                        label="Working Hours"
                        name="workingHours"
                        type="text"
                        value={formik.values.workingHours}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="e.g., 9 AM - 9 PM"
                    />
                </div>

                <InputField
                    label="Business Description"
                    name="description"
                    type="textarea"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Describe your tailoring services and expertise"
                />
            </div>

            {/* Services Offered */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Services Offered</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="homeMeasurement"
                            name="homeMeasurement"
                            checked={formik.values.homeMeasurement}
                            onChange={formik.handleChange}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="homeMeasurement" className="text-gray-700 font-medium">
                            Home Measurement Available
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rushOrders"
                            name="rushOrders"
                            checked={formik.values.rushOrders}
                            onChange={formik.handleChange}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="rushOrders" className="text-gray-700 font-medium">
                            Rush Orders Accepted
                        </label>
                    </div>
                </div>
            </div>

            {/* Documents Upload */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents Upload</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Trade License"
                        name="tradeLicense"
                        type="file"
                        onChange={handleFileChange('tradeLicense')}
                        accept=".pdf,.jpg,.jpeg,.png"
                        isRequired
                    />

                    <InputField
                        label="Emirates ID"
                        name="emiratesId"
                        type="file"
                        onChange={handleFileChange('emiratesId')}
                        accept=".pdf,.jpg,.jpeg,.png"
                        isRequired
                    />

                    <InputField
                        label="Certificates"
                        name="certificates"
                        type="file"
                        onChange={handleFileChange('certificates')}
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                    />

                    <InputField
                        label="Portfolio Images"
                        name="portfolioImages"
                        type="file"
                        onChange={handleFileChange('portfolioImages')}
                        accept=".jpg,.jpeg,.png"
                        multiple
                    />
                </div>
            </div>

            {/* Social Media */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media & Online Presence</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                        label="Instagram"
                        name="socialMedia.instagram"
                        type="url"
                        value={formik.values.socialMedia.instagram}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Instagram profile URL"
                    />

                    <InputField
                        label="Facebook"
                        name="socialMedia.facebook"
                        type="url"
                        value={formik.values.socialMedia.facebook}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Facebook page URL"
                    />

                    <InputField
                        label="Website"
                        name="socialMedia.website"
                        type="url"
                        value={formik.values.socialMedia.website}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Website URL"
                    />
                </div>
            </div>
        </form>
    );
};

export default TailorRegistrationForm;