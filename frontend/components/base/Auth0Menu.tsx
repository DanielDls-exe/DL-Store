import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";
import userDefault from "@/public/user_default.png";
import tw from "twin.macro";

export const Auth0Menu = () => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  return (
    <div tw="flex gap-2 justify-center items-center">
      <button
        css={[
          tw`bg-slate-500 text-white flex gap-2 items-center uppercase transition-all  pr-4 rounded-full hover:bg-core`,
          !isAuthenticated && tw`py-2 px-4`,
        ]}
        onClick={() => loginWithRedirect()}
      >
        {!isAuthenticated && (
          <>
            <FaUserAlt /> Log In
          </>
        )}
        {isAuthenticated && (
          <>
            <img
              tw="w-10 rounded-full"
              src={user.picture || userDefault.src}
              alt={`${user.nickname}-image`}
            />
            {user.nickname}
          </>
        )}
      </button>
      {isAuthenticated && (
        <button
          tw="text-[#d4a373] bg-[#ccd5ae] hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-white dark:hover:bg-[#ccd5ae] hover:scale-110"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <BiLogOut />
        </button>
      )}
    </div>
  );
};
