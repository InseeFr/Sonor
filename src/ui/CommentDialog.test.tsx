import { fireEvent, screen, waitFor } from "@testing-library/react";
import { WrappedRender } from "../WrappedRender";
import { CommentDialog } from "./CommentDialog";
import userEvent from "@testing-library/user-event";
import * as hooks from "../hooks/useFetchQuery";
import { UseMutationResult } from "@tanstack/react-query";
import { APIEndpoints, APIMethods, APIRequest } from "../types/api";
import { APIError } from "../functions/api";
import { beforeEach } from "vitest";

describe("CommentDialog component", () => {
  const onCloseMock = vi.fn();
  const surveyUnitId = "suId";
  const mockMutationFunction = vi.fn();

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    const mockedResponse = {
      mutateAsync: mockMutationFunction,
      mutationFn: vi.fn(),
    } as unknown as UseMutationResult<
      never,
      APIError,
      Omit<APIRequest<keyof APIEndpoints, APIMethods<keyof APIEndpoints>>, "method">,
      unknown
    >;

    vi.spyOn(hooks, "useFetchMutation").mockReturnValue(mockedResponse);
  });

  it("should render CommentDialog without comment and call onClose", () => {
    WrappedRender(<CommentDialog open={true} onClose={onCloseMock} surveyUnitId={surveyUnitId} />);

    expect(screen.getByText(/ue n° suid/i)).toBeInTheDocument();
    expect(screen.getByText("valider")).toBeInTheDocument();
    expect(screen.getByText("valider")).toBeDisabled();
    expect(screen.getByText("annuler")).toBeInTheDocument();
    fireEvent.click(screen.getByText("annuler"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should render CommentDialog without comment and change validate button disability", async () => {
    WrappedRender(<CommentDialog open={true} onClose={onCloseMock} surveyUnitId={surveyUnitId} />);
    const validateButton = screen.getByText("valider");
    expect(validateButton).toBeDisabled();
    await waitFor(() => userEvent.type(screen.getByRole("textbox"), "comment"));
    expect(validateButton).not.toBeDisabled();
    await waitFor(() => userEvent.click(validateButton));
    expect(mockMutationFunction).toHaveBeenCalledWith({
      body: {
        "type": "MANAGEMENT",
        "value": "comment",
      },
      urlParams: {
        "id": "suId",
      },
    });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should render CommentDialog with a comment", async () => {
    WrappedRender(
      <CommentDialog open={true} comment="comment" onClose={onCloseMock} surveyUnitId={surveyUnitId} />,
    );

    expect(screen.getByText(/ue n° suid/i)).toBeInTheDocument();
    expect(screen.getByText("fermer")).toBeInTheDocument();
    expect(screen.getByText("supprimer")).toBeInTheDocument();
    expect(screen.getByText("comment")).toBeInTheDocument();

    await waitFor(() => userEvent.type(screen.getByRole("textbox"), " text"));
    expect(screen.getByText("comment text")).toBeInTheDocument();
    expect(screen.getByText("valider")).toBeInTheDocument();
    expect(screen.getByText("annuler")).toBeInTheDocument();
  });

  it("should render CommentDialog with a comment and close dialog on delete", async () => {
    WrappedRender(
      <CommentDialog open={true} comment="comment" onClose={onCloseMock} surveyUnitId={surveyUnitId} />,
    );

    const deleteButton = screen.getByText("supprimer");
    expect(deleteButton).toBeInTheDocument();
    await waitFor(() => userEvent.click(deleteButton));
    expect(mockMutationFunction).toHaveBeenCalledWith({
      body: {
        "type": "MANAGEMENT",
        "value": "",
      },
      urlParams: {
        "id": "suId",
      },
    });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
