// src/components/ErrorMessage.js
import { Alert } from '@mui/material';

const ErrorMessage = ({ message }) => (
  <Alert severity="error">{message}</Alert>
);

export default ErrorMessage;