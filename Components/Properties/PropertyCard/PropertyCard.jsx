"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import Image from "next/image";
import { Bathtub, Hotel, LocationOn, SquareFoot } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { cardPlaceholderImgData } from "@/store/propertiesData";

const PropertyCard = ({
  property: { id, title, location, img, price, bedrooms, bathrooms, roomSize },
  dummy,
}) => {

    // console.log(dummy);
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <Card

        onClick={() => {
          if (dummy==undefined) {
            router.push(`/properties/${id}`);
          }
        }}
        sx={{ maxWidth: 330, width: "100%" }}
      >
        <CardActionArea>
          {/* Image */}
          <div className="relative w-full lg:h-[12rem] h-[10rem]">
            <Image
              fill
              sizes={"100vh"}
              className="bg-cover bg-top"
              alt={title}
              loading="lazy"
              placeholder="blur"
              blurDataURL={cardPlaceholderImgData}
              src={img}
            />
          </div>
          <CardContent>
            <div className="space-y-3.5">
              <div className="space-y-2.5">
                {/* Price */}
                <h4 className="text-blue-600 font-semibold text-l">
                  {/* {title} */}
                  {title?title.length>30?title.slice(0,20)+"...":title:"----"}
                </h4>
              </div>


              <div className="space-y-2.5">
                {/* Price */}
                <h6 className="text-blue-400 font-semibold text-md">
                  $ {price.string}
                </h6>
              </div>

              {/* Address */}
              <p className=" m-0 lg:text-base text-gray-800 text-md">
                <LocationOn
                  color="action"
                  className="mb-0.5"
                  fontSize="inherit"
                />{" "}
                {location}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2">
                {/* Number of Bed Room */}
                <div className="flex items-center text-md text-gray-500 space-x-1.5">
                  {/* Icon*/}
                  <Hotel fontSize="inherit" />

                  {/* Title */}
                  <h3>{bedrooms}</h3>
                </div>

                {/* Number of Bath Room */}
                <div className="flex text-md items-center text-gray-500 space-x-1.5">
                  {/* Icon*/}
                  <Bathtub fontSize="inherit" />
                  {/* Title */}
                  <h3>{bathrooms} </h3>
                </div>
              </div>
              <div className="grid grid-cols-2">
                {/* Room Size */}
                <div className="flex text-md items-center text-gray-500 space-x-0.5">
                  {/* Icon*/}
                  <SquareFoot fontSize="inherit" />
                  {/* Title */}
                  <h3>{roomSize}</h3>
                </div>

                {/* Number of Bath Room */}
                <div className="flex text-md items-center text-gray-500 space-x-1.5">
                  {/* Icon*/}
                  <Bathtub fontSize="inherit" />
                  {/* Title */}
                  <h3>{bathrooms}</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default PropertyCard;
