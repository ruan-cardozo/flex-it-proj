import { createContext, useContext, ReactNode } from 'react';
import { Toaster, useToastController, Toast, ToastTitle, ToastPosition, useId } from '@fluentui/react-components';

interface ToastContextProps {
    showToast: (message: string, intent?: "success" | "error" | "warning" | "info", position?: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const toasterId = useId('toaster');
    const { dispatchToast } = useToastController(toasterId);

    const showToast = (message: string, intent: "success" | "error" | "warning" | "info" = "success", position: ToastPosition = "bottom-end") => {
        dispatchToast(
            <Toast>
                <ToastTitle>{message}</ToastTitle>
            </Toast>,
            { position, intent }
        );
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toaster toasterId={toasterId} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};