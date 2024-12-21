'use client'
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Link, Typography, Divider, Button } from "@mui/material";
import Slider, { Settings } from "react-slick";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import Image from "next/image";
import { BACKEND_IMAGES_URL } from "@/constants/PathConstants";
import { PATH } from "@/constants/PathConstants";

interface IProps {
    data: ITrackTopResponse[]
    title: string
}

const HomeSlider = (props: IProps) => {
    const theme = useTheme();
    const { data, title } = props;

    const NextArrow = (props: any) => (
        <Button
            variant="contained"
            color="inherit"
            onClick={props.onClick}
            sx={{
                position: "absolute",
                right: 0,
                top: "25%",
                zIndex: 2,
                minWidth: 30,
                width: 35,
            }}
        >
            <ChevronRightIcon />
        </Button>
    );

    const PrevArrow = (props: any) => (
        <Button
            variant="contained"
            color="inherit"
            onClick={props.onClick}
            sx={{
                position: "absolute",
                left: 0,
                top: "25%",
                zIndex: 2,
                minWidth: 30,
                width: 35,
            }}
        >
            <ChevronLeftIcon />
        </Button>
    );

    const settings: Settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: "0",
                },
            },
        ],
    };

    return (
        <Box
            sx={{
                marginTop: "25px",
                ".tracks": {
                    padding: "0 10px",
                    textAlign: "center",
                },
                ".slick-slide": {
                    display: "flex !important",
                    justifyContent: "center",
                },
                "h3": {
                    border: "1px solid ",
                    borderColor: theme.palette.text.secondary,
                    padding: "20px",
                    height: "200px",
                },
            }}
        >
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>

            <Slider {...settings}>
                {data.map(track => (
                    <div className="tracks" key={track._id}>
                        <Link href={PATH.TRACK(track._id, track.trackUrl)}>
                            <Image
                                src={`${BACKEND_IMAGES_URL}${track.imgUrl}`}
                                alt={`${track.title}`}
                                width={200}  // Chiều rộng mặc định của hình ảnh
                                height={200} // Chiều cao mặc định của hình ảnh
                            />
                        </Link>
                        <Link href={PATH.TRACK(track._id, track.trackUrl)}>
                            <Typography variant="h6" gutterBottom>{track.title}</Typography>
                        </Link>
                        <Typography variant="subtitle1" gutterBottom>{track.description}</Typography>
                    </div>
                ))}
            </Slider>
            <Divider />
        </Box>
    );
}

export default HomeSlider;
