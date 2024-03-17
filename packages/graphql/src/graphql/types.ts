import type * as Types from './schema.types';

export type InsertIntoProductsCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.ProductsInsertInput> | Types.ProductsInsertInput;
}>;


export type InsertIntoProductsCollectionMutation = { insertIntoPRODUCTSCollection?: Types.Maybe<{ records: Array<Pick<Types.Products, 'name' | 'mrp' | 'description' | 'imageURL' | 'selling_price' | 'created_at'>> }> };

export type InsertIntoStocksCollectionMutationVariables = Types.Exact<{
  objects: Array<Types.StocksInsertInput> | Types.StocksInsertInput;
}>;


export type InsertIntoStocksCollectionMutation = { insertIntoSTOCKSCollection?: Types.Maybe<{ records: Array<Pick<Types.Stocks, 'product_id' | 'id' | 'avalable_quantity' | 'expiry_date'>> }> };

export type ProfilesQueryVariables = Types.Exact<{
  filter: Types.ProfilesFilter;
  first: Types.Scalars['Int']['input'];
  last: Types.Scalars['Int']['input'];
  before: Types.Scalars['Cursor']['input'];
  after: Types.Scalars['Cursor']['input'];
}>;


export type ProfilesQuery = { profilesCollection?: Types.Maybe<{ edges: Array<{ node: Pick<Types.Profiles, 'id' | 'username' | 'email' | 'full_name' | 'userrole'> }> }> };

export type PRoductsCollectionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PRoductsCollectionQuery = { pRODUCTSCollection?: Types.Maybe<{ edges: Array<{ node: Pick<Types.Products, 'id' | 'mrp' | 'imageURL' | 'created_at'> }> }> };

export type STocksCollectionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type STocksCollectionQuery = { sTOCKSCollection?: Types.Maybe<{ edges: Array<{ node: Pick<Types.Stocks, 'id' | 'product_id' | 'avalable_quantity' | 'orderd_quantity' | 'expiry_date'> }> }> };

export type ORdersCollectionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ORdersCollectionQuery = { oRDERSCollection?: Types.Maybe<{ edges: Array<{ node: Pick<Types.Orders, 'id' | 'order' | 'status' | 'distributor_id' | 'created_at'> }> }> };

export type D_InventoryCollectionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type D_InventoryCollectionQuery = { d_INVENTORYCollection?: Types.Maybe<{ edges: Array<{ node: Pick<Types.D_Inventory, 'id' | 'distributor_id' | 'product_id' | 'quantity' | 'salesperson_id'> }> }> };

export type ProfilesConnectionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProfilesConnectionQuery = { profilesCollection?: Types.Maybe<{ edges: Array<{ node: Pick<Types.Profiles, 'id' | 'username' | 'full_name' | 'email' | 'userrole'> }> }> };
