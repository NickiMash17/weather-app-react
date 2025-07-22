import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './index.css';
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#50e3c2' },
        background: { default: '#f7f9fc' },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});
const root = createRoot(document.getElementById('root'));
root.render(_jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx(App, {})] }));
