import { X } from "lucide-react";
import { arabicTranslations } from "../../pages/auth/Register";

const ImagePreview = ({ files, onRemove, isRTL }) => {
    if (!files || files.length === 0) return null;

    return (
        <div className="mt-2">
            <div className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-16 h-16 object-cover rounded border border-gray-300"
                        />
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            title={isRTL ? arabicTranslations['Remove'] : 'Remove'}
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ImagePreview
