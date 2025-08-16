import {Snackbar, Alert} from '@mui/material';
import type {AlertColor} from '@mui/material';

export interface NotificationState {
    open: boolean;
    message: string;
    severity: AlertColor; // 'success' | 'info' | 'warning' | 'error'
}

interface NotificationSnackbarProps extends NotificationState {
    onClose: () => void;
    autoHideDuration?: number;
}

export const NotificationSnackbar = ({
                                         open,
                                         message,
                                         severity,
                                         onClose,
                                         autoHideDuration = 6000,
                                     }: NotificationSnackbarProps) => (
    <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
    >
        <Alert onClose={onClose} severity={severity} sx={{width: '100%'}}>
            {message}
        </Alert>
    </Snackbar>
);
