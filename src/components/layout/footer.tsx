'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { AppBar, Box, Container, Typography } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useHasMounted } from '@/utils/customHooks';
import { BACKEND_URL } from '@/types/env';
import { GET_TRACK_FOOTER_URL } from '@/constants/endpoints';


export default function BottomAppBar() {
    const theme = useTheme();
    const hasMounted = useHasMounted();

    if (!hasMounted) return (<></>)//fragment
    console.log("check", process.env.NEXT_PUBLIC_BACKEND_URL);
    return (
        <div>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Container>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" }, // Cột trên màn hình nhỏ, hàng trên màn hình lớn
                            alignItems: { xs: "flex-start", md: "center" }, // Căn chỉnh khác nhau dựa trên kích thước
                            justifyContent: { md: "space-between" }, // Dàn đều trên màn hình lớn
                            gap: 2, // Khoảng cách giữa các phần tử
                        }}
                    >
                        {/* Audio Player */}
                        <Box
                            sx={{
                                flex: { xs: 1, md: 4 }, // Chiếm toàn bộ chiều rộng trên màn hình nhỏ, 4/5 trên màn hình lớn
                                minWidth: 0, // Đảm bảo không bị lỗi tràn
                                width: "100%", // Đảm bảo chiếm hết chiều rộng trên màn hình nhỏ
                            }}
                        >
                            <AudioPlayer
                                src={`${BACKEND_URL}${GET_TRACK_FOOTER_URL}`}
                                volume={0.5}
                                style={{
                                    boxShadow: "unset",
                                    background: theme.palette.background.paper, // Lấy màu từ theme
                                }}
                            />
                        </Box>

                        {/* Thông tin */}
                        <Box
                            sx={{
                                flex: { xs: 1, md: 1 }, // Trên màn hình nhỏ 1 dòng riêng, trên màn hình lớn chiếm 1/5
                                display: "flex",
                                flexDirection: "column",
                                alignItems: { xs: "flex-start", md: "flex-end" },
                                justifyContent: "center",
                                minWidth: 0,
                                width: "100%", // Đảm bảo chiếm hết chiều rộng trên màn hình nhỏ
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{ color: theme.palette.text.secondary }}
                            >
                                Xuan Dong
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: theme.palette.text.primary }}
                            >
                                Who am I?
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </AppBar>

        </div>
    );
}
