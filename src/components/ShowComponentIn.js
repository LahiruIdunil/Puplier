import { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";

function ShowComponentIn({ children, in: routes }) {
  const { pathname } = useLocation();

  const [allowdToShowChildren, setAllowedToShowChildren] = useState(false);

  useEffect(() => {
    for (let i = 0; i < routes.length; i++) {
      let matched = matchPath({ path: routes[i] }, pathname);
      if (matched) {
        setAllowedToShowChildren(true);
        break;
      } else {
        setAllowedToShowChildren(false);
        continue;
      }
    }
  }, [pathname]);

  return allowdToShowChildren && children;
}

export default ShowComponentIn;
