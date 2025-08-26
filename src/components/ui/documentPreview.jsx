import  { useState } from 'react';
import { Eye, Download, FileText, X } from 'lucide-react';

const DocumentPreview = ({ documents = [] }) => {
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleDocumentView = (doc) => {
        setSelectedDoc(doc);
        setIsPreviewOpen(true);
    };

    const handleOpenInNewTab = (doc) => {
        window.open(doc.url, '_blank');
    };

    const closePreview = () => {
        setIsPreviewOpen(false);
        setSelectedDoc(null);
    };

    if (!documents || documents.length === 0) {
        return (
            <div className="text-gray-500 text-sm">No documents uploaded</div>
        );
    }

    return (
        <div className="space-y-2">
            {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleDocumentView(doc)}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
                            title="Preview"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleOpenInNewTab(doc)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded-full"
                            title="Open in new tab"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}

            {/* Preview Modal */}
            {isPreviewOpen && selectedDoc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold">{selectedDoc.name}</h3>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleOpenInNewTab(selectedDoc)}
                                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Open in New Tab
                                </button>
                                <button
                                    onClick={closePreview}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 overflow-auto max-h-[calc(90vh-100px)]">
                            {selectedDoc.type === 'application/pdf' ? (
                                <iframe
                                    src={selectedDoc.url}
                                    className="w-full h-96"
                                    title={selectedDoc.name}
                                />
                            ) : selectedDoc.type.startsWith('image/') ? (
                                <img
                                    src={selectedDoc.url}
                                    alt={selectedDoc.name}
                                    className="max-w-full h-auto"
                                />
                            ) : (
                                <div className="text-center py-8">
                                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">Preview not available for this file type</p>
                                    <button
                                        onClick={() => handleOpenInNewTab(selectedDoc)}
                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Open in New Tab
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentPreview;