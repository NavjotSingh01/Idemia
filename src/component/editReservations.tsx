import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { IReservation } from './reservation.types';

import Dialog, { DialogProps } from '@mui/material/Dialog';

import Chip from '@mui/material/Chip';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { Theme, useTheme } from '@mui/material/styles';

import { saveJson } from '../crud';
import { PropaneSharp } from '@mui/icons-material';




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Extras = [
    "extraBreakfast",
    "extraTV",
    "extraWiFi",
    "extraParking",
    "extraBalcony"
];

function getStyles(extra: string, re: string[], theme: Theme) {
    return {
        fontWeight:
            re.indexOf(extra) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const EditReservation = (props: any) => {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    const [rdata, setRdata] = React.useState(props.bookingdetails)

    const CHARACTER_LIMIT = 20;

    const [state, setState] = React.useState({
        gilad: true,
        jason: true,
        antoine: true,
    });
    const handleChange = (event: SelectChangeEvent<typeof rdata.extras>) => {
        const { target: { value }, } = event;
        setRdata({
            ...rdata,
            extras: (typeof value === 'string' ? value.split(',') : value)

        })
    };
    const handleDateChange = (key: 'arrivalDate' | 'departureDate', value: Dayjs | null) => {
        setRdata({
            ...rdata,
            stay: {
                ...rdata.stay,
                [key]: value?.toISOString() || '',
            }

        });
    };
    const [values, setValues] = React.useState({
        name: "Navjot"
    });
    const handleRoomChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setRdata({
            ...rdata,
            room: {
                ...rdata.room,
                [name]: value,
            }

        });
    };
    const handleDetailsChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setRdata({
            ...rdata,
            [name]: value,
        });
    };
    const handleStreetChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setRdata({
            ...rdata,
            addressStreet: {
                ...rdata.addressStreet,
                [name]: value,
            }


        });
    };
    const handleLocationChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setRdata({
            ...rdata,
            addressLocation: {
                ...rdata.addressLocation,
                [name]: value,
            }


        });
    };
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRdata({
            ...rdata,
            [event.target.name]: event.target.checked,
        });
    };

    const handleDelete = () => {
        console.info('You clicked the delete tag.');
    };







    const PinkSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: pink[600],
            '&:hover': {
                backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: pink[600],
        },
    }));

    const switchLabel = { inputProps: { 'aria-label': 'Color switch demo' } };


    const handleSubmit = (event: any) => {
        event.preventDefault()
        console.log(rdata);

        let filterReservation = [...props.reservations].filter((_, i) => i !== props.index);
        console.log(filterReservation);
        let updatereservation = [...filterReservation, rdata]
        console.log(updatereservation);
        props.setReservations(updatereservation)
        saveJson(updatereservation);

    };


    return (
        <div>
            <Button variant="text" size="small" onClick={handleOpen}>Edit</Button>
            <Dialog
                fullWidth={true}
                maxWidth='md'
                open={open}
                onClose={handleClose}
            // aria-labelledby="modal-modal-title"
            // aria-describedby="modal-modal-description"
            >
                <form onSubmit={handleSubmit}>

                    <FormControl variant="standard" sx={{ m: 1, width: 500 }} >

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DesktopDatePicker
                                    label="Date of Arrival"
                                    inputFormat="MM/DD/YYYY"
                                    value={dayjs(rdata.stay.arrivalDate)}
                                    onChange={(selectedDate) => handleDateChange('arrivalDate', selectedDate)}
                                    renderInput={(params) => <TextField name="arrivalDate" size="small" {...params} variant="standard" />}
                                />
                                <DesktopDatePicker
                                    label="Date of Departure"
                                    inputFormat="MM/DD/YYYY"
                                    value={dayjs(rdata.stay.departureDate)}
                                    onChange={(selectedDate) => handleDateChange('departureDate', selectedDate)}
                                    renderInput={(params) => <TextField size="small" {...params} variant="standard" />}
                                />
                            </LocalizationProvider>


                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}
                        >

                            <TextField size="small" value={rdata.room['roomSize']} onChange={handleRoomChange} name="roomSize" id="standard-basic" label="Room Size" variant="standard" helperText="Choose a room type" />
                            <TextField size="small" value={rdata.room['roomQuantity']} onChange={handleRoomChange} name="roomQuantity" id="standard-basic" label="Room Quantity" variant="standard" helperText="Maximum: 5" />
                        </Box>

                        <Box sx={{

                            alignItems: 'center',
                            '& > :not(style)': { m: 1 },
                        }}>

                            <TextField size="small" id="standard-basic" label="First Name" variant="standard" inputProps={{
                                maxLength: CHARACTER_LIMIT
                            }}
                                value={rdata.firstName}
                                helperText={`${rdata.firstName.length}/${CHARACTER_LIMIT}`}
                                onChange={handleDetailsChange} name="firstName" /> <br />
                            <TextField size="small" value={rdata.lastName} onChange={handleDetailsChange} name="lastName" id="standard-basic" label="Last Name" variant="standard" /> <br />
                            <TextField size="small" value={rdata.email} onChange={handleDetailsChange} name="email" id="standard-basic" label="E-Mail" variant="standard" /><br />
                            <TextField size="small" value={rdata.phone} onChange={handleDetailsChange} name="phone" id="standard-basic" label="Phone Number" variant="standard" helperText="Add your Country Code first" />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}
                        >
                            <TextField size="small" id="standard-basic" value={rdata.addressStreet['streetName']} onChange={handleStreetChange} name="streetName" label="Street Name" variant="standard" />
                            <TextField size="small" id="standard-basic" value={rdata.addressStreet['streetNumber']} onChange={handleStreetChange} name="streetNumber" label="Street Number" variant="standard" />er

                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '& > :not(style)': { m: 1 },
                        }}>
                            <TextField size="small" value={rdata.addressLocation['zipCode']} onChange={handleLocationChange} name="zipCode" id="standard-basic" label="ZipCode" variant="standard" />
                            <TextField size="small" value={rdata.addressLocation['state']} onChange={handleLocationChange} name="state" id="standard-basic" label="State" variant="standard" />


                            <TextField size="small" value={rdata.addressLocation['city']} onChange={handleLocationChange} name="city" id="standard-basic" label="City" variant="standard" />


                        </Box><br />

                        <InputLabel sx={{ position: "relative" }} size="small" id="demo-multiple-name-label" variant="standard">Extras</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={rdata.extras}
                            onChange={handleChange}
                            sx={{ m: 1, maxWidth: 250 }}
                            MenuProps={MenuProps}
                        >
                            {Extras.map((extra) => (
                                <MenuItem
                                    key={extra}
                                    value={extra}
                                    style={getStyles(extra, rdata.extras, theme)}
                                >
                                    {extra}
                                </MenuItem>
                            ))}
                        </Select>
                        <br />


                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            // name="row-radio-buttons-group"
                            value={rdata.payment} onChange={handleDetailsChange} name="payment"
                        >
                            <FormControlLabel value="credit card" control={<Radio />} label="Credit Card" />
                            <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
                            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                            <FormControlLabel
                                value="bitcoin"
                                control={<Radio />}
                                label="Bitcoin"
                            />
                        </RadioGroup>

                        <TextField
                            id="standard-multiline-static"
                            label="Personal Note"
                            multiline
                            sx={{ m: 1, maxWidth: 250 }}
                            rows={3}
                            variant="standard"
                            value={rdata.note} onChange={handleDetailsChange} name="note"
                        /><br />

                        <Stack direction="row" spacing={1}>
                            <Chip label="Deletable" onDelete={handleDelete} />
                            <Chip label="Deletable" onDelete={handleDelete} />
                        </Stack><br />

                        <FormGroup>
                            <FormControlLabel
                                control={
                                    // <Switch checked={state.gilad} onChange={handleSwitchChange} name="gilad" />
                                    <PinkSwitch {...switchLabel} checked={rdata.reminder} name="reminder" onChange={handleSwitchChange} />
                                }
                                label="Send me a reminder"
                            />
                            <FormControlLabel
                                control={
                                    <PinkSwitch {...switchLabel} checked={rdata.newsletter} name="newsletter" onChange={handleSwitchChange} />
                                    // <Switch checked={state.jason} onChange={handleSwitchChange} name="jason" />
                                }
                                label="Subscribe to newsletter"
                            />
                            <FormControlLabel control={<Checkbox checked={rdata.confirm} name="confirm" onChange={handleSwitchChange} />} label="I confirm the information given above" />

                        </FormGroup>

                        <Button variant="outlined" size="small" type="submit" >Update Booking</Button>

                    </FormControl>
                </form>


            </Dialog>
        </div>
    )
}

export default EditReservation;