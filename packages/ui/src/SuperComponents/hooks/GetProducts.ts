import { useList, useOne } from "@refinedev/core";

export const useGetProducts = () => {
  const { data: products } = useList({
    resource: "PRODUCTS",
  });
  return { products };
};

export const useGetProductsById = (id: string) => {
  const { data } = useOne({
    resource: "PRODUCTS",
    id: id,
  });
  return data;
};
