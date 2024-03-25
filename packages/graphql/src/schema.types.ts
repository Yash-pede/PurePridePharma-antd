export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigFloat: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  Date: { input: any; output: any; }
  Datetime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Opaque: { input: any; output: any; }
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

export type Customers = Node & {
  created_at: Scalars['Datetime']['output'];
  distributor_id: Scalars['UUID']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  profiles: Profiles;
};

export type CustomersConnection = {
  edges: Array<CustomersEdge>;
  pageInfo: PageInfo;
};

export type CustomersDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Customers>;
};

export type CustomersEdge = {
  cursor: Scalars['String']['output'];
  node: Customers;
};

export type CustomersFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<CustomersFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  distributor_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<CustomersFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<CustomersFilter>>;
};

export type CustomersInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  distributor_id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CustomersInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Customers>;
};

export type CustomersOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  distributor_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type CustomersUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  distributor_id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CustomersUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Customers>;
};

export type D_Inventory = Node & {
  batch_info?: Maybe<Scalars['JSON']['output']>;
  created_at?: Maybe<Scalars['Datetime']['output']>;
  distributor_id: Scalars['UUID']['output'];
  id: Scalars['Int']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  pRODUCTS: Products;
  product_id: Scalars['UUID']['output'];
  quantity?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
};

export type D_InventoryConnection = {
  edges: Array<D_InventoryEdge>;
  pageInfo: PageInfo;
};

export type D_InventoryDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<D_Inventory>;
};

export type D_InventoryEdge = {
  cursor: Scalars['String']['output'];
  node: D_Inventory;
};

export type D_InventoryFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<D_InventoryFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  distributor_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<D_InventoryFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<D_InventoryFilter>>;
  product_id?: InputMaybe<UuidFilter>;
  quantity?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type D_InventoryInsertInput = {
  batch_info?: InputMaybe<Scalars['JSON']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  distributor_id?: InputMaybe<Scalars['UUID']['input']>;
  product_id?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type D_InventoryInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<D_Inventory>;
};

export type D_InventoryOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  distributor_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  product_id?: InputMaybe<OrderByDirection>;
  quantity?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type D_InventoryUpdateInput = {
  batch_info?: InputMaybe<Scalars['JSON']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  distributor_id?: InputMaybe<Scalars['UUID']['input']>;
  product_id?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type D_InventoryUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<D_Inventory>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

export type FilterIs =
  | 'NOT_NULL'
  | 'NULL';

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  add_to_d_inventory?: Maybe<Scalars['Opaque']['output']>;
  /** Deletes zero or more records from the `CUSTOMERS` collection */
  deleteFromCUSTOMERSCollection: CustomersDeleteResponse;
  /** Deletes zero or more records from the `D_INVENTORY` collection */
  deleteFromD_INVENTORYCollection: D_InventoryDeleteResponse;
  /** Deletes zero or more records from the `ORDERS` collection */
  deleteFromORDERSCollection: OrdersDeleteResponse;
  /** Deletes zero or more records from the `PRODUCTS` collection */
  deleteFromPRODUCTSCollection: ProductsDeleteResponse;
  /** Deletes zero or more records from the `STOCKS` collection */
  deleteFromSTOCKSCollection: StocksDeleteResponse;
  /** Deletes zero or more records from the `profiles` collection */
  deleteFromprofilesCollection: ProfilesDeleteResponse;
  /** Adds one or more `CUSTOMERS` records to the collection */
  insertIntoCUSTOMERSCollection?: Maybe<CustomersInsertResponse>;
  /** Adds one or more `D_INVENTORY` records to the collection */
  insertIntoD_INVENTORYCollection?: Maybe<D_InventoryInsertResponse>;
  /** Adds one or more `ORDERS` records to the collection */
  insertIntoORDERSCollection?: Maybe<OrdersInsertResponse>;
  /** Adds one or more `PRODUCTS` records to the collection */
  insertIntoPRODUCTSCollection?: Maybe<ProductsInsertResponse>;
  /** Adds one or more `STOCKS` records to the collection */
  insertIntoSTOCKSCollection?: Maybe<StocksInsertResponse>;
  /** Adds one or more `profiles` records to the collection */
  insertIntoprofilesCollection?: Maybe<ProfilesInsertResponse>;
  /** Updates zero or more records in the `CUSTOMERS` collection */
  updateCUSTOMERSCollection: CustomersUpdateResponse;
  /** Updates zero or more records in the `D_INVENTORY` collection */
  updateD_INVENTORYCollection: D_InventoryUpdateResponse;
  /** Updates zero or more records in the `ORDERS` collection */
  updateORDERSCollection: OrdersUpdateResponse;
  /** Updates zero or more records in the `PRODUCTS` collection */
  updatePRODUCTSCollection: ProductsUpdateResponse;
  /** Updates zero or more records in the `STOCKS` collection */
  updateSTOCKSCollection: StocksUpdateResponse;
  /** Updates zero or more records in the `profiles` collection */
  updateprofilesCollection: ProfilesUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationAdd_To_D_InventoryArgs = {
  batch_id?: InputMaybe<Scalars['String']['input']>;
  batch_quantity?: InputMaybe<Scalars['Int']['input']>;
  distributor_id?: InputMaybe<Scalars['UUID']['input']>;
  product_id?: InputMaybe<Scalars['UUID']['input']>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromCustomersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CustomersFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromD_InventoryCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<D_InventoryFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromOrdersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<OrdersFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromProductsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProductsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromStocksCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<StocksFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromprofilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProfilesFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoCustomersCollectionArgs = {
  objects: Array<CustomersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoD_InventoryCollectionArgs = {
  objects: Array<D_InventoryInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoOrdersCollectionArgs = {
  objects: Array<OrdersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoProductsCollectionArgs = {
  objects: Array<ProductsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoStocksCollectionArgs = {
  objects: Array<StocksInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoprofilesCollectionArgs = {
  objects: Array<ProfilesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateCustomersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<CustomersFilter>;
  set: CustomersUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateD_InventoryCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<D_InventoryFilter>;
  set: D_InventoryUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateOrdersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<OrdersFilter>;
  set: OrdersUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateProductsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProductsFilter>;
  set: ProductsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateStocksCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<StocksFilter>;
  set: StocksUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateprofilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProfilesFilter>;
  set: ProfilesUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

export type Orders = Node & {
  created_at: Scalars['Datetime']['output'];
  distributor_id: Scalars['UUID']['output'];
  id: Scalars['BigInt']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  order: Scalars['JSON']['output'];
  status: Orders_Status;
};

export type OrdersConnection = {
  edges: Array<OrdersEdge>;
  pageInfo: PageInfo;
};

export type OrdersDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Orders>;
};

export type OrdersEdge = {
  cursor: Scalars['String']['output'];
  node: Orders;
};

export type OrdersFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<OrdersFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  distributor_id?: InputMaybe<UuidFilter>;
  id?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<OrdersFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<OrdersFilter>>;
  status?: InputMaybe<Orders_StatusFilter>;
};

export type OrdersInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  distributor_id?: InputMaybe<Scalars['UUID']['input']>;
  order?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<Orders_Status>;
};

export type OrdersInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Orders>;
};

export type OrdersOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  distributor_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
};

export type OrdersUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  distributor_id?: InputMaybe<Scalars['UUID']['input']>;
  order?: InputMaybe<Scalars['JSON']['input']>;
  status?: InputMaybe<Orders_Status>;
};

export type OrdersUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Orders>;
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export type OrderByDirection =
  /** Ascending order, nulls first */
  | 'AscNullsFirst'
  /** Ascending order, nulls last */
  | 'AscNullsLast'
  /** Descending order, nulls first */
  | 'DescNullsFirst'
  /** Descending order, nulls last */
  | 'DescNullsLast';

export type Products = Node & {
  created_at: Scalars['Datetime']['output'];
  d_INVENTORYCollection?: Maybe<D_InventoryConnection>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  imageURL: Scalars['String']['output'];
  mrp: Scalars['BigFloat']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  sTOCKSCollection?: Maybe<StocksConnection>;
  selling_price: Scalars['BigInt']['output'];
};


export type Productsd_InventoryCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<D_InventoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<D_InventoryOrderBy>>;
};


export type ProductssTocksCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<StocksFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StocksOrderBy>>;
};

export type ProductsConnection = {
  edges: Array<ProductsEdge>;
  pageInfo: PageInfo;
};

export type ProductsDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Products>;
};

export type ProductsEdge = {
  cursor: Scalars['String']['output'];
  node: Products;
};

export type ProductsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ProductsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  imageURL?: InputMaybe<StringFilter>;
  mrp?: InputMaybe<BigFloatFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ProductsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ProductsFilter>>;
  selling_price?: InputMaybe<BigIntFilter>;
};

export type ProductsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  imageURL?: InputMaybe<Scalars['String']['input']>;
  mrp?: InputMaybe<Scalars['BigFloat']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  selling_price?: InputMaybe<Scalars['BigInt']['input']>;
};

export type ProductsInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Products>;
};

export type ProductsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  imageURL?: InputMaybe<OrderByDirection>;
  mrp?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  selling_price?: InputMaybe<OrderByDirection>;
};

export type ProductsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  imageURL?: InputMaybe<Scalars['String']['input']>;
  mrp?: InputMaybe<Scalars['BigFloat']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  selling_price?: InputMaybe<Scalars['BigInt']['input']>;
};

export type ProductsUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Products>;
};

export type PageInfo = {
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  /** A pagable collection of type `CUSTOMERS` */
  cUSTOMERSCollection?: Maybe<CustomersConnection>;
  /** A pagable collection of type `D_INVENTORY` */
  d_INVENTORYCollection?: Maybe<D_InventoryConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `ORDERS` */
  oRDERSCollection?: Maybe<OrdersConnection>;
  /** A pagable collection of type `PRODUCTS` */
  pRODUCTSCollection?: Maybe<ProductsConnection>;
  /** A pagable collection of type `profiles` */
  profilesCollection?: Maybe<ProfilesConnection>;
  /** A pagable collection of type `STOCKS` */
  sTOCKSCollection?: Maybe<StocksConnection>;
};


/** The root type for querying data */
export type QueryCUstomersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CustomersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CustomersOrderBy>>;
};


/** The root type for querying data */
export type QueryD_InventoryCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<D_InventoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<D_InventoryOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryORdersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<OrdersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrdersOrderBy>>;
};


/** The root type for querying data */
export type QueryPRoductsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ProductsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProductsOrderBy>>;
};


/** The root type for querying data */
export type QueryProfilesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ProfilesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};


/** The root type for querying data */
export type QuerySTocksCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<StocksFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StocksOrderBy>>;
};

export type Stocks = Node & {
  avalable_quantity: Scalars['BigInt']['output'];
  created_at: Scalars['Datetime']['output'];
  expiry_date?: Maybe<Scalars['Date']['output']>;
  id: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  orderd_quantity: Scalars['BigInt']['output'];
  pRODUCTS: Products;
  product_id: Scalars['UUID']['output'];
};

export type StocksConnection = {
  edges: Array<StocksEdge>;
  pageInfo: PageInfo;
};

export type StocksDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Stocks>;
};

export type StocksEdge = {
  cursor: Scalars['String']['output'];
  node: Stocks;
};

export type StocksFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<StocksFilter>>;
  avalable_quantity?: InputMaybe<BigIntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  expiry_date?: InputMaybe<DateFilter>;
  id?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<StocksFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<StocksFilter>>;
  orderd_quantity?: InputMaybe<BigIntFilter>;
  product_id?: InputMaybe<UuidFilter>;
};

export type StocksInsertInput = {
  avalable_quantity?: InputMaybe<Scalars['BigInt']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  expiry_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  orderd_quantity?: InputMaybe<Scalars['BigInt']['input']>;
  product_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type StocksInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Stocks>;
};

export type StocksOrderBy = {
  avalable_quantity?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  expiry_date?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  orderd_quantity?: InputMaybe<OrderByDirection>;
  product_id?: InputMaybe<OrderByDirection>;
};

export type StocksUpdateInput = {
  avalable_quantity?: InputMaybe<Scalars['BigInt']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  expiry_date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  orderd_quantity?: InputMaybe<Scalars['BigInt']['input']>;
  product_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type StocksUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Stocks>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

export type Orders_Status =
  | 'Cancelled'
  | 'Defected'
  | 'Fulfilled'
  | 'InProcess'
  | 'Pending';

/** Boolean expression comparing fields on type "orders_status" */
export type Orders_StatusFilter = {
  eq?: InputMaybe<Orders_Status>;
  in?: InputMaybe<Array<Orders_Status>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Orders_Status>;
};

export type Profiles = Node & {
  cUSTOMERSCollection?: Maybe<CustomersConnection>;
  email?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['Datetime']['output'];
  username?: Maybe<Scalars['String']['output']>;
  userrole?: Maybe<User_Roles>;
};


export type ProfilesCUstomersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<CustomersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CustomersOrderBy>>;
};

export type ProfilesConnection = {
  edges: Array<ProfilesEdge>;
  pageInfo: PageInfo;
};

export type ProfilesDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesEdge = {
  cursor: Scalars['String']['output'];
  node: Profiles;
};

export type ProfilesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ProfilesFilter>>;
  email?: InputMaybe<StringFilter>;
  full_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ProfilesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ProfilesFilter>>;
  phone?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  username?: InputMaybe<StringFilter>;
  userrole?: InputMaybe<User_RolesFilter>;
};

export type ProfilesInsertInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  userrole?: InputMaybe<User_Roles>;
};

export type ProfilesInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type ProfilesOrderBy = {
  email?: InputMaybe<OrderByDirection>;
  full_name?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  phone?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  username?: InputMaybe<OrderByDirection>;
  userrole?: InputMaybe<OrderByDirection>;
};

export type ProfilesUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  userrole?: InputMaybe<User_Roles>;
};

export type ProfilesUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Profiles>;
};

export type User_Roles =
  | 'ADMIN'
  | 'CUSTOMERS'
  | 'DISTRIBUTORS'
  | 'SALES'
  | 'SUPERADMIN'
  | 'UNDEFINED';

/** Boolean expression comparing fields on type "user_roles" */
export type User_RolesFilter = {
  eq?: InputMaybe<User_Roles>;
  in?: InputMaybe<Array<User_Roles>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<User_Roles>;
};
