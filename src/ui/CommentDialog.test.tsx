import { fireEvent, screen, waitFor } from "@testing-library/react";
import { WrappedRender } from "../WrappedRender";
import { CommentDialog } from "./CommentDialog";
import userEvent from "@testing-library/user-event";

describe("CommentDialog component", () => {
  const onCloseMock = vi.fn();
  const surveyUnitId = "suId";

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
    userEvent.click(validateButton);
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
    userEvent.click(deleteButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
