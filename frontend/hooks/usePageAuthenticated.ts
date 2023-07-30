import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export const usePageAuthenticated = () => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      getAccessTokenSilently().then((token) => {
        console.log(`TOKEN: ${token}`);
      });
    }
  }, [isAuthenticated, loginWithRedirect, getAccessTokenSilently]);

  return { isAuthenticated };
};
