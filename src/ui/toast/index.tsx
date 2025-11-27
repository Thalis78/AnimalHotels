import { useEffect } from "react";
import './styles.css';

interface ToastProps {
    message: string | null;
    variant?: 'success' | 'error';
    duration?: number;
    onClose: () => void;
}

const variants = {
    success: "toast-success",
    error: "toast-error"
};

export const Toast = ({
    message,
    variant = "success",
    duration = 3000,
    onClose,
}: ToastProps) => {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [message, duration, onClose]);

    if (!message) return null;

    return <div className={`toast ${variants[variant]}`}>{message}</div>;
};
