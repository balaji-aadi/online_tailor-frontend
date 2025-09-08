// import { useRef } from "react";
// import ImagePreview from "./ImagePreview";
// import { Upload } from "lucide-react";
// import { arabicTranslations } from "../../pages/auth/Register";

// export const FileInputField = ({
//     label,
//     name,
//     value = [],
//     onChange,
//     onBlur,
//     error,
//     isRequired,
//     accept,
//     setRemoveList,
//     multiple = false,
//     isRTL,
//     ...props
// }) => {
//     const fileInputRef = useRef(null);

//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         if (multiple) {
//             onChange([...value, ...files]);
//         } else {
//             onChange(files);
//         }
//         e.target.value = '';
//     };

//     const handleRemoveFile = (index) => {
//         const newFiles = [...value];
//         newFiles.splice(index, 1);
//         setRemoveList((prev) => [...prev, value[index]]);
//         onChange(newFiles);
//     };

//     const handleClick = () => {
//         fileInputRef.current?.click();
//     };

//     return (
//         <div className="mb-4">
//             <label className="block capitalize text-gray-700 font-medium mb-2">
//                 {label} {isRequired && <span className="text-red-500">*</span>}
//             </label>

//             <input
//                 type="file"
//                 id={name}
//                 name={name}
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 onBlur={onBlur}
//                 accept={accept}
//                 multiple={multiple}
//                 className="hidden"
//                 {...props}
//             />

//             <div
//                 onClick={handleClick}
//                 className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center justify-center"
//             >
//                 <Upload className="w-8 h-8 text-gray-400 mb-2" />
//                 <span className="text-sm text-gray-500">{isRTL ? arabicTranslations['Upload Files'] : 'Upload Files'}</span>
//                 {value.length > 0 && (
//                     <span className="text-xs text-gray-400 mt-1">
//                         {value.length} {isRTL ? 'ملف محدد' : 'file(s) selected'}
//                     </span>
//                 )}
//             </div>

//             <ImagePreview
//                 files={value}
//                 onRemove={handleRemoveFile}
//                 isRTL={isRTL}
//             />

//             {error && <div className="text-red-500 text-sm">{error}</div>}
//         </div>
//     );
// };

import { useRef } from "react";
import ImagePreview from "./ImagePreview";
import { Upload } from "lucide-react";
import { arabicTranslations } from "../../pages/auth/Register";

export const FileInputField = ({
    label,
    name,
    value = [],
    onChange,
    onBlur,
    error,
    isRequired,
    accept,
    setRemoveList,
    multiple = false,
    isRTL,
    preview = [],
    buttonClassName = "",
    ...props
}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (multiple) {
            // Combine existing files with new ones
            const existingFiles = value.filter(item => typeof item === 'string');
            const newFileObjects = files;
            onChange([...existingFiles, ...newFileObjects]);
        } else {
            onChange(files.length > 0 ? [files[0]] : []);
        }
        e.target.value = '';
    };

    const handleRemoveFile = (index) => {
        const fileToRemove = value[index];

        // If it's a string (URL from server), add to remove list
        if (typeof fileToRemove === 'string' && setRemoveList) {
            setRemoveList((prev) => [...prev, fileToRemove]);
        }

        // Remove the file from the value array
        const newFiles = [...value];
        newFiles.splice(index, 1);
        onChange(newFiles);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="mb-4">
            {label && (
                <label className="block capitalize text-gray-700 font-medium mb-2">
                    {label} {isRequired && <span className="text-red-500">*</span>}
                </label>
            )}

            <input
                type="file"
                id={name}
                name={name}
                ref={fileInputRef}
                onChange={handleFileChange}
                onBlur={onBlur}
                accept={accept}
                multiple={multiple}
                className="hidden"
                {...props}
            />

            {!props.className?.includes('hidden') && (
                <div
                    onClick={handleClick}
                    className={`w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center justify-center ${buttonClassName}`}
                >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">{isRTL ? arabicTranslations['Upload Files'] || 'رفع الملفات' : 'Upload Files'}</span>
                    {value.length > 0 && (
                        <span className="text-xs text-gray-400 mt-1">
                            {value.length} {isRTL ? 'ملف محدد' : 'file(s) selected'}
                        </span>
                    )}
                </div>
            )}

            <ImagePreview
                files={value}
                onRemove={handleRemoveFile}
                isRTL={isRTL}
            />

            {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    );
};
