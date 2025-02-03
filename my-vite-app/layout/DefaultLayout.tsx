import Header from "../src/components/Haeder/Header.tsx";
import {Outlet} from "react-router-dom";
import {Stack} from "@mui/material";

const MainLayout = () => {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
      <Header />
      <main>
        <Outlet />
      </main>
    </Stack>
  );
};

export default MainLayout;