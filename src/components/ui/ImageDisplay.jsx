import { RxCross2 } from 'react-icons/rx';

const ImageDisplay = ({ image, setFiles, index, setPreview }) => {
    const handleRemove = () => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setPreview((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="relative">
            <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-24 h-24 object-cover rounded mr-2 mb-2"
            />
            <button
                onClick={handleRemove}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
            >
                <RxCross2 size={12} />
            </button>
        </div>
    );
};

export default ImageDisplay;