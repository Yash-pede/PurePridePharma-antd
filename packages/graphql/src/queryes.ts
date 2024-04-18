import gql from "graphql-tag";

export const PROFILES_QUERY: any = gql`
  query Profiles(
    $filter: profilesFilter!
    $first: Int!
    $last: Int!
    $before: Cursor!
    $after: Cursor!
  ) {
    profilesCollection(
      filter: $filter
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      edges {
        node {
          id
          username
          email
          full_name
          userrole
          phone
          updated_at
          boss_id
        }
      }
    }
  }
`;

export const GET_ALL_pRODUCTS_QUERY = gql`
  query pRODUCTSCollection {
    pRODUCTSCollection {
      edges {
        node {
          id
          mrp
          imageURL
          created_at
        }
      }
    }
  }
`;
export const GET_ALL_STOCKS_QUERY = gql`
  query sTOCKSCollection {
    sTOCKSCollection {
      edges {
        node {
          id
          product_id
          avalable_quantity
          orderd_quantity
          expiry_date
        }
      }
    }
  }
`;

export const GET_ALL_ORDERS_QUERY = gql`
  query oRDERSCollection {
    oRDERSCollection {
      edges {
        node {
          id
          order
          status
          distributor_id
          created_at
        }
      }
    }
  }
`;

export const GET_ALL_PROFILES_QUERY = gql`
  query profilesConnection {
    profilesCollection {
      edges {
        node {
          id
          username
          full_name
          email
          userrole
          boss_id
        }
      }
    }
  }
`;

export const GET_ALL_D_INVENTORY_QUERY: any = gql`
  query d_INVENTORYCollection {
    d_INVENTORYCollection {
      edges {
        node {
          id
          distributor_id
          product_id
          quantity
          batch_info
          created_at
        }
      }
    }
  }
`;
