import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Box className="w-screen min-h-screen flex flex-row justify-center items-center">
            <Box className="flex flex-col bg-blue-400 gap-[30px] p-[30px] rounded-[10px] items-center">
                <h1 className="text-2xl font-bold text-red-500">Login</h1>
                <p>Welcome back! Please enter your credentials.</p>
                <Box className="flex flex-col gap-[20px] ">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
}