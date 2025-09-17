import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { socketServer } from "../../config";
import ChatApi from "../../api/chat.api";
import { useNotification } from "../../components/Notification/NotificationContext";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
    const user = useSelector((state) => state.store.currentUser);
    const userId = user?._id;
    const { addNotification } = useNotification();

    const [receiverUID, setReceiverUID] = useState(null);
    const [allMessages, setAllMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState([]);
    const [file, setFiles] = useState([]);
    const [preview, setPreview] = useState([]);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [bigImage, setBigImage] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState(new Map());

    // Socket connection
    const socket = useMemo(
        () =>
            io(socketServer, {
                transports: ["websocket"],
                withCredentials: true,
                query: {
                    userId: userId,
                    userRole: user?.role
                }
            }),
        [userId, user?.role]
    );

    // Join socket
    useEffect(() => {
        if (!socket || !userId) return;

        socket.emit("join", { userId, user });

        socket.on("user-connected", (data) => {
            setOnlineUsers(prev => {
                const newOnlineUsers = new Map(prev);
                newOnlineUsers.set(data.userId, true);
                return newOnlineUsers;
            });
        });

        socket.on("user-disconnected", (data) => {
            setOnlineUsers(prev => {
                const newOnlineUsers = new Map(prev);
                newOnlineUsers.delete(data.userId);
                return newOnlineUsers;
            });
        });

        socket.on("new-notification", (notification) => {
            addNotification(notification);
        });

        return () => {
            socket.off("user-connected");
            socket.off("user-disconnected");
            socket.off("new-notification");
        };
    }, [socket, userId, user, addNotification]);

    // Fetch user status
    const fetchAllUsersStatus = useCallback(async () => {
        try {
            const res = await ChatApi.getAllUserStatus();
            setStatus(res.data);
        } catch (err) {
            console.error("Error fetching user status:", err);
        }
    }, []);

    useEffect(() => {
        fetchAllUsersStatus();
    }, [fetchAllUsersStatus]);

    // Send message
    const handleMessage = async () => {
        if (!receiverUID || !userId || !orderId) return;

        try {
            if (file?.length > 0) {
                setIsImageModalOpen(false);
                if (message) {
                    socket.emit("message", {
                        senderId: userId,
                        receiverId: receiverUID,
                        message,
                        orderId
                    });
                    setMessage("");
                }
                const newFileData = await uploadFiles(file, userId, receiverUID);
                newFileData.forEach((fileData) =>
                    socket.emit("file-upload", { ...fileData, orderId })
                );
                setFiles([]);
                setPreview([]);
            } else if (message) {
                socket.emit("message", {
                    senderId: userId,
                    receiverId: receiverUID,
                    message,
                    orderId
                });
                setMessage("");
            }
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    // Upload files
    const uploadFiles = async (files, senderId, receiverId) => {
        const formData = new FormData();
        Array.from(files).forEach((f) => formData.append("files", f));
        formData.append("senderId", senderId);
        formData.append("receiverId", receiverId);

        try {
            setIsLoading(true);
            setProgress(0);

            const response = await ChatApi.uploadFiles(formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (e) => {
                    const progress = Math.round((e.loaded / e.total) * 100);
                    setProgress(progress);
                },
            });

            setIsLoading(false);
            return response.data.filePaths.map((filePath) => ({
                senderId,
                receiverId,
                filePath,
            }));
        } catch (err) {
            setIsLoading(false);
            console.error("Error uploading files:", err);
            throw err;
        }
    };

    // Receive messages
    useEffect(() => {
        // if (!socket || !userId || !receiverUID || !orderId) return;

        const payload = {
            senderId: userId,
            receiverId: receiverUID,
            orderId
        };
        socket.emit("single-user-msgs", payload);

        socket.on("user-all-messages", (msg) => setAllMessages(msg));
        socket.on("receive-message", (msg) => {
            setAllMessages((prev) => [...prev, msg]);
            if (msg.senderId !== userId) {
                addNotification({
                    _id: Date.now().toString(),
                    title: "New Message",
                    message: msg.message,
                    type: "message",
                    isRead: false,
                    priority: "medium",
                    orderId: msg.orderId,
                    createdAt: new Date()
                });
            }
        });

        socket.on("file-received", (fileData) => {
            setAllMessages((prev) => [...prev, {
                ...fileData,
                type: "file",
                createdAt: new Date()
            }]);
            if (fileData.senderId !== userId) {
                addNotification({
                    _id: Date.now().toString(),
                    title: "New File",
                    message: "You received a new file",
                    type: "file",
                    isRead: false,
                    priority: "medium",
                    orderId: fileData.orderId,
                    createdAt: new Date()
                });
            }
        });

        return () => {
            socket.off("user-all-messages");
            socket.off("receive-message");
            socket.off("file-received");
        };
    }, [socket, userId, receiverUID, orderId, addNotification]);

    // Typing indicator
    const sendTypingIndicator = () => {
        if (socket && userId && receiverUID && orderId) {
            socket.emit("typing", {
                sender: userId,
                receiver: receiverUID,
                orderId
            });
        }
    };

    // Check if a user is online
    const isUserOnline = (userId) => {
        return onlineUsers.has(userId);
    };

    return (
        <SocketContext.Provider
            value={{
                socket,
                message,
                setMessage,
                handleMessage,
                receiverUID,
                setReceiverUID,
                allMessages,
                status,
                file,
                setFiles,
                preview,
                setPreview,
                isImageModalOpen,
                setIsImageModalOpen,
                bigImage,
                setBigImage,
                orderId,
                setOrderId,
                isLoading,
                progress,
                sendTypingIndicator,
                isUserOnline,
                onlineUsers
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;