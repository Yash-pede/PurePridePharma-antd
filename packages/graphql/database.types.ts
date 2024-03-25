export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      CUSTOMERS: {
        Row: {
          created_at: string
          distributor_id: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          distributor_id: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          distributor_id?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "CUSTOMERS_distributor_id_fkey"
            columns: ["distributor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      D_INVENTORY: {
        Row: {
          batch_info: Json | null
          created_at: string | null
          distributor_id: string
          id: number
          product_id: string
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          batch_info?: Json | null
          created_at?: string | null
          distributor_id: string
          id?: number
          product_id: string
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          batch_info?: Json | null
          created_at?: string | null
          distributor_id?: string
          id?: number
          product_id?: string
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "D_INVENTORY_distributor_id_fkey"
            columns: ["distributor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_D_INVENTORY_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "PRODUCTS"
            referencedColumns: ["id"]
          },
        ]
      }
      ORDERS: {
        Row: {
          created_at: string
          distributor_id: string
          id: number
          order: Json
          status: Database["public"]["Enums"]["orders_status"]
        }
        Insert: {
          created_at?: string
          distributor_id: string
          id?: number
          order: Json
          status?: Database["public"]["Enums"]["orders_status"]
        }
        Update: {
          created_at?: string
          distributor_id?: string
          id?: number
          order?: Json
          status?: Database["public"]["Enums"]["orders_status"]
        }
        Relationships: [
          {
            foreignKeyName: "public_ORDERS_distributor_id_fkey"
            columns: ["distributor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      PRODUCTS: {
        Row: {
          created_at: string
          description: string | null
          id: string
          imageURL: string
          mrp: number
          name: string
          selling_price: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          imageURL: string
          mrp: number
          name: string
          selling_price: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          imageURL?: string
          mrp?: number
          name?: string
          selling_price?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          username: string | null
          userrole: Database["public"]["Enums"]["user_roles"] | null
        }
        Insert: {
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
          username?: string | null
          userrole?: Database["public"]["Enums"]["user_roles"] | null
        }
        Update: {
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          username?: string | null
          userrole?: Database["public"]["Enums"]["user_roles"] | null
        }
        Relationships: []
      }
      STOCKS: {
        Row: {
          avalable_quantity: number
          created_at: string
          expiry_date: string | null
          id: string
          orderd_quantity: number
          product_id: string
        }
        Insert: {
          avalable_quantity: number
          created_at?: string
          expiry_date?: string | null
          id: string
          orderd_quantity?: number
          product_id: string
        }
        Update: {
          avalable_quantity?: number
          created_at?: string
          expiry_date?: string | null
          id?: string
          orderd_quantity?: number
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_STOCKS_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "PRODUCTS"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_batch_info_to_order:
        | {
            Args: {
              order_id: number
              product_id: string
              key_value: number
              batch_id: string
              quantity_value: number
            }
            Returns: undefined
          }
        | {
            Args: {
              order_id: string
              product_id: string
              key_value: number
              batch_id: string
              quantity_value: number
            }
            Returns: undefined
          }
        | {
            Args: {
              product_id: string
              key_value: number
              batch_id: string
              quantity_value: number
            }
            Returns: undefined
          }
      add_to_d_inventory: {
        Args: {
          distributor_id: string
          product_id: string
          batch_id: string
          batch_quantity: number
        }
        Returns: undefined
      }
    }
    Enums: {
      orders_status:
        | "Pending"
        | "Fulfilled"
        | "Cancelled"
        | "InProcess"
        | "Defected"
      user_roles:
        | "SUPERADMIN"
        | "ADMIN"
        | "DISTRIBUTORS"
        | "UNDEFINED"
        | "SALES"
        | "CUSTOMERS"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
