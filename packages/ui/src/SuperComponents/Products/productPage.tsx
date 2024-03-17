import { useLocation } from "react-router-dom";
import { useGo, useList, useOne } from "@refinedev/core";
import { GET_ALL_pRODUCTS_QUERY } from "@repo/graphql";
import { Button, Descriptions, Image, Row } from "antd";
import { DateField, DeleteButton, Show } from "@refinedev/antd";
import { useEffect, useState } from "react";
import { SUPABASE_PROJECT_ID } from "../../utility";
import { UserRoleTypes } from "@repo/utility";

export const ProductPage = () => {
  const [admin, setAdmin] = useState(false);
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const go = useGo();
  const { data: Product } = useList({
    resource: "PRODUCTS",
    meta: {
      gqlQuery: GET_ALL_pRODUCTS_QUERY,
    },
    filters: [
      {
        field: "id",
        operator: "eq",
        value: id,
      },
    ],
  });
  const { data, error } = useOne({
    resource: "profiles",
    id: JSON.parse(
      localStorage.getItem(`sb-${SUPABASE_PROJECT_ID}-auth-token`) || "{}"
    )?.user.id as string,
  });
  useEffect(() => {
    setAdmin(data?.data[0]?.role === UserRoleTypes.ADMIN ? true : false);
  }, [Product]);
  return (
    <>
      <Show>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "auto",
            width: "70%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Row justify="center" align="middle" style={{ gap: "16px" }}>
            <Descriptions bordered size="default" column={2}>
              <Descriptions.Item label="Name">
                {Product?.data[0]?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {Product?.data[0]?.description}
              </Descriptions.Item>
              <Descriptions.Item label="Selling price">
                {Product?.data[0]?.selling_price}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                {Product?.data[0]?.mrp}
              </Descriptions.Item>
              <Descriptions.Item label="Updated at">
                <DateField value={Product?.data[0]?.updatedAt}></DateField>
              </Descriptions.Item>
            </Descriptions>
            {admin && (
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50%",
                }}
              >
                <Button type="primary" style={{ width: "50%" }} size="large">
                  Edit
                </Button>

                <DeleteButton
                  style={{ width: "50%" }}
                  onSuccess={() => {
                    go({
                      to: "/products",
                      type: "push",
                    });
                  }}
                />
              </div>
            )}
          </Row>
          <div>
            <Image
              src={`https://krtkfjphiovnpjawcxwo.supabase.co/storage/v1/object/public/Products/${Product?.data[0].imageURL}`}
              alt=""
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "3%",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      </Show>
      {/* <pre>{JSON.stringify(Product, null, 2)}</pre> */}
    </>
  );
};
