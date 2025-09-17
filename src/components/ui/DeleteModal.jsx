import { useState } from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, title, description, confirmText, cancelText }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[50] flex items-center justify-center backdrop-blur-sm bg-gray-900/80'>
      <div className='bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl z-10'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>{title}</h2>
        <p className='text-gray-600 mb-6'>{description}</p>
        <div className='flex justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 cursor-pointer border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors'
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className='px-4 py-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className='animate-spin h-4 w-4 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Deleting...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;