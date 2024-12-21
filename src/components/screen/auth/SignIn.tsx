'use client'
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField/TextField';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import IconButton from '@mui/material/IconButton/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl/FormControl';
import Button from '@mui/material/Button/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Divider from '@mui/material/Divider/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import { signIn } from "next-auth/react";
import Link from 'next/link';
import { PATH } from '@/constants/PathConstants';
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
export default function SignInComponent(props: any) {
    const router = useRouter();
    const theme = useTheme();
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

    const [errorUsername, setErrorUsername] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [openMessage, setOpenMessage] = useState<boolean>(false);
    const [resMessage, setResMessage] = useState<string>("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const SignInWithLocal = async () => {
        setIsErrorUsername(false);
        setIsErrorPassword(false);
        setErrorUsername("");
        setErrorPassword("");

        if (!username) {
            setIsErrorUsername(true);
            setErrorUsername("Username is not empty.")
            return;
        }
        if (!password) {
            setIsErrorPassword(true);
            setErrorPassword("Password is not empty.")
            return;
        }
        const res = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false
        })

        if (!res?.error) {
            router.push(PATH.BLANK);
        } else {
            setOpenMessage(true);
            setResMessage(res.error)
        }
    }

    return (
        <Box
            sx={{
                backgroundColor: 'background.signupContainer'
            }}
        >
            <Grid container spacing={2}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh"
                }}>

                <Grid item
                    xs={12}
                    sm={8}
                    md={5}
                    lg={4} sx={{
                        border: '2px solid background.navbar',
                        backgroundColor: 'background.signup',
                        boxShadow: theme.shadows[9],

                    }}>
                    <Grid item sx={{
                        height: '130px', paddingTop: '30px'
                    }}>
                        <Grid item sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Box
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'inline-flex',
                                    border: '2px solid background.navbar',
                                    borderRadius: '50%',
                                    padding: '8px',
                                    backgroundColor: 'background.navbar'
                                }}
                            ><LockIcon fontSize="large" sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }} /></Box>

                        </Grid>
                        <Grid item sx={{
                            display: 'flex', // Sử dụng flexbox
                            justifyContent: 'center', // Căn giữa theo chiều ngang
                            alignItems: 'center', // Căn giữa theo chiều dọc
                        }}>
                            <Typography>Sign In</Typography>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ padding: '10px' }}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="UserName"
                            variant="standard"
                            fullWidth
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            error={isErrorUsername}
                            helperText={errorUsername}
                        />
                    </Grid>
                    <Grid item sx={{ padding: '10px' }} >
                        <FormControl variant="standard" fullWidth>
                            <TextField
                                onChange={(event) => setPassword(event.target.value)}
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                error={isErrorPassword}
                                helperText={errorPassword}

                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{ padding: '10px' }}>
                        <Button variant="contained" size="large" sx={{ width: '100%', backgroundColor: 'background.navbar' }} onClick={() => SignInWithLocal()}>Sign In</Button>
                    </Grid>
                    <Grid item sx={{ padding: '10px' }}>
                        <Divider sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Or Using
                            </Typography>
                        </Divider>
                    </Grid>
                    <Grid item sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="Login with Github"
                            aria-haspopup="true"
                            sx={{
                                padding: '8px',
                                margin: '9px',
                                backgroundColor: 'background.progresswavebottom'
                            }}
                            onClick={() => signIn("github")}
                        >
                            <GitHubIcon fontSize="large" />
                        </IconButton>

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="Login with Github"
                            aria-haspopup="true"
                            sx={{
                                padding: '8px',
                                margin: '9px',
                                backgroundColor: 'background.progresswavebottom'
                            }}
                            onClick={() => signIn("google")}
                        >
                            <GoogleIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                    <Grid item sx={{

                        paddingBottom: '30px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        "> a": {
                            color: 'inherit',
                            textDecoration: "unset"
                        }
                    }}>
                        <Link href={PATH.BLANK} >
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Back To Home
                            </Typography></Link>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                open={openMessage}
                // autoHideDuration={5000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setOpenMessage(false)}
                    severity="error" sx={{ width: '100%' }}>
                    {resMessage}
                </Alert>
            </Snackbar>
        </Box>

    );
}
