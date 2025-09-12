import moment from 'moment';

const Messages = ({ user, message, time_date, classs, file = false, isLoading = false, progress = 0 }) => {
    const formatTime = (timestamp) => {
        return moment(timestamp).format('h:mm A');
    };

    if (user === 'date') {
        return (
            <div className={`${classs} flex justify-center mb-4`}>
                <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {message}
                </span>
            </div>
        );
    }
    const isOwnMessage = classs.includes('right');

    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 pr-4`}>
            {/* {!isOwnMessage && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-white text-sm font-medium">{user ? user.charAt(0).toUpperCase() : '?'}</span>
                </div>
            )} */}
            <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                {file ? (
                    <img src={message} alt="File" className="rounded-lg max-w-full max-h-64 object-contain" />
                ) : (
                    <div className="break-words whitespace-pre-wrap">{message}</div>
                )}
                {!isLoading && time_date && (
                    <div className={`text-xs mt-1 flex ${isOwnMessage ? 'justify-end text-blue-100' : 'justify-end text-gray-500'}`}>
                        <span>{formatTime(time_date)}</span>
                    </div>
                )}
                {isLoading && (
                    <div className="flex items-center mt-1">
                        <div className="w-24 bg-gray-300 rounded-full h-1.5 mr-2">
                            <div
                                className="bg-white h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-blue-100">{progress}%</span>
                    </div>
                )}
            </div>
            {/* {isOwnMessage && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                    <span className="text-white text-sm font-medium">{user ? user.charAt(0).toUpperCase() : '?'}</span>
                </div>
            )} */}
        </div>
    );
};

export default Messages;