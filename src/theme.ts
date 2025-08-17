import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#9eddb7',
            contrastText: '#050d08',
        },
        secondary: {
            main: '#2a7a68',
            contrastText: '#050d08',
        },
        divider: '#52c3b3',
        text: {
            primary: 'rgb(219, 243, 228)',
            secondary: 'rgba(219, 243, 228, 0.6)',
            disabled: 'rgba(219, 243, 228, 0.38)',
        },
        background: {
            default: '#050d08',
        },
    },
    typography: {
        fontFamily: [
            'system-ui',
            'Avenir',
            'Helvetica',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)',
                },
            },
        },
    },
});

export default theme;