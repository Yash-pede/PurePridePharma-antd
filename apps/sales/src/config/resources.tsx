import { IResourceItem } from "@refinedev/core";
import {
  IconCurrencyRupeeNepalese,
  IconDashboard,
  IconMoneybag,
  IconPackageImport,
  IconUser,
} from "@tabler/icons-react";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <IconDashboard />,
    },
  },
  {
    name: "inventory",
    list: "/inventory",
    meta: {
      label: "Inventory",
      icon: <IconPackageImport />,
    },
  },
  {
    name: "customer",
    list: "/customer",
    meta: {
      label: "customer",
      icon: <IconUser />,
    },
    show: "/customer/:id",
    edit: "/customer/edit/:id",
    create: "/customer/create",
  },
  {
    name: "challan",
    list: "/challan",
    meta: {
      label: "Challan",
      icon: <IconCurrencyRupeeNepalese />,
    },
    show: "/challan/:id",
    create: "/challan/create",
  },
  {
    name: "money",
    list: "/money",
    meta: {
      label: "Funds",
      icon: <IconMoneybag />,
    },
    show: "/money/:id",
    create: "/money/create",
  },
];
