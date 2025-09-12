import { useEffect, useRef, useState } from "react";
import {
    IoClose,
    IoSend,
    IoImage,
} from "react-icons/io5";
import { useSocket } from "./SocketProvider";
import { useSelector } from "react-redux";
import moment from "moment";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import Messages from "./Messages";

const ChatComponent = ({ onClose, order }) => {
    const {
        socket,
        setMessage,
        message,
        handleMessage,
        receiverUID,
        setReceiverUID,
        allMessages,
        orderId,
        setOrderId,
        setFiles,
        setPreview,
        isImageModalOpen,
        isLoading,
        progress,
        setIsImageModalOpen,
        file,
        preview,
        isUserOnline
    } = useSocket();

    const activeUser = useSelector((state) => state.store.currentUser);
    const [typing, setTyping] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (order) {
            setOrderId(order._id);
            setReceiverUID(order.customer?._id || order.tailor?._id);
        }
    }, [order, setOrderId, setReceiverUID]);

    const handleFileChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setFiles((prevImages) => [...prevImages, ...selectedImages]);

        const readFiles = selectedImages.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readFiles).then((newPreviews) => {
            setPreview((prevPreviews) => [...prevPreviews, ...newPreviews]);
            setIsImageModalOpen(true);
        });

        e.target.value = null;
    };

    const groupMessagesByDate = (messages) => {
        return messages.reduce((groupedMessages, message) => {
            const date = new Date(message.createdAt);
            const today = moment().startOf("day");
            const messageDate = moment(date).startOf("day");
            let dateKey;

            if (messageDate.isSame(today, "day")) {
                dateKey = "Today";
            } else if (messageDate.isSame(today.clone().subtract(1, "day"), "day")) {
                dateKey = "Yesterday";
            } else if (messageDate.isSame(today, "week")) {
                dateKey = messageDate.format("dddd");
            } else {
                dateKey = messageDate.format("DD MMMM YYYY");
            }

            if (!groupedMessages[dateKey]) {
                groupedMessages[dateKey] = [];
            }
            groupedMessages[dateKey].push(message);

            return groupedMessages;
        }, {});
    };

    const groupedMessages = groupMessagesByDate(
        allMessages.filter(
            (item) =>
                item.orderId === orderId &&
                ((item.senderId?._id === activeUser?._id && item.receiverId?._id === receiverUID) ||
                    (item.senderId?._id === receiverUID && item.receiverId?._id === activeUser?._id))
        )
    );

    const messagesWithDates = [];

    Object.entries(groupedMessages).forEach(([date, messages]) => {
        messagesWithDates.push({ type: "date", date });
        messages.forEach((message) => {
            messagesWithDates.push({ type: "message", ...message });
        });
    });

    const handleTyping = () => {
        socket.emit("typing", { sender: activeUser?._id, receiver: receiverUID, orderId });
    };

    useEffect(() => {
        socket.on("typing", (data) => {
            if (data.receiver === activeUser?._id && data.orderId === orderId) {
                setTyping(true);
                setTimeout(() => setTyping(false), 8000);
            }
        });

        return () => {
            socket.off("typing");
        };
    }, [socket, activeUser?._id, orderId]);

    return (
        <div className="fixed top-0 right-0 w-full md:w-1/2 h-full bg-white shadow-lg z-50 flex flex-col">
            {/* Header with Online Status */}
            <div className="flex justify-between items-center p-4 border-b">
                <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold">
                            {order?.customerName}{" "}
                            <span className="text-primary">{order?.order_id && `#${order.order_id}`}</span>
                        </h2>
                        {receiverUID && (
                            <div className="ml-2 flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-1 ${isUserOnline(receiverUID) ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                <span className="text-xs text-gray-500">
                                    {isUserOnline(receiverUID) ? 'Online' : 'Offline'}
                                </span>
                            </div>
                        )}
                    </div>
                    <span className="text-xs font-semibold">{order?.customer?.email}</span>
                    <span className="text-sm text-blue-600 font-semibold">
                        {typing && "Typing..."}
                    </span>
                </div>
                <button onClick={onClose} className="text-gray-600 hover:text-red-600">
                    <IoClose size={24} />
                </button>
            </div>

            {/* Message Area */}
            {!isImageModalOpen ? (
                messagesWithDates.length > 0 ? (
                    <ReactScrollToBottom className="flex-1 p-4 overflow-auto w-full relative">
                        {messagesWithDates.map((item, ind) => {
                            if (item.type === "date") {
                                return (
                                    <Messages
                                        key={ind}
                                        user="date"
                                        message={item.date}
                                        classs="message_message-date"
                                    />
                                );
                            } else if (item.type === "file") {
                                return (
                                    <Messages
                                        key={ind}
                                        message={item.filePath}
                                        time_date={item.createdAt}
                                        classs={
                                            item.senderId?._id === activeUser?._id
                                                ? "message_right"
                                                : "message_left"
                                        }
                                        file={true}
                                    />
                                );
                            } else {
                                return (
                                    <Messages
                                        key={ind}
                                        user={
                                            item.senderId?._id === activeUser?._id
                                                ? activeUser?.ownerName
                                                : ""
                                        }
                                        message={item.message}
                                        time_date={item.createdAt}
                                        classs={
                                            item.senderId?._id === activeUser?._id
                                                ? "message_right"
                                                : "message_left"
                                        }
                                    />
                                );
                            }
                        })}
                        {isLoading &&
                            progress > 0 &&
                            preview.map((src, index) => (
                                <Messages
                                    key={index}
                                    isLoading={isLoading}
                                    progress={progress}
                                    message={src}
                                    classs="message_right"
                                />
                            ))}
                    </ReactScrollToBottom>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-md shadow-inner">
                        <p className="text-gray-500 text-lg font-medium mb-2">
                            No conversations yet
                        </p>
                        <p className="text-sm text-gray-400 italic">
                            Start a new conversation and your messages will appear here!
                        </p>
                    </div>
                )
            ) : (
                <section className="file__modal__container flex flex-col items-center justify-center flex-1 p-4 bg-gray-100">
                    <div className="w-full relative max-w-md bg-white p-6 rounded-lg shadow-md">
                        <span className="block text-center mb-4 font-medium">{file?.length || "No File Selected"} Files selected</span>
                        <div className="grid grid-cols-3 gap-4 overflow-auto max-h-96">
                            {preview?.map((src, index) => (
                                <div key={index} className="relative">
                                    <img src={src} alt="Preview" className="w-full h-32 object-cover rounded-md" />
                                    <button
                                        onClick={() => {
                                            setFiles((prev) => prev.filter((_, i) => i !== index));
                                            setPreview((prev) => prev.filter((_, i) => i !== index));
                                        }}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                    >
                                        <RxCross2 size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
                            onClick={() => {
                                setIsImageModalOpen(false);
                                setFiles([]);
                                setPreview([]);
                            }}
                        >
                            <RxCross2 size={24} />
                        </button>
                    </div>
                    <label htmlFor="attachment" className="mt-4 bg-blue-500 text-white p-3 rounded-full cursor-pointer hover:bg-blue-600">
                        <FaPlus size={20} />
                    </label>
                </section>
            )}

            {/* Input Area */}
            <div className="p-4 border-t bg-gray-100 flex items-center space-x-3">
                <form
                    className="flex-1 relative"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleMessage();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Type a message"
                        className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pl-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            handleTyping();
                        }}
                    />
                </form>
                <div>
                    <button className="text-gray-500 hover:text-blue-500 pt-2">
                        <IoImage size={24} onClick={() => fileInputRef.current.click()} />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        id="attachment"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button className="text-blue-500 hover:text-blue-700" type="submit" onClick={handleMessage}>
                    <IoSend size={24} />
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;