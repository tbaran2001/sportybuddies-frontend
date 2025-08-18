import {useState, type FormEvent} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLoginMutation} from "../store/api.ts";
import {setToken} from "../store/authSlice.ts";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Stack,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material";

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    const sampleAccounts: { label: string; email: string }[] = [
        { label: 'Account 1', email: 'anna@example.com' },
        { label: 'Account 2', email: 'bartek@example.com' },
        { label: 'Account 3', email: 'celina@example.com' },
        { label: 'Account 4', email: 'dawid@example.com' },
        { label: 'Account 5', email: 'ewa@example.com' },
    ];

    type AuthNavState = { from?: { pathname?: string } };

    const loginAndNavigate = async (emailToUse: string) => {
        try {
            const userData = await login(emailToUse).unwrap();
            dispatch(setToken({ token: userData }));
            setEmail('');
            const from = (location.state as AuthNavState | undefined)?.from?.pathname || '/profiles/me';
            navigate(from, { replace: true });
        } catch (err) {
            console.error('Failed to log in:', err);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await loginAndNavigate(email);
    };

    return (
        <Container maxWidth="sm" sx={{py: {xs: 4, md: 8}}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Card sx={{width: '100%', borderRadius: 3, boxShadow: 6}}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Box>
                                <Typography component="h1" variant="h4" gutterBottom>
                                    Log in
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Enter email address or choose one of the sample accounts below.
                                </Typography>
                            </Box>

                            <Box component="form" onSubmit={handleSubmit} noValidate>
                                <Stack spacing={2}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        type="email"
                                        label="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        autoFocus
                                        fullWidth
                                    />

                                    <CardActions sx={{p: 0}}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={isLoading || !email}
                                            fullWidth
                                            startIcon={isLoading ? <CircularProgress size={18} color="inherit"/> : null}
                                        >
                                            {isLoading ? 'Logging in…' : 'Log in'}
                                        </Button>
                                    </CardActions>
                                </Stack>
                            </Box>

                            <Divider flexItem sx={{my: 1}}/>

                            <Box>
                                <Typography variant="subtitle1" gutterBottom>
                                    Fast login
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    useFlexGap
                                    flexWrap="wrap"
                                >
                                    {sampleAccounts.map(({ label, email }) => (
                                        <Button
                                            key={email}
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                            disabled={isLoading}
                                            onClick={() => loginAndNavigate(email)}
                                            sx={{borderRadius: 999}}
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </Stack>
                                <Typography variant="caption" color="text.secondary" sx={{display: 'block', mt: 1}}>
                                    Each of the above accounts will automatically fill in the email and log you into the demo application.
                                </Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default AuthForm;