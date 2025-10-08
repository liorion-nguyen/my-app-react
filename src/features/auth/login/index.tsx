import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
    Link as MuiLink,
    Alert,
    IconButton,
    InputAdornment,
    Divider,
    Paper
} from "@mui/material";
import { Visibility, VisibilityOff, Login as LoginIcon, Home } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    function handleClick() {
        if (!username.trim() || !password.trim()) {
            setError("Vui lòng điền đầy đủ thông tin");
            return;
        }
        setError("");
        console.log(username, password);
        // Thêm logic đăng nhập ở đây
    }

    useEffect(() => {
        if (username.length > 6 && password.length > 6) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [username, password]);

    const navigate = useNavigate();

    function handleHome() {
        navigate("/?id=123&name=abc_121312321");
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: 4
                }}
                className="flex flex-col justify-center py-4 min-h-screen"
            >
                <Paper
                    elevation={8}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white'
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <LoginIcon sx={{ fontSize: 48, mb: 2 }} />
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Đăng Nhập
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                            Chào mừng bạn trở lại!
                        </Typography>
                    </Box>

                    <Card sx={{ borderRadius: 2 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box component="form" sx={{ mt: 1 }}>
                                {error && (
                                    <Alert severity="error" sx={{ mb: 2 }}>
                                        {error}
                                    </Alert>
                                )}
                                
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Tên đăng nhập"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleTogglePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ mb: 3 }}
                                />
                                
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    disabled={isValid}
                                    onClick={handleClick}
                                    sx={{
                                        mt: 1,
                                        mb: 2,
                                        py: 1.5,
                                        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
                                        }
                                    }}
                                >
                                    Đăng Nhập
                                </Button>

                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <MuiLink
                                        component={Link}
                                        to="/forgot-password/132"
                                        variant="body2"
                                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                                    >
                                        Quên mật khẩu?
                                    </MuiLink>
                                </Box>

                                <Divider sx={{ my: 3 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        hoặc
                                    </Typography>
                                </Divider>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Button
                                        component={Link}
                                        to="/signup"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ py: 1.5 }}
                                    >
                                        Tạo tài khoản mới
                                    </Button>
                                    
                                    <Button
                                        variant="text"
                                        startIcon={<Home />}
                                        onClick={handleHome}
                                        fullWidth
                                        sx={{ py: 1 }}
                                    >
                                        Về trang chủ
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Paper>
            </Box>
        </Container>
    );
}  