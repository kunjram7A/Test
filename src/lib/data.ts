import type { Listing, Helpline, TransportRoute } from './types';

// The data from this file has been migrated to Firestore.
// The pages now fetch data directly from the database.
// This file can be removed in the future if no longer needed.

export const accommodationListings: Listing[] = [
    {
        id: '1',
        title: 'Modern Student PG',
        type: 'PG',
        rating: 4.5,
        imageUrl: 'https://picsum.photos/seed/acc1/600/400',
        imageHint: 'modern apartment',
        price: '₹8,000/month',
        gender: 'Boys',
        category: 'accommodations',
    },
    {
        id: '2',
        title: 'Sunrise Ladies Hostel',
        type: 'Hostel',
        rating: 4.2,
        imageUrl: 'https://picsum.photos/seed/acc2/600/400',
        imageHint: 'hostel room',
        price: '₹6,500/month',
        gender: 'Girls',
        category: 'accommodations',
    },
    {
        id: '3',
        title: 'University Co-living',
        type: 'PG',
        rating: 4.8,
        imageUrl: 'https://picsum.photos/seed/acc3/600/400',
        imageHint: 'student room',
        price: '₹9,000/month',
        gender: 'Co-ed',
        category: 'accommodations',
    },
];

export const foodListings: Listing[] = [
    {
        id: '4',
        title: 'The Scholar\'s Cafe',
        type: 'Restaurant',
        rating: 4.6,
        imageUrl: 'https://picsum.photos/seed/food1/600/400',
        imageHint: 'cafe interior',
        price: '₹300 for two',
        category: 'food',
    },
    {
        id: '5',
        title: 'Mom\'s Tiffin Service',
        type: 'Tiffin',
        rating: 4.9,
        imageUrl: 'https://picsum.photos/seed/food2/600/400',
        imageHint: 'healthy food',
        price: '₹2,500/month',
        category: 'food',
    },
];

export const shopListings: Listing[] = [
    {
        id: '6',
        title: 'Student Stationery Mart',
        type: 'Stationery',
        rating: 4.3,
        imageUrl: 'https://picsum.photos/seed/shop1/600/400',
        imageHint: 'stationery shop',
        category: 'shops',
    },
    {
        id: '7',
        title: 'Campus Uniforms & Co.',
        type: 'Uniforms',
        rating: 4.1,
        imageUrl: 'https://picsum.photos/seed/shop2/600/400',
        imageHint: 'clothing store',
        category: 'shops',
    },
];


export const studentHelplines: Helpline[] = [
    { name: 'Student Stress Helpline', number: '987-654-3210', description: 'Confidential support for academic and personal stress.' },
    { name: 'Campus Security', number: '123-456-7890', description: '24/7 on-campus security assistance.' },
    { name: 'Anti-Ragging Helpline', number: '1800-180-5522', description: 'National helpline for reporting ragging incidents.' },
];

export const womenHelplines: Helpline[] = [
    { name: 'National Women\'s Helpline', number: '181', description: '24/7 emergency response for women in distress.' },
    { name: 'Campus Women\'s Cell', number: '112-233-4455', description: 'University-specific cell for women\'s safety and support.' },
];

export const busRoutes: TransportRoute[] = [
    { routeNumber: '101', start: 'Main Campus', end: 'City Center', timings: 'Every 15 mins (6 AM - 10 PM)' },
    { routeNumber: '102', start: 'South Hostel', end: 'North Campus', timings: 'Every 20 mins (7 AM - 9 PM)' },
    { routeNumber: '205A', start: 'Main Campus', end: 'Railway Station', timings: 'Every 30 mins (5:30 AM - 11 PM)' },
];

export const metroRoutes: TransportRoute[] = [
    { routeNumber: 'Blue Line', start: 'University Metro', end: 'Downtown', timings: 'Every 5 mins (5 AM - 11:30 PM)' },
    { routeNumber: 'Red Line', start: 'University Metro', end: 'Airport', timings: 'Every 10 mins (6 AM - 11:00 PM)' },
];
