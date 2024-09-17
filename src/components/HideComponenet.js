import { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";

function HideComponenet({ children, in: routes }) {
  const { pathname } = useLocation();

  const [allowdToShowChildren, setAllowedToShowChildren] = useState(true);

  useEffect(() => {
    for (let i = 0; i < routes.length; i++) {
      let matched = matchPath({ path: routes[i] }, pathname);
      if (matched) {
        setAllowedToShowChildren(false);
        break;
      } else {
        setAllowedToShowChildren(true);
        continue;
      }
    }
  }, [pathname]);

  return allowdToShowChildren && children;
}

export default HideComponenet;
