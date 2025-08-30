import { CheckCircle, Eye, MoreVertical, XCircle, PlayCircle } from "lucide-react";
import { useState } from "react";

const ActionDropdown = ({ tailor, onApprove, onReject, onDeactivate, onActivate, onView }) => {
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const DropdownMenu = () => {
        const isOpen = dropdownOpen === tailor.id;

        return (
            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(isOpen ? null : tailor.id)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    <MoreVertical className="w-4 h-4" />
                </button>

                {isOpen && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                        <button
                            onClick={() => {
                                onView(tailor);
                                setDropdownOpen(null);
                            }}
                            className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-gray-50"
                        >
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                        </button>

                        {tailor.status === 'pending' && onApprove && onReject && (
                            <>
                                <button
                                    onClick={() => {
                                        onApprove(tailor);
                                        setDropdownOpen(null);
                                    }}
                                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-green-600 hover:bg-gray-50"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Approve</span>
                                </button>

                                <button
                                    onClick={() => {
                                        onReject(tailor);
                                        setDropdownOpen(null);
                                    }}
                                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-50"
                                >
                                    <XCircle className="w-4 h-4" />
                                    <span>Reject</span>
                                </button>
                            </>
                        )}

                        {tailor.status === 'approved' && onDeactivate && (
                            <button
                                onClick={() => {
                                    onDeactivate(tailor);
                                    setDropdownOpen(null);
                                }}
                                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-50"
                            >
                                <XCircle className="w-4 h-4" />
                                <span>Deactivate</span>
                            </button>
                        )}

                        {tailor.status === 'deactivated' && onActivate && (
                            <button
                                onClick={() => {
                                    onActivate(tailor);
                                    setDropdownOpen(null);
                                }}
                                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-green-600 hover:bg-gray-50"
                            >
                                <PlayCircle className="w-4 h-4" />
                                <span>Activate</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return <DropdownMenu />;
};

export default ActionDropdown;