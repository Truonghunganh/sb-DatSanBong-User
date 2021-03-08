import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['ListQuan'],
    },
    {
        text: 'MANAGER',
        items: ['Customers'],
    },
    
];

export const sideNavItems: SideNavItems = {
    ListQuan: {
        icon: 'arrows-alt',
        text: 'Danh sách các quán đặt sân',
        link: '/dashboard/quans',
    },
    Customers: {
        icon: 'user',
        text: 'Thông tin người đặt sân',
        link: '/dashboard/user',
    },

};
