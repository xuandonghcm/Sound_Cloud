import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { useTheme } from '@mui/material/styles';
import { AlertMessageType, CLOSE } from '@/constants/globalConstants';

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

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  messageType: AlertMessageType;
  title: string;
  message: string;

}

const InFoDialog: React.FC<AlertDialogProps> = ({ messageType, title, message, onClose, open }) => {

  // const handleClose = (_event?: object, reason?: string) => {
  //   // Chỉ đóng khi lý do không phải là 'backdropClick'
  //   if (reason !== 'backdropClick') {
  //     setOpen(false);
  //   }
  // };
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        <Button onClick={onClose} color="primary">
          {CLOSE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InFoDialog;
