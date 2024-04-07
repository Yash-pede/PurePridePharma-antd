import React from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Typography,
} from "antd";
import { List, ShowButton, useModal, useTable } from "@refinedev/antd";
import { Database } from "@repo/graphql";
import { useGetIdentity, useUpdate } from "@refinedev/core";
import FormItem from "antd/lib/form/FormItem";

export const ChallanHome = () => {
  const [IdToUpdateReceived, setIdToUpdateReceived] = React.useState<any>(null);
  const { data: User } = useGetIdentity<any>();
  const { tableProps, tableQueryResult, filters, sorter } = useTable<
    Database["public"]["Tables"]["challan"]["Row"]
  >({
    pagination: {
      pageSize: 10,
    },
    filters: {
      permanent: [
        {
          field: "distributor_id",
          operator: "eq",
          value: User?.id,
        },
      ],
    },
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "asc",
        },
      ],
    },
  });
  const [form] = Form.useForm();
  const { close, modalProps, show } = useModal();
  const { mutate, isLoading, isSuccess } = useUpdate<any>();
  form.submit = async () => {
    mutate({
      resource: "challan",
      id: IdToUpdateReceived,
      values: {
        received_amt:
          tableQueryResult.data?.data.find(
            (item) => item.id === IdToUpdateReceived
          )?.received_amt + form.getFieldValue("received_amt"),
      },
    });
    close();
    form.resetFields();
    setIdToUpdateReceived(null);
  };
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="total_amt" title="Total" />
        <Table.Column dataIndex="pending_amt" title="Pending" />
        <Table.Column dataIndex="received_amt" title="Received" />
        <Table.Column
          title="Action"
          render={(row) => (
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                onClick={() => {
                  setIdToUpdateReceived(row.id);
                  show();
                }}
              >
                Update
              </Button>
              <ShowButton recordItemId={row.id} />
            </div>
          )}
        />
      </Table>
      <Modal
        visible={IdToUpdateReceived !== null}
        okButtonProps={{ onClick: () => form.submit(), htmlType: "submit" }}
        onCancel={() => {
          setIdToUpdateReceived(null);
          close();
        }}
        {...modalProps}
        title="Update Recevied Amount"
      >
        <Typography.Paragraph>
          For Challan Id : {IdToUpdateReceived}
        </Typography.Paragraph>
        <Form layout="vertical" form={form} disabled={isLoading}>
          <FormItem
            initialValue={0}
            name="received_amt"
            rules={[
              {
                required: true,
                min: 1,
                type: "number",
                message: "Please enter a valid received amount",
                max: tableQueryResult.data?.data.find(
                  (item) => item.id === IdToUpdateReceived
                )?.pending_amt,
              },
            ]}
          >
            <InputNumber defaultValue={0} />
          </FormItem>
        </Form>
      </Modal>
    </List>
  );
};
