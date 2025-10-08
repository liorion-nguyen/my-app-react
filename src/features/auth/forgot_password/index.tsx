import { useParams } from "react-router-dom";
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
    Paper,
    CircularProgress,
    InputAdornment
} from "@mui/material";
import { LockReset, Email, ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const { id } = useParams();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        setError("");
        setSuccess("");

        if (!email.trim()) {
            setError("Vui lòng nhập địa chỉ email");
            return;
        }

        if (!validateEmail(email)) {
            setError("Địa chỉ email không hợp lệ");
            return;
        }

        setLoading(true);

        try {
            // Giả lập API call với id từ params
            console.log("Forgot password for ID:", id);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSuccess("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư!");
            setEmail("");
        } catch (error) {
            setError("Có lỗi xảy ra. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
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
                        <LockReset sx={{ fontSize: 48, mb: 2 }} />
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            Quên Mật Khẩu
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                            Nhập email để nhận liên kết đặt lại mật khẩu
                        </Typography>
                        {id && (
                            <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
                                ID: {id}
                            </Typography>
                        )}
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
                                    id="email"
                                    label="Địa chỉ email"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color="action" />
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
                                        'Gửi Liên Kết Đặt Lại'
                                    )}
                                </Button>

                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <MuiLink
                                        component={Link}
                                        to="/login"
                                        variant="body2"
                                        sx={{ 
                                            color: 'primary.main', 
                                            textDecoration: 'none',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        <ArrowBack fontSize="small" />
                                        Quay lại đăng nhập
                                    </MuiLink>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Paper>
            </Box>
        </Container>
    );
}