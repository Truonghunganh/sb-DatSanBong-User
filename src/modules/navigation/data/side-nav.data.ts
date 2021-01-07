import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['Dashboard'],
    },
    {
        text: 'MANAGER',
        items: ['Customers', 'Docters', 'Orders', 'Categories', 'Promotions'],
    },
    {
        text: 'PERMISSIONS',
        items: ['Admin', 'Customer', 'Doctor'],
    },
    {
        text: 'NOTIFICATIONS',
        items: ['Push'],
    },
];

export const sideNavItems: SideNavItems = {
    Dashboard: {
        icon: 'arrows-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    Customers: {
        icon: 'user',
        text: 'Customers',
        link: '/customers',
    },
    Docters: {
        icon: 'user-nurse',
        text: 'Doctors',
        link: '/doctors',
    },
    Orders: {
        icon: 'comment-dollar',
        text: 'Orders',
        link: '/orders',
    },
    Categories: {
        icon: 'calendar-check',
        text: 'Categories',
        link: '/categories',
    },
    Promotions: {
        icon: 'server',
        text: 'Promotions',
        link: '/promotions',
    },
    Admin: {
        icon: 'user-lock',
        text: 'Admin',
        link: '/permission-admin',
    },
    Customer: {
        icon: 'user-lock',
        text: 'Customer',
        link: '/permission-customer',
    },
    Doctor: {
        icon: 'user-lock',
        text: 'Doctor',
        link: '/permission-doctor',
    },
    Push: {
        icon: 'location-arrow',
        text: 'Push notifications',
        link: '/notifications',
    },
};
