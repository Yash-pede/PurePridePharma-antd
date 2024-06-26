import {
  List,
  Show,
  ShowButton,
  TextField,
  useEditableTable,
  useTable,
} from "@refinedev/antd";
import { useGo, useList } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { Button, Table } from "antd";
import React, { useEffect } from "react";

export const ProductWiseInventory = () => {
  const go = useGo();
  const [productWiseArrange, setProductWiseArrange] = React.useState<any>([]);
  const { tableProps, tableQueryResult } = useTable<
    Database["public"]["Tables"]["STOCKS"]["Row"]
  >({
    resource: "STOCKS",
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "asc",
        },
      ],
    },
  });
  const { data: products, isLoading: isLoadingProducts } = useList({
    resource: "PRODUCTS",
    filters: [
      {
        field: "id",
        operator: "in",
        value: tableQueryResult?.data?.data?.map((item) => item.product_id),
      },
    ],
  });

  useEffect(() => {
    const productWiseData: { [productId: string]: any } = {};

    tableQueryResult?.data?.data.forEach((item) => {
      const productId = item.product_id;
      const availableQuantity = item.avalable_quantity;
      const orderedQuantity = item.orderd_quantity;

      if (productId in productWiseData) {
        productWiseData[productId].availableQuantity += availableQuantity;
        productWiseData[productId].orderedQuantity += orderedQuantity;
      } else {
        productWiseData[productId] = {
          productId,
          availableQuantity,
          orderedQuantity,
        };
      }
    });

    const arrangedProducts = Object.values(productWiseData);

    setProductWiseArrange(arrangedProducts);
  }, [isLoadingProducts, tableQueryResult]);

  return (
    <Show>
      <Table
        {...tableProps}
        dataSource={productWiseArrange}
        columns={[
          {
            title: "Product",
            dataIndex: "productId",
            key: "productId",
            render: (value, record) => {
              return (
                <Button
                  type="dashed"
                  onClick={() => {
                    go({
                      to: {
                        action: "show",
                        resource: "products",
                        id: value,
                      },
                      options: { keepQuery: false },
                      type: "replace",
                    });
                  }}
                >
                  {products?.data.find((item) => item.id === value)?.name}
                </Button>
              );
            },
          },
          {
            title: "Available Quantity",
            dataIndex: "availableQuantity",
            key: "availableQuantity",
            render: (value, record) => {
              return <TextField value={value} />;
            },
          },
          {
            title: "Ordered Quantity",
            dataIndex: "orderedQuantity",
            key: "orderedQuantity",
            render: (value, record) => {
              return <TextField value={value} />;
            },
          },
        ]}
      />
    </Show>
  );
};
