"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { AlertMessageType, AlertType } from '@/constants/globalConstants';
import InFoDialog from '@/components/common/dialog/InFoDialog';
import ConfirmDialog from '@/components/common/dialog/ConfirmDialog';


interface AlertDialogState {
    title: string;
    message: string;
    messageType: AlertMessageType;
    alertType: AlertType;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmLabel?: string;
    cancelLabel?: string;

}


interface AlertDialogContextType {
    showAlertDialog: (config: AlertDialogState) => void;
    hideAlertDialog: () => void;
}


const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);
export const AlertDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [dialogState, setDialogState] = useState<AlertDialogState | null>(null);

    const showAlertDialog = (config: AlertDialogState) => {
        setDialogState(config);
        setOpen(true);
    };

    const hideAlertDialog = (_event?: object, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
            setDialogState(null);
        }

    };

    const renderDialog = () => {
        if (!dialogState) return null;

        switch (dialogState.alertType) {
            case AlertType.Info:
                return <InFoDialog
                    open={open}
                    {...dialogState}
                    onClose={hideAlertDialog} />;
            case AlertType.Confirm:
                return (
                    <ConfirmDialog
                        open={open}
                        {...dialogState}
                        onConfirm={() => {
                            dialogState.onConfirm?.();
                            hideAlertDialog();
                        }}
                        onCancel={() => {
                            dialogState.onCancel?.();
                            hideAlertDialog();
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <AlertDialogContext.Provider value={{ showAlertDialog, hideAlertDialog }}>
            {children}
            {open && renderDialog()}
        </AlertDialogContext.Provider>
    );
};

export const useAlertDialog = () => {
    const context = useContext(AlertDialogContext);
    if (!context) {
        throw new Error('useAlertDialog phải được sử dụng bên trong AlertDialogProvider');
    }
    return context;
};