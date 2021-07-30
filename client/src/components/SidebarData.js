import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupIcon from '@material-ui/icons/Group';
import DescriptionIcon from '@material-ui/icons/Description';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/dashboard"
    },
    {
        title: "Voitures",
        icon: <DirectionsCarIcon />,
        link: "/cars"
    },
    {
        title: "Dépenses",
        icon: <AttachMoneyIcon />,
        link: "/expenses"
    },
    {
        title: "Equipe",
        icon: <GroupIcon />,
        link: "/users"
    },
    {
        title: "Contrat",
        icon: <DescriptionIcon />,
        link: "/contrat"
    },
    {
        title: "Calendrier",
        icon: <CalendarTodayIcon />,
        link: "/calendrier"
    },
]