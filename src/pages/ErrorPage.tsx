import { Navigate, useRouteError } from "react-router-dom";

export function PageError() {
  const error = useRouteError();
  console.log(error);

  if (error && typeof error === "object" && "status" in error && error.status === 404) {
    return <Navigate to="/" />;
  }

  return <div>Wrong behavior</div>;
}
