import React from "react";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import SearchField from "../SearchField/SearchField";
import PaginationNav from "../PaginationNav/PaginationNav";
import SurveyUnitLine from "./SurveyUnitLine";
import D from "../../i18n";
import Utils from "../../utils/Utils";
import { SUTableHeader } from "./SUTableHeader";
import { SUTableHeaderParameters } from "./SUTableHeaderParameters";

const getInitiatedDate = (reminder) =>
  reminder.status.find((status) => status.status === "INITIATED")?.date ?? 0;

const orderReminders = (reminders) => {
  reminders.sort((a, b) => getInitiatedDate(b) - getInitiatedDate(a));
};

function makeTableForExport(data, communicationRequestConfiguration) {
  const headerTitle = [
    [
      D.identifier,
      D.interviewer,
      D.idep,
      D.ssech,
      D.department,
      D.town,
      D.state,
    ],
  ];

  if (communicationRequestConfiguration) {
    let maxReminders = 0;

    headerTitle[0].splice(headerTitle[0].length - 1, 0, D.totalReminders);

    data.forEach((survey) => {
      const length =
        survey.communicationRequests?.filter(
          (request) =>
            request.emiter === "INTERVIEWER" && request.type === "REMINDER"
        )?.length ?? 0;
      length > maxReminders && (maxReminders = length);
    });

    maxReminders !== 0 &&
      headerTitle[0].splice(
        headerTitle[0].length - 1,
        0,
        Array.from(new Array(maxReminders)).reduce((previous) => {
          return [
            ...previous,
            D.reminderMediumExportLabel,
            D.reminderReasonExportLabel,
            D.reminderDateExportLabel,
          ];
        }, [])
      );

    headerTitle[0].splice(
      headerTitle[0].length - 1,
      0,
      D.contactOutcomeLabel,
      D.contactOutcomeDateLabel
    );
  }

  const header = headerTitle;

  return communicationRequestConfiguration
    ? header.concat(
        data.map((line) => {
          const reminders =
            line.communicationRequests?.filter(
              (request) =>
                request.emiter === "INTERVIEWER" && request.type === "REMINDER"
            ) ?? [];
          orderReminders(reminders);

          const reminderInformationsToExport = reminders.reduce(
            (previous, current) => {
              const initiatedStatus = current.status.find(
                (status) => status.status === "INITIATED"
              );
              return [
                ...previous,
                D[current.medium?.toLowerCase()] ?? "",
                D[current.reason?.toLowerCase()] ?? "",
                Utils.convertToDateString(new Date(initiatedStatus.date)),
              ];
            },
            []
          );

          return reminders.length !== 0
            ? [
                line.id,
                line.interviewer,
                line.idep,
                line.ssech,
                line.departement?.substring(0, 2),
                line.city,
                reminders.length,
                [...reminderInformationsToExport],
                line.contactOutcome?.type ? D[line.contactOutcome.type] : "",
                line.contactOutcome?.date
                  ? Utils.convertToDateString(
                      new Date(line.contactOutcome.date)
                    )
                  : "",
                line.state,
              ]
            : [
                line.id,
                line.interviewer,
                line.idep,
                line.ssech,
                line.departement?.substring(0, 2),
                line.city,
                reminders.length,
                line.contactOutcome?.type ? D[line.contactOutcome.type] : "",
                line.contactOutcome?.date
                  ? Utils.convertToDateString(
                      new Date(line.contactOutcome.date)
                    )
                  : "",
                line.state,
              ];
        })
      )
    : header.concat(
        data.map((line) => {
          return [
            line.id,
            line.interviewer,
            line.idep,
            line.ssech,
            line.departement?.substring(0, 2),
            line.city,
            line.state,
          ];
        })
      );
}

class SUTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: { size: 10, page: 1 },
      displayedLines: props.data,
      checkboxArray: props.data.reduce((acc, curr) => {
        if (
          curr.state !== "CLO" &&
          curr.state !== "TBR" &&
          curr.state !== "FIN"
        ) {
          acc[curr.id] = false;
        }
        return acc;
      }, {}),
      checkAll: false,
      show: false,
      stateModified: "",
    };
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      this.setState({ displayedLines: data });
      const newCheckboxArray = data.reduce((acc, curr) => {
        if (
          curr.state !== "CLO" &&
          curr.state !== "TBR" &&
          curr.state !== "FIN"
        ) {
          acc[curr.id] = false;
        }
        return acc;
      }, {});
      this.setState({ checkboxArray: newCheckboxArray, checkAll: false });
    }
  }

  handlePageChange(pagination) {
    this.setState({ pagination });
  }

  handleCheckAll(e) {
    const { checkboxArray } = this.state;
    const newCheckboxArray = Object.keys(checkboxArray).reduce((acc, curr) => {
      acc[curr] = e.target.checked;
      return acc;
    }, {});
    this.setState({
      checkboxArray: newCheckboxArray,
      checkAll: e.target.checked,
    });
  }

  toggleCheckBox(i) {
    const { checkboxArray } = this.state;
    const newCheckboxArray = { ...checkboxArray };
    newCheckboxArray[i] = !newCheckboxArray[i];
    this.setState({
      checkboxArray: newCheckboxArray,
      checkAll: !Object.values(newCheckboxArray).some((elm) => !elm),
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  isDisabled() {
    const { checkboxArray } = this.state;
    return !Object.values(checkboxArray).some((elm) => elm);
  }

  validate() {
    const { validateChangingState } = this.props;
    const { checkboxArray, stateModified } = this.state;
    const lstSUChangingState = Object.entries(checkboxArray)
      .filter((su) => su[1])
      .map((su) => su[0]);
    validateChangingState(lstSUChangingState, stateModified);
  }

  handleExport() {
    const { data, survey, site } = this.props;
    const fileLabel = `${site}_${survey.label}_UE_confiees`;
    const title = `${fileLabel}_${new Date()
      .toLocaleDateString()
      .replace(/\//g, "")}.csv`.replace(/ /g, "_");
    const table = makeTableForExport(
      data,
      survey.communicationRequestConfiguration
    );
    const csvContent = `data:text/csv;charset=utf-8,\ufeff${table
      .map((e) => e.join(";"))
      .join("\n")}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", title);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  updateLines(matchingLines) {
    const { pagination, checkboxArray } = this.state;
    const newCheckboxArray = Object.keys(checkboxArray).reduce((acc, curr) => {
      acc[curr] = false;
      return acc;
    }, {});
    this.setState({
      checkboxArray: newCheckboxArray,
      checkAll: false,
      pagination: { size: pagination.size, page: 1 },
      displayedLines: matchingLines,
    });
  }

  render() {
    const { data, sort, handleSort, isLoading, survey } = this.props;
    const fieldsToSearch = ["city", "interviewer", "id", "state"];
    const {
      pagination,
      displayedLines,
      checkboxArray,
      checkAll,
      show,
      stateModified,
    } = this.state;
    const toggleCheckBox = (i) => {
      this.toggleCheckBox(i);
    };
    function handleSortFunct(property) {
      return () => {
        handleSort(property);
      };
    }

    return (
      <Card className="ViewCard">
        <Card.Title className="PageTitle">
          {D.surveyUnitsAllocatedToTheOU}
          {isLoading ? "" : data.length}
          {!data.length || isLoading || (
            <Button
              className="ExportButton"
              data-testid="export-button"
              onClick={() => this.handleExport()}
            >
              Export
            </Button>
          )}
        </Card.Title>
        {isLoading ? (
          <Spinner
            className="loadingSpinner"
            animation="border"
            variant="primary"
          />
        ) : (
          <>
            {data.length > 0 ? (
              <div>
                <Row>
                  <Col xs="12" className="text-right">
                    <SearchField
                      data={data}
                      searchBy={fieldsToSearch}
                      updateFunc={(matchinglines) =>
                        this.updateLines(matchinglines)
                      }
                    />
                  </Col>
                  <Col xs="6">
                    <PaginationNav.SizeSelector
                      updateFunc={(newPagination) =>
                        this.handlePageChange(newPagination)
                      }
                    />
                  </Col>
                  <Col xs="6" className="text-right">
                    <span>
                      {D.result}
                      {displayedLines.length}/{data.length}
                      &nbsp;
                      {D.units}
                    </span>
                  </Col>
                </Row>
                <Table
                  id="SUTable"
                  className="CustomTable"
                  bordered
                  striped
                  hover
                  responsive
                  size="sm"
                >
                  <thead>
                    <tr>
                      <th className="ColCheckbox">
                        <input
                          type="checkbox"
                          name="checkAll"
                          checked={checkAll}
                          onChange={(e) => this.handleCheckAll(e)}
                        />
                      </th>
                      {SUTableHeaderParameters.map(
                        (parameters) =>
                          (parameters.isVisibleWithoutActivatedConfiguration ||
                            survey.communicationRequestConfiguration) &&
                          (parameters.sortValue ? (
                            <SUTableHeader
                              {...parameters}
                              handleSortFunction={handleSortFunct(
                                parameters.sortValue
                              )}
                              sort={sort}
                              key={parameters.label}
                            />
                          ) : (
                            <SUTableHeader
                              {...parameters}
                              key={parameters.label}
                            />
                          ))
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {displayedLines
                      .slice(
                        (pagination.page - 1) * pagination.size,
                        Math.min(
                          pagination.page * pagination.size,
                          displayedLines.length
                        )
                      )
                      .map((line) => {
                        const reminders =
                          line.communicationRequests?.filter(
                            (request) =>
                              request.emiter === "INTERVIEWER" &&
                              request.type === "REMINDER"
                          ) ?? [];

                        orderReminders(reminders);

                        return (
                          <SurveyUnitLine
                            key={line.id}
                            lineData={{ ...line, remindersByOrder: reminders }}
                            isChecked={checkboxArray[line.id]}
                            updateFunc={() => toggleCheckBox(line.id)}
                            communicationRequestConfiguration={
                              survey.communicationRequestConfiguration
                            }
                          />
                        );
                      })}
                  </tbody>
                </Table>
                <div className="tableOptionsWrapper">
                  <PaginationNav.PageSelector
                    pagination={pagination}
                    updateFunc={(newPagination) => {
                      this.handlePageChange(newPagination);
                    }}
                    numberOfItems={displayedLines.length}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={this.isDisabled()}
                  data-testid="validate-su"
                  onClick={() => this.handleShow()}
                >
                  {D.modified}
                </button>
                <Modal show={show} onHide={() => this.handleClose()}>
                  <Modal.Header closeButton>
                    <Modal.Title>{D.modaleModifiedText}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>{D.state}</Form.Label>
                      <Form.Control
                        as="select"
                        custom
                        placeholder={D.modaleModifiedText}
                        defaultValue={-1}
                        onChange={(e) =>
                          this.setState({ stateModified: e.target.value })
                        }
                      >
                        <option disabled value={-1} key={-1}>
                          {D.modaleModifiedText}
                        </option>
                        <option>{D.NPA}</option>
                        <option>{D.NPI}</option>
                        <option>{D.NPX}</option>
                        <option>{D.ROW}</option>
                      </Form.Control>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      data-testid="close-modal"
                      onClick={() => this.handleClose()}
                    >
                      {D.cancel}
                    </Button>
                    <Button
                      variant="primary"
                      disabled={!stateModified || stateModified === -1}
                      data-testid="confirm-validate"
                      onClick={() => {
                        this.validate();
                        this.handleClose();
                      }}
                    >
                      {D.validate}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ) : (
              <span>{D.noListSuToDisplay}</span>
            )}
          </>
        )}
      </Card>
    );
  }
}

export default SUTable;
