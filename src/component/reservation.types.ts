export interface IReservation {
    id: string,
    stay: {
        arrivalDate: string,
        departureDate: string
    },
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    payment: string,
    note: string,
    reminder: true,
    newsletter: true,
    confirm: false,
    room: {
        roomSize: string,
        roomQuantity: number
    },
    addressStreet: {
        streetName: string,
        streetNumber: string
    },
    addressLocation: {
        zipCode: string,
        state: string,
        city: string
    },
    extras: string[],
    tags: [],
}
