import { useEditableTable } from "@refinedev/antd";
import { GET_ALL_ORDERS_QUERY } from "@repo/graphql";
import React from "react";
import { useLocation } from "react-router-dom";

export const ShowOrders = () => {
  const orderId = useLocation().pathname.split("/").pop();

  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
    tableQueryResult,
  } = useEditableTable({
    resource: "ORDERS",
    meta: {
      gqlQuery: GET_ALL_ORDERS_QUERY,
    },
  });
  return (
    <div>
      <pre>{JSON.stringify(tableQueryResult, null, 2)}</pre>
    </div>
  );
};
