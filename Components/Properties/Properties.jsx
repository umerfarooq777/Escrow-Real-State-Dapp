"use client";
import { apartmentsData, housesData } from "@/store/propertiesData";
import { Button, Container, useMediaQuery } from "@mui/material";
import React from "react";
import PropertyCard from "./PropertyCard/PropertyCard";
import AddIcon from '@mui/icons-material/Add';


const Properties = () => {
  const isXsScreen = useMediaQuery("(max-width:640px)");

  return (
    <Container>
      <div className="lg:space-y-7 space-y-5">
        {/* title */}
        <div className="flex justify-between items-center">
          <h1 className="lg:text-3xl sm:text-2xl text-xl font-semibold tracking-wide">
            Discover the Perfect <br />
            Property for You
          </h1>
          <Button
            // onClick={() => router.push('/join-us')}
            variant="outlined"
            color="primary"
            size={isXsScreen ? "small" : "medium"}
            sx={{
              textTransform: "capitalize",
              borderRadius: 0,
              width: { md: "8.3rem", xs: "6rem" },
              whiteSpace: "nowrap",
            }}
          ><AddIcon fontSize='inherit' className="ml-3 " />
            Add Property
          </Button>
        </div>
        {/* Properties Card */}
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-5 sm:grid-cols-2 grid-cols-1">
          {[...apartmentsData, ...housesData].map((apartment) => (
            <PropertyCard key={apartment.id} property={apartment} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Properties;
