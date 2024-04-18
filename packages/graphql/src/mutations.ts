import gql from "graphql-tag";

export const INSERT_INTO_PRODUCTS_MUTATION: any = gql`
  mutation insertIntoPRODUCTSCollection($objects: [PRODUCTSInsertInput!]!) {
    insertIntoPRODUCTSCollection(objects: $objects) {
      records {
        name
        mrp
        description
        imageURL
        selling_price
        created_at
      }
    }
  }
`;
export const INSERT_INTO_STOCKS_MUTATION: any = gql`
  mutation insertIntoSTOCKSCollection($objects: [STOCKSInsertInput!]!) {
    insertIntoSTOCKSCollection(objects: $objects) {
      records {
        product_id
        id
        avalable_quantity
        expiry_date
      }
    }
  }
`;

// export const CREATE_ORDER_MUTATION = gql`
//   mutation insertIntoordersCollection($objects: [ORDERSInsertInput!]!) {
//     insertIntoORDERSCollection(objects: $objects) {
//       records {
//         user_id
//         quantity
//         product_id
//         id
//       }
//     }
//   }
// `;

// export const UPDATE_ORDERS_MUTATION = gql`
//   mutation updateORDERSCollection(
//     $set: ORDERSUpdateInput!
//     $filter: ORDERSFilter
//   ) {
//     updateORDERSCollection(set: $set, filter: $filter) {
//       records {
//         product_id
//         user_id
//         id
//         quantity
//         status
//       }
//     }
//   }
// `;

// export const UPDATE_ORDERS_MUTATION_DISTRIBUTOR = gql`
//   mutation updateORDERSCollection_DISTRIBUTOR(
//     $set: ORDERSUpdateInput!
//     $filter: ORDERSFilter
//   ) {
//     updateORDERSCollection(set: $set, filter: $filter) {
//       records {
//         status
//       }
//     }
//   }
// `;
