import React from "react";
import { IconType } from "react-icons";

import {
  FaChartLine,
  FaCogs,
  FaFileInvoice,
  FaPlug,
  FaRulerCombined,
  FaTachometerAlt,
  FaTags,
  FaUserShield,
  FaUserTie,
  FaWarehouse,
} from "react-icons/fa";
import { GiHandTruck, GiSevenPointedStar } from "react-icons/gi";

export interface NavSubItem {
  title: string;
  path: string;
  icon?: IconType;
  element?: React.ElementType;
}

export interface NavGroup {
  title: string;
  path?: string;
  icon?: IconType;
  element?: React.ElementType;
  submenu?: NavSubItem[];
}

export const menuItems: NavGroup[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaTachometerAlt,
  },
  {
    title: "Setting",
    icon: FaCogs,
    submenu: [
      {
        title: "Business",
        path: "/config/business",
        icon: FaChartLine,
      },
      {
        title: "Warehouse",
        path: "/config/warehouse",
        icon: FaWarehouse,
      },
      {
        title: "Brand",
        path: "/config/brand",
        icon: GiSevenPointedStar,
      },
      {
        title: "Role",
        path: "/config/role",
        icon: FaUserShield,
      },
      {
        title: "Employee",
        path: "/config/employee",
        icon: FaUserTie,
      },
      {
        title: "Supplier",
        path: "/config/supplier",
        icon: GiHandTruck,
      },
      {
        title: "Sizeguard",
        path: "/config/sizeguard",
        icon: FaRulerCombined,
      },
      {
        title: "Tag",
        path: "/config/tag",
        icon: FaTags,
      },
      {
        title: "Invoice",
        path: "/config/invoice",
        icon: FaFileInvoice,
      },
      {
        title: "Courier API",
        path: "/config/courier-api",
        icon: FaPlug,
      },
      // {
      //   title: "SMS",
      //   path: "/config/sms",
      //   icon: FaSms,
      // },
    ],
  },
];
