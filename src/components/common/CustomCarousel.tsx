import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface ICustomCardProp {
    url: string
}
const CustomCarousel = (prop: ICustomCardProp) => {
    const { url } = prop;
    return (
        <Card>
            <CardMedia component="img" image={url} />
        </Card>
    );
};

export default CustomCarousel;