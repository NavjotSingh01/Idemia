import React, { useState, useEffect } from 'react';
import Data from "../reservations.json";
import BookReservation from "../component/bookReservation";
import EditReservation from '../component/editReservations';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Theme, styled } from '@mui/material/styles';
import moment from "moment";
import { saveJson } from '../crud';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FilterResevation from '../component/Filter/filterReservation';





const Master = () => {

    const [reservations, setReservations] = useState(Data);
    const [source, setSource] = useState(Data);
    console.log(reservations)

    useEffect(() => {
    }, [reservations]);

    const deleteReservation = (key: any) => {

        let filterReservation = reservations.filter((_, i) => i !== key);
        setReservations(filterReservation);

        saveJson(filterReservation)
    }

    const Namehandler = (txt: string) => {

        const filterList: any = source.length && source.filter((item: any) => {
            return item.firstName.toLowerCase().includes(txt)
        });
        setReservations(filterList);
    }

    const Roomhandler = (Quantity: number) => {

        const filterList: any = source.length && source.filter((item: any) => {
            return item.room.roomQuantity == Quantity
        });
        setReservations(filterList)
    }

    const contactHandler = (phone: string) => {
        const filterList: any = source.length && source.filter((item: any) => {
            return item.phone.includes(phone)
        });
        setReservations(filterList)
    }

    const datehanlder = (date: string) => {
        const filterList: any = source.length && source.filter((item: any) => {
            return item.stay.arrivalDate.includes(date)
        });
        setReservations(filterList);

    }

    const departureDatehandler = (date: string) => {
        const filterList: any = source.length && source.filter((item: any) => {
            return item.stay.departureDate.includes(date);
        });
        setReservations(filterList);

    }

    return (

        <div className="reservation" style={{ margin: 30 }}>
            RESERVATION SYSTEM - IDEMIA<br /><br />

            <FilterResevation reservations={reservations} source={source} onContactSearch={(e: any) => contactHandler(e)} onDepartureDate={(e: any) => departureDatehandler(e)} onRoomSearch={(e: number) => Roomhandler(e)} onNameSearch={(e: any) => Namehandler(e)} onDate={(e: any) => datehanlder(e)} />
            <br />
            <br />
            <br />
            <br />

            <BookReservation reservations={reservations} setReservations={setReservations} />

            <br />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Travellers</TableCell>
                            <TableCell  >Check In - Check Out</TableCell>
                            <TableCell >Room type</TableCell>
                            <TableCell >Contact</TableCell>
                            <TableCell >Payment</TableCell>
                            <TableCell >Address</TableCell>
                            <TableCell >Note</TableCell>
                            <TableCell>Edit Booking</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations ? reservations.map((reserve: any, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {reserve.firstName} &nbsp; {reserve.lastName}
                                </TableCell>
                                <TableCell padding='none'  >{moment(reserve.stay.arrivalDate).toString().slice(0, 16)} &nbsp; - &nbsp; {moment(reserve.stay.departureDate).toString().slice(0, 16)}</TableCell>
                                <TableCell padding='none' >{reserve.room["roomSize"]} - {reserve.room["roomQuantity"]} Persons</TableCell>
                                <TableCell padding='none' >{reserve.phone}<br />{reserve.email}</TableCell>
                                <TableCell padding='none' >{reserve.payment}</TableCell>
                                <TableCell padding='none' >{reserve.addressStreet["streetNumber"]} - {reserve.addressStreet["streetName"]}<br />{reserve.addressLocation["zipCode"]} - {reserve.addressLocation["state"]} - {reserve.addressLocation["city"]} </TableCell>
                                <TableCell padding='none' >{reserve.note}</TableCell>
                                <TableCell padding='none' sx={{ margin: 10 }}><EditReservation bookingdetails={reserve} index={index} reservations={reservations} setReservations={setReservations} />


                                    <IconButton aria-label="delete" size="large" onClick={() => deleteReservation(index)}>
                                        <DeleteIcon />
                                    </IconButton>



                                </TableCell>

                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
};

export default Master;
