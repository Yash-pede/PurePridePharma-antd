import { useGo } from "@refinedev/core";
import { Products } from "@repo/graphql";
import { Card, Image, Typography } from "antd";

export const ProductCardPublic = ({
  product,
  isLoading,
  RenderButton,
}: {
  product: Products;
  isLoading: boolean;
  RenderButton?: () => JSX.Element;
}) => {
  const go = useGo();
  const { Paragraph } = Typography;
  return (
    <>
      <Card
        hoverable
        title={product.name}
        loading={isLoading}
        style={{ width: 300, cursor: "pointer" }}
        onClick={() =>
          go({
            to: { resource: "products", id: product.id, action: "show" },
            type: "push",
            options: { keepQuery: true },
          })
        }
      >
        <Image
          src={`https://krtkfjphiovnpjawcxwo.supabase.co/storage/v1/object/public/Products/${product.imageURL}`}
          alt={product.name}
          preview={false}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "5px",
            margin: "auto",
          }}
        />
        <Paragraph
          style={{
            marginTop: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.description}
        </Paragraph>
        <Paragraph
          style={{
            marginTop: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          MRP - {product.mrp}
        </Paragraph>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {RenderButton && <RenderButton />}
        </div>
      </Card>
    </>
  );
};
