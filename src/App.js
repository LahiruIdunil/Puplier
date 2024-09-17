import React, { createContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import ConfirmEmail from "./components/ConfirmEmail";
import LoggedInHomepage from "./pages/LoggedInHomepage";
import NonLoggedInHomepage from "./pages/NonLoggedInHomepage";
import ArticleDetails, { articleLoader } from "./pages/ArticleDetails";
import ArticleSuggestion, {
  articleSuggestionsAction,
  articleSuggestionsLoader,
} from "./pages/ArticleSuggestion";
import Bookmarks from "./pages/Bookmarks";
import DashboardRoot from "./pages/DashboardRoot";
import EditArticle, {
  editArticleAction,
  editArticleLoader,
} from "./pages/EditArticle";
import EditProfileDetails, {
  editProfileAction,
  editProfileLoader,
} from "./pages/EditProfileDetails";
import EditProfileInterests, {
  editInterestAction,
  editInterestsLoader,
} from "./pages/EditProfileInterests";
import EditProfileRoot from "./pages/EditProfileRoot";
import EditRequests, { editRequestsLoader } from "./pages/EditRequests";
import InviteToProfile from "./pages/InviteToProfile";
import MyArticles, { myArticlesLoader } from "./pages/MyArticles";
import NewArticle, { newArticleAction } from "./pages/NewArticle";
import Notifications from "./pages/Notifications";
import OnboardingCreateProfile, {
  onboardingCreateProfileAction,
} from "./pages/OnboardingCreateProfile";
import OnboardingSelectInterests, {
  selectInterestsAction,
} from "./pages/OnboardingSelectInterests";
import SharedWithMe, { sharedWithMePageLoader } from "./pages/SharedWithMe";
import UserProfile, { userProfileDataLoader } from "./pages/UserProfile";
import LoggedInBaseLayout from "./components/LoggedInBaseLayout";
import NonLoggedInBaseLayout from "./components/NonLoggedInBaseLayout";
import SearchResults, { searchResultsLoader } from "./pages/SearchResults";
import CategoryArchive from "./pages/CategoryArchive";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useHttp from "./custom-hooks/useHttp";
import useFindArticlesByUser from "./custom-hooks/useFindArticlesByUser";
import { createReviewRequestAction } from "./components/InviteModal";
import SuggestChangesToArticle, {
  suggestChangesAction,
  suggestChangesLoader,
} from "./pages/SuggestChangesToArticle";

// actions
import { LoginAction } from "./components/LoginModal";
import { singupAction } from "./components/SignUpModal";
import { replyForReviewRequestAction } from "./components/dashboard/edit-requests-tab/PendingEditRequestItem";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

export const authContext = createContext();
export const loginContext = createContext();
export const signupContext = createContext();

function App() {
  const { sendRequest } = useHttp();
  const { findArticlesByUser } = useFindArticlesByUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  // status = true/false, value = user object
  const setAuth = (status, value = null) => {
    if (status) {
      localStorage.setItem("user", JSON.stringify(value));
    } else {
      localStorage.removeItem("user");
    }

    setIsAuthenticated(status);
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? (
        <authContext.Provider value={{ isAuthenticated, setAuth }}>
          <LoggedInBaseLayout />
        </authContext.Provider>
      ) : (
        <authContext.Provider value={{ isAuthenticated, setAuth }}>
          <loginContext.Provider value={{ showLoginModal, setShowLoginModal }}>
            <signupContext.Provider
              value={{ showSignupModal, setShowSignupModal }}
            >
              <NonLoggedInBaseLayout />
            </signupContext.Provider>
          </loginContext.Provider>
        </authContext.Provider>
      ),
      action: LoginAction(sendRequest),
      children: [
        {
          index: true,
          element: isAuthenticated ? (
            <LoggedInHomepage />
          ) : (
            <NonLoggedInHomepage />
          ),
        },
        {
          path: "signup",
          action: singupAction(sendRequest),
          children: [
            {
              index: true,
              element: <Navigate to="/?signup=true" />,
            },
            {
              path: "onboarding",
              children: [
                {
                  path: "profile",
                  element: <OnboardingCreateProfile />,
                  action: onboardingCreateProfileAction(sendRequest),
                },
                {
                  path: "interest",
                  element: <OnboardingSelectInterests />,
                  action: selectInterestsAction(sendRequest),
                },
              ],
            },
          ],
        },
        {
          path: "confirm/:token",
          element: <ConfirmEmail />,
        },
        {
          path: "user/:username",
          element: <UserProfile />,
          loader: userProfileDataLoader(findArticlesByUser, sendRequest),
        },
        {
          path: "dashboard/my-articles/new",
          element: <NewArticle />,
          action: newArticleAction(sendRequest),
        },
        {
          path: "dashboard",
          element: <DashboardRoot />,
          children: [
            {
              path: "my-articles",
              element: <MyArticles />,
              action: createReviewRequestAction(sendRequest),
              loader: myArticlesLoader(findArticlesByUser),
            },
            {
              path: "edit-requests",
              element: <EditRequests />,
              loader: editRequestsLoader(sendRequest),
            },
            {
              path: "shared-with-me",
              element: <SharedWithMe />,
              loader: sharedWithMePageLoader(sendRequest),
              action: replyForReviewRequestAction(sendRequest),
            },
            {
              path: "invite",
              element: <InviteToProfile />,
            },
            {
              path: "notifications",
              element: <Notifications />,
            },
            {
              path: "bookmarks",
              element: <Bookmarks />,
            },
          ],
        },
        {
          path: "article",
          children: [
            {
              path: ":id/:slug",
              element: <ArticleDetails />,
              loader: articleLoader(sendRequest),
            },
            {
              path: ":id/edit",
              element: <EditArticle />,
              loader: editArticleLoader(sendRequest),
              action: editArticleAction(sendRequest),
            },
            {
              path: ":id/suggest-changes",
              element: <SuggestChangesToArticle />,
              loader: suggestChangesLoader(sendRequest),
              action: suggestChangesAction(sendRequest),
            },
          ],
        },
        {
          path: "review-request/:review_request_id/view-suggestions",
          element: <ArticleSuggestion />,
          loader: articleSuggestionsLoader(sendRequest),
          action: articleSuggestionsAction(sendRequest),
        },
        {
          path: "search/:query/:pageNumber",
          element: <SearchResults />,
          loader: searchResultsLoader(sendRequest),
        },
        {
          path: "category/:category_name",
          element: <CategoryArchive />,
        },
        {
          path: "profile/edit",
          element: <EditProfileRoot />,
          children: [
            {
              path: "details",
              element: <EditProfileDetails />,
              loader: editProfileLoader(sendRequest),
              action: editProfileAction(sendRequest),
            },
            {
              path: "interests",
              element: <EditProfileInterests />,
              loader: editInterestsLoader(sendRequest),
              action: editInterestAction(sendRequest),
            },
          ],
        },
        {
          path: "about-us",
          element: <AboutUs />,
        },
        {
          path: "contact-us",
          element: <ContactUs />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "terms-and-conditions",
          element: <TermsAndConditions />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
