import { Outlet, RouteObject } from "react-router-dom";
import { PageError } from "./pages/ErrorPage";
import { Home } from "./pages/Home";
import { Layout } from "./ui/Layout";
import { FollowPage } from "./pages/FollowPage";
import { ReadPage } from "./pages/ReadPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <PageError />,
    children: [
      { path: "", element: <Home /> },
      { path: "follow", element: <FollowPage /> },
      { path: "read", element: <ReadPage /> },
    ],
  },
];
