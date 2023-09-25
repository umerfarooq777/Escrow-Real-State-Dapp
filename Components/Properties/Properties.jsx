"use client";
import { apartmentsData, housesData } from "@/store/propertiesData";
import { Button, Container, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import PropertyCard from "./PropertyCard/PropertyCard";
import AddIcon from '@mui/icons-material/Add';
import CreatePropertyModal from "../Modals/createPropertyModal";
import CreatePropertyModal2 from "../Modals/createPropertyModal2";


const Properties = () => {
  const isXsScreen = useMediaQuery("(max-width:640px)");

  //========================================MODAL

  const [open, setOpen] = useState(true);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
  //           <Button onClick={handleClickOpen('body')}>scroll=body</Button>

  //========================================
  return (
    <Container>
      <CreatePropertyModal2 />
      {/* <CreatePropertyModal open={open} scroll={scroll} handleClickOpen={handleClickOpen} handleClose={handleClose} /> */}
      <div className="lg:space-y-7 space-y-5" >
        {/* title */}
        <div className="flex justify-between items-center">
          <h1 className="lg:text-3xl sm:text-2xl text-xl font-semibold tracking-wide">
            Discover the Perfect <br />
            Property for You
          </h1>
          <Button
            onClick={handleClickOpen('paper')}
            variant="outlined"
            color="primary"
            size={isXsScreen ? "small" : "medium"}
            sx={{
              textTransform: "capitalize",
              borderRadius: 1,
              width: { md: "8.3rem", xs: "9rem" },
              whiteSpace: "nowrap",
            }}
          ><AddIcon fontSize='inherit' className="ml-2 " />
            Add Property
          </Button>
        </div>
        {/* Properties Card */}
        <div className="grid xl:grid-cols-4 lg:grid-cols-4 gap-x-5 gap-y-5 sm:grid-cols-2 grid-cols-1">
          {[...apartmentsData, ...housesData].map((apartment) => (
            <PropertyCard key={apartment.id} property={apartment} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Properties;
