import { useGetIdentity } from "@refinedev/core";

export const Profile = () => {
  const { data: user } = useGetIdentity<any>();
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};
