import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
        Root layout here

        <Outlet />
    </div>
  );
}

export default RootLayout;