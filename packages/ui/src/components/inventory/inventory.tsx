import { SearchOutlined } from "@ant-design/icons";
import {
  DateField,
  FilterDropdown,
  List,
  TextField,
  getDefaultSortOrder,
  useSelect,
  useTable,
} from "@refinedev/antd";
import {
  getDefaultFilter,
  useGetIdentity,
  useGo,
  useList,
  useOne,
} from "@refinedev/core";
import { Database } from "@repo/graphql";
import { Button, Skeleton, Table, Select, Input } from "antd";

export const InventoryD = ({
  sales,
  DistributorId,
}: {
  sales?: boolean;
  DistributorId?: string;
}) => {
  const { data: User } = useGetIdentity<any>();
  const go = useGo();

  const { data: bossData, isLoading: isLoadingBossId } = useOne<
    Database["public"]["Tables"]["profiles"]["Row"]
  >({
    resource: "profiles",
    id: User?.id,
    queryOptions: {
      enabled: !!User && sales,
    },
  });

  const {
    tableProps,
    tableQueryResult: inventory,
    sorter,
    filters,
  } = useTable<Database["public"]["Tables"]["D_INVENTORY"]["Row"]>({
    resource: "D_INVENTORY",
    filters: {
      permanent: [
        {
          field: "distributor_id",
          operator: "eq",
          value: DistributorId
            ? DistributorId
            : sales
              ? bossData?.data?.boss_id
              : User?.id,
        },
        {
          field: "quantity",
          operator: "gt",
          value: 0,
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
        value: inventory?.data?.data.map((stock: any) => stock.product_id),
      },
    ],
  });

  const { selectProps } = useSelect({
    resource: "PRODUCTS",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: getDefaultFilter("PRODUCTS.id", filters, "in"),
  });

  return (
    <List title="Inventory" breadcrumb>
      <Table {...tableProps} rowKey={"id"}>
        <Table.Column
          dataIndex={"id"}
          title="ID"
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          filterDropdown={(props) => (
            <FilterDropdown {...props} filters={inventory?.data?.filters}>
              <Input placeholder="Enter ID" />
            </FilterDropdown>
          )}
          filterIcon={<SearchOutlined />}
          render={(value) => <TextField value={value} />}
          hidden
        />
        <Table.Column
          dataIndex="product_id"
          title="Product"
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props} mapValue={(value) => value}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                {...selectProps}
              />
            </FilterDropdown>
          )}
          render={(value) => {
            if (isLoadingProducts) return <Skeleton.Input active />;
            const product = products?.data.find(
              (product: any) => product.id === value,
            );
            return <TextField value={product?.name} />;
          }}
        />
        <Table.Column
          dataIndex="quantity"
          title="Quantity"
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          render={(value) => {
            return <TextField value={value} />;
          }}
        />
        <Table.Column
          dataIndex={"updated_at"}
          title="Last Updated"
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("updated_at", sorter)}
          render={(value) => {
            return <DateField value={value} format="DD/MM/YYYY" />;
          }}
        />
        <Table.Column<Database["public"]["Tables"]["D_INVENTORY"]["Row"]>
          title="Actions  "
          render={(_, resource) => {
            return (
              <>
                <Button
                  type="dashed"
                  onClick={() =>
                    go({
                      to: `${resource.id}`,
                    })
                  }
                >
                  View
                </Button>
              </>
            );
          }}
        />
      </Table>
      {/* <pre>{JSON.stringify(inventory?.data?.data, null, 2)}</pre> */}
    </List>
  );
};
