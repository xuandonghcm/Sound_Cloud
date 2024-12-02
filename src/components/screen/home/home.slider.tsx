'use client'
import React from "react";
import Container from "@mui/material/Container";
import { Box, Link, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function HomeSlider() {
    const slides = [
        {
            id: 1,
            title: "Slide 1",
            image: "https://via.placeholder.com/800x400",
            link: "https://example.com",
        },
        {
            id: 2,
            title: "Slide 2",
            image: "https://via.placeholder.com/800x400",
            link: "https://example.com",
        },
        {
            id: 3,
            title: "Slide 3",
            image: "https://via.placeholder.com/800x400",
            link: "https://example.com",
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <Container maxWidth="md">
            <Box sx={{ width: "80%", margin: "0 auto" }}>
                <Slider {...settings}>
                    {slides.map((slide) => (
                        <Box key={slide.id} sx={{ textAlign: "center", p: 2 }}>
                            <Link href={slide.link} target="_blank" underline="none">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                                />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    {slide.title}
                                </Typography>
                            </Link>
                        </Box>
                    ))}
                </Slider>
            </Box>



        </Container>
    );

}