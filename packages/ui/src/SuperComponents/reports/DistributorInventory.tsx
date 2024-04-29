import React from "react";
import { DistributorById } from "./DistributorById";
import { Modal } from "antd";
import { InventoryD } from "../../components";
import { useLocation } from "react-router-dom";
import { useBack, useGo } from "@refinedev/core";

export const DistributorInventory = () => {
  const param = useLocation();
  const segments = param.pathname.split("/");
  const D_ID = segments[segments.length - 2];

  const go = useBack();
  return (
    <DistributorById>
      <Modal open onCancel={() => go()} footer={false}>
        <InventoryD DistributorId={D_ID} />
      </Modal>
    </DistributorById>
  );
};
