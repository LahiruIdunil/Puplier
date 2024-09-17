import { Outlet } from "react-router-dom";
import DashboardBottomNavBar from "../components/dashboard/DashboardBottomNavBar";
import ArticlesYouMayLikeBar from "../components/ArticlesYouMayLikeBar";
import DashboardNavBar from "../components/dashboard/DashboardNavBar";
import classes from "./DashboardRoot.module.css";

function DashboardRoot() {
  return (
    <div className={`container customContainer ${classes.dashboardContainer}`}>
      <div className="row">
        <div className="col-auto d-lg-block d-none">
          <div className={`${classes.navBarContainer}`}>
            <DashboardNavBar />
          </div>
        </div>
        <div className="col">
          <Outlet />
        </div>
        <div className="col-12 d-lg-none d-block">
          <DashboardBottomNavBar />
        </div>
        <div
          className={`col-xxl-auto col-12 ${classes.leftSideBarContainerParent}`}
        >
          <div className={`${classes.leftSideBarContainer}`}>
            <ArticlesYouMayLikeBar title="You may also like" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardRoot;
