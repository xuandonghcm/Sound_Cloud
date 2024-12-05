import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, Slide, } from '@mui/material';
import { AlertMessageType, CANCEL, CONFIRM } from '@/constants/globalConstants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { TransitionProps } from '@mui/material/transitions';

interface DialogConfirmProps {
  open: boolean;
  messageType: AlertMessageType;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

const AlertIcons: Record<AlertMessageType, React.ReactNode> = {
  success: <CheckCircleIcon color="success" fontSize="large" />,
  info: <InfoIcon color="info" fontSize="large" />,
  error: <ErrorIcon color="error" fontSize="large" />,
  warning: <WarningIcon color="warning" fontSize="large" />,
};

// Hiệu ứng Slide
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ConfirmDialog: React.FC<DialogConfirmProps> = ({
  open,
  messageType,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = CONFIRM,
  cancelLabel = CANCEL,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiDialog-paper': {
          width: '600px',
          maxWidth: '600px',
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <Box display="flex" alignItems="center" gap={2}>
          {AlertIcons[messageType]}
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" id="alert-dialog-description">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm} color="primary">
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
