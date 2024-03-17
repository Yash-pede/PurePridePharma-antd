import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://krtkfjphiovnpjawcxwo.supabase.co";
export const SUPABASE_PROJECT_ID = "krtkfjphiovnpjawcxwo";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGtmanBoaW92bnBqYXdjeHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MDQzNzMsImV4cCI6MjAxNzE4MDM3M30.rNWu78HUY5Yk6zTegL0Z0-dCiTqkU6wIifiTJQ3S_wQ";
const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGtmanBoaW92bnBqYXdjeHdvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTYwNDM3MywiZXhwIjoyMDE3MTgwMzczfQ.QHwa4JaXnRJwKUqUaV1LBZBMB3icITqI98RhPiwgNIs";
export const supabaseClient: ReturnType<any> = createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: true,
    },
  },
);
export const supabaseServiceRoleClient: ReturnType<any> = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: true,
    },
  },
);
