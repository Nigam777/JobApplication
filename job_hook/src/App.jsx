import "./App.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import { Notifications } from "@mantine/notifications";

import AppRoutes from "./Pages/AppRoutes";
import Header from "./Header/Header";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./Store/Store";
import { BrowserRouter } from "react-router-dom";
import { setProfile } from "./Slices/ProfileSlice";
import ProfileService from "./Services/ProfileService";
import { useEffect } from "react";

const theme = {
  focusRing: "never",
  fontFamily: "Poppins, sans-serif",
  primaryColor: "brightSun",
  colors: {
    brightSun: [
      "#fffbeb",
      "#fff3c6",
      "#ffe588",
      "#ffd149",
      "#ffbd20",
      "#f99b07",
      "#dd7302",
      "#b75006",
      "#943c0c",
      "#7a330d",
      "#461902",
    ],
    mineShaft: [
      "#f6f6f6",
      "#e7e7e7",
      "#d1d1d1",
      "#b0b0b0",
      "#888888",
      "#6d6d6d",
      "#5d5d5d",
      "#4f4f4f",
      "#454545",
      "#3d3d3d",
      "#2d2d2d",
    ],
  },
  primaryShade: 4,
};

const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);

const AppWithStore = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if (user && !profile?.id) {
      ProfileService.getProfile(user.id).then((res) => {
        dispatch(setProfile(res));
      });
    }
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
};

function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications position="top-center" zIndex={1000} />
        <AppWithStore />
      </MantineProvider>
    </Provider>
  );
}

export default App;
