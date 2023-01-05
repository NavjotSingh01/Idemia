import { Divider, IconButton, InputBase, Paper, Stack, TextField } from '@mui/material';
import { areDayPropsEqual } from '@mui/x-date-pickers/PickersDay/PickersDay';
import React, { useState, useEffect, useRef } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import ToggleButton from '@mui/material/ToggleButton';
import validator from 'validator';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';


const Item = styled(Paper)(() => ({
    boxShadow: 'none'
}));

const FilterResevation = (props: any) => {

    const [filter, setFilter] = React.useState(
        {
            firstName: '',
            arrivalDate: '',
            roomQuantity: null,
            departureDate: '',
            phone: ' '

        }
    )

    useEffect(() => {

    }, [filter]);





    const handleNameSearch = (e: any) => {
        const value = e.target.value;
        setFilter({
            ...filter, firstName: value
        })
        props.onNameSearch(value);
    }

    const handleContactSearch = (e: any) => {
        const value = e.target.value;

        setFilter({
            ...filter,
            phone: value
        })
        props.onContactSearch(value);
    }

    const handleDateSearch = (value: Dayjs | null) => {


        setFilter({
            ...filter,
            arrivalDate: value?.toISOString() || ''
        });
        props.onDate(value?.toISOString() || '');
    }

    const handleDepartureDate = (value: Dayjs | null) => {

        setFilter({
            ...filter,
            departureDate: value?.toISOString() || ''
        });
        props.onDepartureDate(value?.toISOString() || '');
    }


    const handleRoomSearch = (e: any) => {
        const value = e.target.value;


        setFilter({
            ...filter,
            roomQuantity: value
        })
        props.onRoomSearch(value);
    }





    return (

        <div>
            <Typography sx={{ fontSize: 14, marginTop: '10px', marginBottom: '10px' }} color="text.secondary" >
                Search Reservations by Filters
            </Typography>


            <Stack direction="row" spacing={2}>

                <Item> <OutlinedInput
                    size="small"
                    type="search"
                    placeholder="Search by name"
                    onChange={(e) => handleNameSearch(e)}
                    value={filter.firstName}
                /> &nbsp;&nbsp;
                    <OutlinedInput
                        size="small"
                        type="search"
                        placeholder="Contact"
                        onChange={(e) => handleContactSearch(e)}
                        value={filter.phone}
                    />
                    &nbsp;&nbsp;
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Date of Arrival"
                            inputFormat="MM/DD/YYYY"
                            value={dayjs(filter.arrivalDate)}
                            onChange={(e) => handleDateSearch(e)}
                            renderInput={(params) => <TextField name="arrivalDate" size="small" {...params} variant="outlined" />}
                        /> &nbsp;&nbsp;<DesktopDatePicker
                            label="Date of Departure"
                            inputFormat="MM/DD/YYYY"
                            value={dayjs(filter.departureDate)}
                            onChange={(e) => handleDepartureDate(e)}
                            renderInput={(params) => <TextField size="small" {...params} variant="outlined" />}
                        />

                    </LocalizationProvider>
                </Item>
            </Stack>
        </div>
    )
}


export default FilterResevation;
