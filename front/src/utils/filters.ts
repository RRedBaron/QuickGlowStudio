// filters.ts

import { Booking } from '../types/booking'; // Замените на фактический путь к вашему файлу с типами

export const filterBookings = (bookings: Booking[], filters: any): Booking[] => {
    let filtered = [...bookings];

    if (filters.createdAt === 'asc') {
        filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (filters.createdAt === 'desc') {
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (filters.reservedDate === 'asc') {
        filtered = filtered.sort((a, b) => new Date(a.selectedDate) - new Date(b.selectedDate));
    } else if (filters.reservedDate === 'desc') {
        filtered = filtered.sort((a, b) => new Date(b.selectedDate) - new Date(a.selectedDate));
    }

    if (filters.sessionType) {
        filtered = filtered.filter((booking: Booking) => booking.selectedType === filters.sessionType);
    }

    if (filters.price === 'asc') {
        filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.price === 'desc') {
        filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
};
