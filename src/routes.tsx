import { Outlet, RouteObject } from "react-router-dom";
import { PageError } from "./pages/ErrorPage";
import { Home } from "./pages/Home";
import { Layout } from "./ui/Layout";
import { FollowPage } from "./pages/FollowPage";
import { ReadPage } from "./pages/ReadPage";
import { ClosePage } from "./pages/ClosePage";
import { NotifyPage } from "./pages/NotifyPage";
import { CollectOrganizationPage } from "./pages/CollectOrganizationPage";
import { ReassignmentPage } from "./pages/ReassignmentPage";
import { FollowInterviewerPage } from "./pages/FollowInterviewerPage";
import { FollowCampaignPage } from "./pages/FollowCampaignPage";
import { FollowOrganizationUnitPage } from "./pages/FollowOrganizationUnitPage";

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
      { path: "follow/interviewer/:id", element: <FollowInterviewerPage /> },
      { path: "follow/campaign/:id", element: <FollowCampaignPage /> },
      { path: "follow/organization-unit/:id", element: <FollowOrganizationUnitPage /> },
      { path: "read", element: <ReadPage /> },
      { path: "close", element: <ClosePage /> },
      { path: "notify", element: <NotifyPage /> },
      { path: "collectOrganization", element: <CollectOrganizationPage /> },
      { path: "reassignment", element: <ReassignmentPage /> },
    ],
  },
];
