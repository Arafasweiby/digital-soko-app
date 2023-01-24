import { ChakraProvider, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RecoilRoot, useRecoilValue } from "recoil";
import { auth } from "../lib/firebase";
import { accountState } from "../recoil/account";
import "../styles/globals.css";
import theme from "../utils/theme";
import { showToast } from "../utils/ui";

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        {Component.auth ? (
          <Auth userType={Component.userType}>
            <div className="bg-soko-light-blue min-h-screen">
              <Layout />
              <Component {...pageProps} />
            </div>
          </Auth>
        ) : (
          <>
            <div className="bg-soko-light-blue min-h-screen">
              <Layout />
              <Component {...pageProps} />
            </div>
          </>
        )}
      </ChakraProvider>
    </RecoilRoot>
  );
}

function Auth({ userType, children }) {
  const toast = useToast();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const account = useRecoilValue(accountState);

  useEffect(() => {
    if (error) router.replace("/login");
    if (!user && !loading) router.replace("/login");
  }, [error, loading, router, user, userType]);

  if (loading) return <p>Loading...</p>;

  if (user) return children;
}
