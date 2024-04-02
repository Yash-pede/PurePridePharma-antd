import { IResourceItem } from "@refinedev/core";
import {
  IconCurrencyRupeeNepalese,
  IconDashboard,
  IconDeviceHeartMonitor,
  IconPackage,
  IconPackageImport,
  IconUser,
  IconUserBolt,
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
    name: "products",
    list: "/products",
    meta: {
      label: "Products",
      icon: <IconPackage />,
    },
    show: "/products/:id",
  },
  {
    name: "orders",
    list: "/orders",
    meta: {
      label: "Orders",
      icon: <IconPackageImport />,
    },
    show: "/orders/:id",
    edit: "/orders/edit/:id",
    create: "/orders/create",
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
    name: "sales",
    list: "/sales",
    meta: {
      label: "sales",
      icon: <IconUserBolt />,
    },
    show: "/sales/:id",
    edit: "/sales/edit/:id",
    create: "/sales/create",
  },
  {
    name: "inventory",
    list: "/inventory",
    meta: {
      label: "Inventory",
      icon: <IconDeviceHeartMonitor />,
    },
    show: "/inventory/:id",
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
];
