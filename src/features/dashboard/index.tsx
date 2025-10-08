import { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Avatar,
    Chip,
    Button,
    Paper,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Divider,
    Backdrop,
    CircularProgress,
    LinearProgress,
    Alert
} from "@mui/material";
import {
    Dashboard as DashboardIcon,
    Person,
    Settings,
    Logout,
    Menu as MenuIcon,
    Notifications,
    Search,
    Refresh
} from "@mui/icons-material";
import { useSearchParams, useNavigate } from "react-router-dom";

interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
        geolocation: {
            lat: string;
            long: string;
        };
    };
    phone: string;
}

export default function Dashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const userId = searchParams.get("id");
    const userName = searchParams.get("name");

    async function getData() {
        setLoading(true);
        setError("");
        
        try {
            const res = await fetch("https://fakestoreapi.com/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            if (!res.ok) {
                throw new Error('Không thể tải dữ liệu người dùng');
            }
            
            const data = await res.json();
            setUsers(data);
        } catch (error: any) {
            setError(error.message || "Có lỗi xảy ra khi tải dữ liệu");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleBackdropOpen = () => {
        setBackdropOpen(true);
    };

    const handleBackdropClose = () => {
        setBackdropOpen(false);
    };

    const handleLogout = () => {
        navigate("/login");
    };

    const handleRefresh = () => {
        getData();
    };

    const drawer = (
        <Box sx={{ width: 250 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Menu
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Người dùng" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Cài đặt" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Đăng xuất" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {/* App Bar */}
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    {userName && (
                        <Chip 
                            label={`Xin chào, ${userName}`} 
                            color="secondary" 
                            variant="outlined"
                            sx={{ mr: 2, color: 'white', borderColor: 'white' }}
                        />
                    )}
                    <IconButton color="inherit">
                        <Notifications />
                    </IconButton>
                    <IconButton color="inherit" onClick={handleRefresh}>
                        <Refresh />
                    </IconButton>
                </Toolbar>
                {loading && <LinearProgress />}
            </AppBar>

            {/* Drawer */}
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                
                <Container maxWidth="lg" sx={{ mt: 2 }}>
                    {/* Welcome Section */}
                    <Paper 
                        sx={{ 
                            p: 3, 
                            mb: 3,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white'
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom>
                            Chào mừng đến với Dashboard!
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            Quản lý và theo dõi thông tin người dùng một cách dễ dàng
                        </Typography>
                        {userId && (
                            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                                User ID: {userId}
                            </Typography>
                        )}
                    </Paper>

                    {/* Error Alert */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
                            {error}
                        </Alert>
                    )}

                    {/* Stats Cards */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
                        <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Tổng người dùng
                                    </Typography>
                                    <Typography variant="h4">
                                        {users.length}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Trực tuyến
                                    </Typography>
                                    <Typography variant="h4" color="success.main">
                                        {Math.floor(users.length * 0.7)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        Hoạt động
                                    </Typography>
                                    <Typography variant="h4" color="primary.main">
                                        {Math.floor(users.length * 0.4)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>

                    {/* Users List */}
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" component="h2">
                                Danh sách người dùng
                            </Typography>
                            <Button 
                                variant="outlined" 
                                onClick={handleBackdropOpen}
                                startIcon={<Search />}
                            >
                                Tìm kiếm
                            </Button>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {users.map((user) => (
                                <Box key={user.id} sx={{ flex: '1 1 300px', minWidth: '280px', maxWidth: '400px' }}>
                                    <Card variant="outlined" sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                    {user.name.firstname.charAt(0).toUpperCase()}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="h6" component="div">
                                                        {user.name.firstname} {user.name.lastname}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        @{user.username}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                📧 {user.email}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                📞 {user.phone}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                📍 {user.address.city}, {user.address.street} {user.address.number}
                                            </Typography>
                                            
                                            <Box sx={{ mt: 2 }}>
                                                <Chip 
                                                    label="Hoạt động" 
                                                    color="success" 
                                                    size="small" 
                                                    variant="outlined"
                                                />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </Box>
                        
                        {users.length === 0 && !loading && (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="body1" color="text.secondary">
                                    Không có dữ liệu người dùng
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Container>
            </Box>

            {/* Backdrop */}
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={backdropOpen}
                onClick={handleBackdropClose}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress color="inherit" />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Đang tìm kiếm...
                    </Typography>
                </Box>
            </Backdrop>
        </Box>
    );
}