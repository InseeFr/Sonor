import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { WrappedRender } from "../WrappedRender";
import { SelectWithCheckbox } from "./SelectWithCheckbox";
import userEvent from "@testing-library/user-event";

describe("SelectWithCheckbox component", () => {
  it("should render select without search field ", () => {
    const interviewersMock = [
      {
        label: "john Doe",
        value: "1",
      },
      { label: "james Doe", value: "2" },
      { label: "Jean Dupont", value: "3" },
    ];
    const label = "interviewer";

    const toggleSearchFilterMock = vi.fn();
    WrappedRender(
      <SelectWithCheckbox
        label={label}
        name={"interviewer"}
        options={interviewersMock}
        toggleSearchFilter={toggleSearchFilterMock}
        filters={{
          campaigns: [],
          ssech: [],
          interviewer: [],
          states: [],
          closingCause: [],
          priority: [],
          all: [],
        }}
      />,
    );

    const select = screen.getByText(label);

    expect(select).toBeInTheDocument();

    fireEvent.click(select);

    expect(screen.getByText("john Doe")).toBeInTheDocument();
    expect(screen.getByText("james Doe")).toBeInTheDocument();
    // verify if search field label is not in the document
    expect(screen.queryByText("Recherche")).not.toBeInTheDocument();
  });

  it("should render select with search field and filtered", async () => {
    const interviewersMock = [
      {
        label: "John Doe",
        value: "1",
      },
      { label: "Paul Dupont", value: "2" },
    ];
    const label = "interviewer";

    const toggleSearchFilterMock = vi.fn();
    WrappedRender(
      <SelectWithCheckbox
        label={label}
        name={"interviewer"}
        options={interviewersMock}
        toggleSearchFilter={toggleSearchFilterMock}
        filters={{
          campaigns: [],
          ssech: [],
          interviewer: [],
          states: [],
          closingCause: [],
          priority: [],
          all: [],
        }}
        canSearch={true}
      />,
    );

    fireEvent.click(screen.getByText(label));

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Paul Dupont")).toBeInTheDocument();
    await waitFor(() => userEvent.type(screen.getByRole("textbox"), "J"));
    await waitForElementToBeRemoved(screen.queryByText("Paul Dupont"));

    expect(screen.queryByText("Paul Dupont")).not.toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should correctly call toggleSearchFilter", () => {
    const interviewersMock = [
      {
        label: "John Doe",
        value: "1",
      },
      { label: "Paul Dupont", value: "2" },
    ];
    const label = "interviewer";

    const toggleSearchFilterMock = vi.fn();
    WrappedRender(
      <SelectWithCheckbox
        label={label}
        name={"interviewer"}
        options={interviewersMock}
        toggleSearchFilter={toggleSearchFilterMock}
        filters={{
          campaigns: [],
          ssech: [],
          interviewer: [],
          states: [],
          closingCause: [],
          priority: [],
          all: [],
        }}
        canSearch={true}
      />,
    );

    fireEvent.click(screen.getByText(label));
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Paul Dupont")).toBeInTheDocument();

    fireEvent.click(screen.getByText("John Doe"));
    expect(toggleSearchFilterMock).toHaveBeenCalledWith("interviewer", "1");
  });
});
