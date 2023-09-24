import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PropertyCard from "../Properties/PropertyCard/PropertyCard";

import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { styled } from '@mui/material/styles';
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
// const infuraProjectId = "my key"; //IPFS APIKEY Infura
// const infuraProjectSecret = "my key"; //IPFS API Key Secret Infura
// const INFURA_API_KEY = "39b485b0240346aea40ca9a9d639e7b1"; //INFURA API KEY polygon
const infuraProjectId = "2QO8j6ByOSzgN1kGA3kMvizsAwI"; //IPFS APIKEY Infura
const infuraProjectSecret = "775a10671a6615ead6010a75bc9321ce"; //IPFS API Key Secret Infura
const INFURA_API_KEY = "9cb128774f4b4f5797fc40a6ff71eded"; //INFURA API KEY Web3API

const ipfs = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001", //IPFS API Endpoint On Infura
  headers: {
    authorization: `Basic ${Buffer.from(
      `${infuraProjectId}:${infuraProjectSecret}`
    ).toString("base64")}`,
  },
});

// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }); // Initialize IPFS client

export default function CreatePropertyModal({
  open,
  scroll,
  handleClickOpen,
  handleClose,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageCID, setImageCID] = useState("");
  const [nftURI, setNFTURI] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Upload the image to IPFS
    let imageCID;
    try {
        console.log(imageFile);
      const imageBuffer = await imageFile.arrayBuffer();
      const imageResult = await ipfs.add(imageBuffer);
      console.log(imageResult);
      imageCID = imageResult.path;

      setImageCID(imageCID);
    } catch (error) {
      console.error("Error uploading image to IPFS:", error);
      return;
    }

    // Step 2: Create NFT URI JSON data
    const nftData = {
      name,
      description,
      image: `https://ipfs.io/ipfs/${imageCID}`, // IPFS gateway URL
    };

    // Step 3: Upload NFT data to IPFS
    try {
      const nftDataBuffer = Buffer.from(JSON.stringify(nftData));
      const nftDataResult = await ipfs.add(nftDataBuffer);
      const nftDataCID = nftDataResult.path;

      // Step 4: Set the NFT URI
      const nftURI = `https://ipfs.io/ipfs/${nftDataCID}`; // IPFS gateway URL
      console.log(nftURI);
      setNFTURI(nftURI);
    } catch (error) {
      console.error("Error uploading NFT data to IPFS:", error);
    }
  };

  // const [open, setOpen] = React.useState(false);
  // const [scroll, setScroll] = React.useState('paper');

  // const handleClickOpen = (scrollType) => () => {
  //     setOpen(true);
  //     setScroll(scrollType);
  // };

  // const handleClose = () => {
  //     setOpen(false);
  // };

  let dummyApartment = {
    id: 0,
    location: "City, Country",
    title: "[ Title Here ]dgdssgsdgdsgsddddddddgdddddddddd",
    price: { int: 20000, string: "20,000" },
    bedrooms: 3,
    type: "minimalistic",
    bathrooms: 2,
    roomSize: "10X16m",
    description:
      "Experience luxury living in this spacious apartment located in the heart of Dhaka. With 3 bedrooms, 2 bathrooms, and rooms sized at 10X16m, it offers a comfortable and convenient lifestyle.",
    img: "/apartments/Rectangle 14.png",
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleCreateNFT = async () => {
    await createNFT(formInput);

    // setSubmitAttempted(true);
    // if (!formInput.name || !formInput.price) {
    //   console.error('Please fill in all required fields');
    // } else if (!fileUrl) {
    //   setFileInputValidation(true);
    //   console.error('Please select an image');
    // } else {
    //   setIsLoading(true);
    //   setFileInputValidation(false);
    //   console.log(formInput, fileUrl);
    //   setIsLoading(false);
    // }
  };

  return (
    <div>
      {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
            <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        // onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Add Property</DialogTitle>
        <DialogContent dividers>
          <Box display={"flex"}>
            <Box width={"60%"}>
              <Box
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <InputLabel htmlFor="component-outlined">Name</InputLabel>
                    <OutlinedInput
                      id="component-outlined"
                    //   defaultValue="Composed TextField"
                      label="Name"
                      type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="component-outlined">
                      Description
                    </InputLabel>
                    <OutlinedInput
                      id="component-outlined"
                    //   defaultValue="Composed TextField"
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </FormControl>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    
                  >
                    Upload file
                    <VisuallyHiddenInput type="file"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        required/>
                  </Button>
                  <Button type="submit">Submit</Button>
                </form>

                <div>
                  <h1>Create NFT</h1>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>Name:</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label>Description:</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label>Image:</label>
                      <input
                        type="file"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        required
                      />
                    </div>
                    <button type="submit">Create NFT</button>
                  </form>
                  {nftURI && (
                    <div>
                      <h2>NFT URI:</h2>
                      <p>{nftURI}</p>
                    </div>
                  )}
                </div>
              </Box>
            </Box>
            <Box width={"40%"} className="flex justify-end items-center">
              <PropertyCard key="0" property={dummyApartment} dummy="true" />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
