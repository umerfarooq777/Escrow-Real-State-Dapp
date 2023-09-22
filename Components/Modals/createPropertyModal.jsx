import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function CreatePropertyModal({ open, scroll, handleClickOpen, handleClose }) {
    // const [open, setOpen] = React.useState(false);
    // const [scroll, setScroll] = React.useState('paper');

    // const handleClickOpen = (scrollType) => () => {
    //     setOpen(true);
    //     setScroll(scrollType);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

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

                    <Box display={'flex'}>

                        <Box width={'50%'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                            >
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Name</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        defaultValue="Composed TextField"
                                        label="Name"
                                    />
                                </FormControl>



                            </DialogContentText>

                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                alignItems: 'center',
                                bgcolor: 'background.paper',
                                overflow: 'hidden',
                                borderRadius: '12px',
                                boxShadow: 3,
                                fontWeight: 'bold',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: { xs: 'center', md: 'flex-start' },
                                    m: 3,
                                    minWidth: { md: 460 },
                                }}
                            >
                                <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
                                    123 Main St, Phoenix AZ
                                </Box>
                                <Box component="span" sx={{ color: 'primary.main', fontSize: 22 }}>
                                    $280,000 — $310,000
                                </Box>
                                <Box
                                    sx={{
                                        mt: 1.5,
                                        p: 0.5,
                                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                        borderRadius: '5px',
                                        color: 'primary.main',
                                        fontWeight: 'medium',
                                        display: 'flex',
                                        fontSize: 12,
                                        alignItems: 'center',
                                        '& svg': {
                                            fontSize: 21,
                                            mr: 0.5,
                                        },
                                    }}
                                >
                                    <ErrorOutlineIcon />
                                    CONFIDENCE SCORE 85%
                                </Box>
                            </Box>
                            <Box
                                component="img"
                                fullWidth
                                sx={{
                                    height: 233,
                                    // width: 350,
                                    // maxHeight: { xs: 233, md: 167 },
                                    // maxWidth: { xs: 350, md: 250 },
                                }}
                                alt="The house from the offer."
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                            />
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
