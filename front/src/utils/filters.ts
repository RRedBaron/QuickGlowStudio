import {Booking} from '../types/booking'; // Замените на фактический путь к вашему файлу с типами

interface Filters {
    createdAt?: 'asc' | 'desc';
    reservedDate?: 'asc' | 'desc';
    sessionType?: string;
    price?: 'asc' | 'desc';
}

export const filterBookings = (bookings: Booking[], filters: Filters): Booking[] => {
    let filtered: Booking[] = [...bookings];

    if (filters.createdAt === 'asc') {
        filtered = filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (filters.createdAt === 'desc') {
        filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    if (filters.reservedDate === 'asc') {
        filtered = filtered.sort((a, b) => new Date(a.selectedDate).getTime() - new Date(b.selectedDate).getTime());
    } else if (filters.reservedDate === 'desc') {
        filtered = filtered.sort((a, b) => new Date(b.selectedDate).getTime() - new Date(a.selectedDate).getTime());
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
