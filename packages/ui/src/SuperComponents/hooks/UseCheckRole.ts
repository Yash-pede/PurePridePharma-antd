import { useEffect, useState } from "react";
import { HttpError, useGetIdentity, useOne } from "@refinedev/core";
import { UserRoleTypes } from "@repo/utility";
import { Profiles } from "@repo/graphql";

export const useUserRoleCheck = (email: string, userType: UserRoleTypes) => {
  const [isUserValid, setIsUserValid] = useState(false);
  const { data: user, isFetching: isUserFetching, error } = useGetIdentity<{ id: string; email: string }>();
  const { data: User_DB } = useOne<Profiles, HttpError>({
    resource: "profiles",
    id: user?.id,
  });

  if (error) console.error("user role check failed ", error);

  useEffect(() => {
    if (!isUserFetching && user && User_DB) {
      const isUserAuthorized = user.email === email && (User_DB.data.userrole as UserRoleTypes) === userType;
      setIsUserValid(isUserAuthorized);
    }
  }, [isUserFetching, user, User_DB, email, userType]);

  return isUserValid;
};
