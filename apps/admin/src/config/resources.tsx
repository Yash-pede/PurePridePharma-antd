import { IResourceItem } from "@refinedev/core";
import {
  IconCurrencyRupeeNepalese,
  IconDashboard,
  IconMoneybag,
  IconPackage,
  IconPackageExport,
  IconPackageImport,
  IconReportAnalytics,
  IconTargetArrow,
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
    name: "products",
    list: "/products",
    meta: {
      label: "Products",
      icon: <IconPackage />,
    },
    show: "/products/:id",
    create: "/products/create",
  },
  {
    name: "orders",
    list: "/orders",
    meta: {
      label: "Orders",
      icon: <IconPackageExport />,
    },
    show: "/orders/:id",
    edit: "/orders/edit/:id",
    create: "/orders/create",
  },
  {
    name: "inventory",
    list: "/inventory",
    meta: {
      label: "Inventory",
      icon: <IconPackageImport />,
    },
    show: "/inventory/:id",
    create: "/inventory/create",
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
    name: "Reports",
    list: "/reports",
    meta: {
      label: "Reports",
      icon: <IconReportAnalytics />,
    },
  },
  {
    name: "target",
    list: "/target",
    meta: {
      label: "target",
    },
    icon: <IconTargetArrow />,
    show: "/target/:id",
    edit: "/target/edit/:id",
    create: "/target/create",
  },
  {
    name: "profiles",
    list: "/profiles",
    meta: {
      label: "profiles",
    },
    icon: <IconUser />,
    show: "/profiles/:id",
    edit: "/profiles/edit/:id",
    create: "/profiles/create",
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
