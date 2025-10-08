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
    Paper,
    CircularProgress
} from "@mui/material";
import { 
    Visibility, 
    VisibilityOff, 
    PersonAdd, 
    Email, 
    Person, 
    Lock 
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const validateForm = () => {
        const newErrors = {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: ""
        };

        if (!fullname.trim()) {
            newErrors.fullname = "Họ tên không được để trống";
        } else if (fullname.trim().length < 2) {
            newErrors.fullname = "Họ tên phải có ít nhất 2 ký tự";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "Email không được để trống";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!password) {
            newErrors.password = "Mật khẩu không được để trống";
        } else if (password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    };

    const handleSubmit = async() => {
        setError("");
        setSuccess("");
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        try {
            const user = {
                fullName: fullname,
                email: email,
                password: password,
            };
            
            const response = await fetch("https://l-edu.koyeb.app/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                setSuccess("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");
                // Reset form
                setFullname("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Đăng ký thất bại. Vui lòng thử lại!");
            }
        } catch (error) {
            setError("Có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng và thử lại!");
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                        <PersonAdd sx={{ fontSize: 48, mb: 2 }} />
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Đăng Ký
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                            Tạo tài khoản mới để bắt đầu!
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
                                
                                {success && (
                                    <Alert severity="success" sx={{ mb: 2 }}>
                                        {success}
                                    </Alert>
                                )}
                                
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fullname"
                                    label="Họ và tên"
                                    name="fullname"
                                    autoComplete="name"
                                    autoFocus
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    error={!!errors.fullname}
                                    helperText={errors.fullname}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ mb: 2 }}
                                />
                                
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Địa chỉ email"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
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
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock color="action" />
                                            </InputAdornment>
                                        ),
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
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Xác nhận mật khẩu"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={handleToggleConfirmPasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                                    onClick={handleSubmit}
                                    disabled={loading}
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
                                    {loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        'Đăng Ký'
                                    )}
                                </Button>

                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Đã có tài khoản?{' '}
                                        <MuiLink
                                            component={Link}
                                            to="/login"
                                            variant="body2"
                                            sx={{ color: 'primary.main', textDecoration: 'none' }}
                                        >
                                            Đăng nhập ngay
                                        </MuiLink>
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Paper>
            </Box>
        </Container>
    );
}