import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Redirect } from 'react-router-dom';
import PaginationNav from '../PaginationNav/PaginationNav';
import SearchField from '../SearchField/SearchField';
import SurveySelector from '../SurveySelector/SurveySelector';
import InterviewerSelector from '../InterviewerSelector/InterviewerSelector';
import FollowUpTable from './FollowUpTable';
import C from '../../utils/constants.json';
import D from '../../i18n';
import Utils from '../../utils/Utils';

class MonitoringTable extends React.Component {
  constructor(props) {
    super(props);
    const mode = Utils.getMonitoringTableModeFromPath(props.location.pathname);
    const { survey, interviewer } = props.location;
    this.state = {
      pagination: { size: 10, page: 1 },
      displayedLines: [],
      date: null,
      survey,
      interviewer,
      mode,
      redirect: ((mode === C.BY_INTERVIEWER_ONE_SURVEY || mode === C.BY_SITE) && !survey)
        || (mode === C.BY_SURVEY_ONE_INTERVIEWER && !interviewer)
        ? '/' : null,
      loading: true,
    };
    this.componentIsMounted = false;
  }

  componentDidMount() {
    this.componentIsMounted = true;
    this.refreshData();
  }

  componentDidUpdate(prevprops) {
    const { location } = this.props;
    if (location.pathname !== prevprops.location.pathname) {
      this.refreshData();
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  async refreshData() {
    const { dataRetreiver, location } = this.props;
    const { survey, interviewer } = location;
    const { date } = this.state;
    const dateToUse = date || new Date().toISOString().slice(0, 10);
    const modeToUse = Utils.getMonitoringTableModeFromPath(location.pathname);
    const paginationToUse = { size: 5, page: 1 };
    let surveyToUse;
    if (interviewer) {
      surveyToUse = interviewer;
    } else if (modeToUse !== C.BY_INTERVIEWER_ONE_SURVEY && modeToUse !== C.BY_SITE) {
      surveyToUse = await dataRetreiver.getDataForMainScreen();
    } else {
      surveyToUse = survey;
    }
    if (surveyToUse) {
      dataRetreiver.getDataForMonitoringTable(
        surveyToUse, new Date(dateToUse).getTime(), paginationToUse, modeToUse,
        (res) => {
          const newData = {};
          Object.assign(newData, res);
          newData.date = dateToUse;
          newData.pagination = paginationToUse;
          if (this.componentIsMounted) {
            this.setState({
              date: dateToUse,
              survey,
              interviewer,
              displayedLines: newData.linesDetails,
              data: newData,
              mode: modeToUse,
              redirect: null,
              loading: false,
              sort: { sortOn: null, asc: null },
            }, () => {
              let firstColumnSortAttribute;
              if (modeToUse === C.BY_SURVEY || modeToUse === C.BY_SURVEY_ONE_INTERVIEWER) {
                firstColumnSortAttribute = 'survey';
              } else if (modeToUse === C.BY_SITE) {
                firstColumnSortAttribute = 'site';
              } else {
                firstColumnSortAttribute = 'CPinterviewer';
              }
              this.handleSort(firstColumnSortAttribute, true);
            });
          }
        },
      );
    } else {
      this.setState({ redirect: '/' });
    }
  }

  handlePageChange(pagination) {
    this.setState({ pagination });
  }

  updateInterviewers(matchingLines) {
    const { pagination } = this.state;
    this.setState({
      pagination: { size: pagination.size, page: 1 },
      displayedLines: matchingLines,
    });
  }

  handleExport() {
    const {
      data, survey, mode, date, interviewer,
    } = this.state;
    let fileLabel;
    if (mode === C.BY_SURVEY) {
      fileLabel = `${data.site}_Avancement enquetes`;
    } else if (mode === C.BY_SURVEY_ONE_INTERVIEWER) {
      fileLabel = `${interviewer.interviewerFirstName}_${interviewer.interviewerLastName}_Avancement`;
    } else if (mode === C.BY_SITE) {
      fileLabel = `${survey.label}_Avancement sites`;
    } else if (mode === C.BY_INTERVIEWER) {
      fileLabel = `${data.site}_Avancement enqueteurs`;
    } else {
      fileLabel = `${data.site}_${survey.label}_Avancement enqueteurs`;
    }
    const title = `${fileLabel}_${new Date(date).toLocaleDateString().replace(/\//g, '')}.csv`.replace(/ /g, '_');
    const table = makeTableForExport(data, mode);
    const csvContent = `data:text/csv;charset=utf-8,\ufeff${table.map((e) => e.join(';')).join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', title);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  handleSort(property, asc) {
    const { data, sort } = this.state;
    const [sortedData, newSort] = Utils.handleSort(property, data, sort, 'monitoringTable', asc);
    this.setState({ data: sortedData, sort: newSort });
  }

  render() {
    const {
      survey, data, displayedLines, pagination, date, mode, redirect, sort, loading, interviewer,
    } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }
    if (loading) {
      return [];
    }

    let tableTitle = false;
    let selector = false;
    if (!!interviewer && mode === C.BY_SURVEY_ONE_INTERVIEWER) {
      tableTitle = (<div className="SurveyTitle">{`${interviewer.interviewerFirstName} ${interviewer.interviewerLastName}`}</div>);
      selector = (
        <InterviewerSelector
          interviewer={interviewer}
          updateFunc={(newInterviewer) => this.setState({
            interviewer: newInterviewer,
            redirect: {
              pathname: `/follow/campaigns/interviewer/${newInterviewer.id}`,
              interviewer: newInterviewer,
            },
          })}
        />
      );
    } else if (!!survey && (mode === C.BY_INTERVIEWER_ONE_SURVEY || mode === C.BY_SITE)) {
      tableTitle = (<div className="SurveyTitle">{survey.label}</div>);
      selector = (
        <SurveySelector
          survey={survey}
          updateFunc={(newSurvey) => this.setState({
            survey: newSurvey,
            redirect: {
              pathname: mode === C.BY_SITE
                ? `/follow/sites/${newSurvey.id}`
                : `/follow/campaign/${newSurvey.id}`,
              survey: newSurvey,
            },
          })}
        />
      );
    }

    let fieldsToSearch;
    if (mode === C.BY_SURVEY || mode === C.BY_SURVEY_ONE_INTERVIEWER) {
      fieldsToSearch = ['survey'];
    } else if (mode === C.BY_SITE) {
      fieldsToSearch = ['site'];
    } else {
      fieldsToSearch = ['interviewerFirstName', 'interviewerLastName'];
    }

    return (
      <div id="MonitoringTable">
        <Container fluid>
          <Row>
            <Col>
              <Link to="/" className="ButtonLink ReturnButtonLink">
                <Button className="ReturnButton" data-testid="return-button">{D.back}</Button>
              </Link>
            </Col>
            <Col xs={6}>
              {tableTitle}
            </Col>
            <Col>
              {selector}
            </Col>
          </Row>
        </Container>
        <Card className="ViewCard">
          <Card.Title className="PageTitle">
            <div className="DateDisplay">{D.monitoringTableIntroductionSentence}</div>
            <input
              id="datePicker"
              data-testid="date-picker"
              className="DateDisplay"
              type="date"
              value={date}
              max={new Date().toJSON().split('T')[0]}
              min={survey ? new Date(survey.collectionStartDate).toJSON().split('T')[0] : null}
              onChange={(e) => this.setState({ date: e.target.value }, () => this.refreshData())}
            />
            <Button
              className="ExportButton"
              data-testid="export-button"
              onClick={() => this.handleExport()}
            >
              Export
            </Button>
          </Card.Title>
          {
            data.linesDetails.length > 0
              ? (
                <>
                  <Row>
                    <Col xs="6">
                      <PaginationNav.SizeSelector
                        updateFunc={(newPagination) => { this.handlePageChange(newPagination); }}
                      />
                    </Col>
                    <Col xs="6" className="text-right">
                      <SearchField
                        data={data.linesDetails}
                        searchBy={fieldsToSearch}
                        updateFunc={
                          (matchingInterviewers) => this.updateInterviewers(matchingInterviewers)
                        }
                      />
                    </Col>
                  </Row>
                  <FollowUpTable
                    data={data}
                    pagination={pagination}
                    displayedLines={displayedLines}
                    mode={mode}
                    handleSort={(property) => this.handleSort(property)}
                    sort={sort}
                  />
                  <div className="tableOptionsWrapper">
                    <PaginationNav.PageSelector
                      pagination={pagination}
                      updateFunc={(newPagination) => { this.handlePageChange(newPagination); }}
                      numberOfItems={displayedLines.length}
                    />
                  </div>
                </>
              )
              : <span>{D.nothingToDisplay}</span>
        }
        </Card>
      </div>
    );
  }
}

function getHeaderForExport(mode) {
  let firstColumnTitle;
  if (mode === C.BY_SURVEY || mode === C.BY_SURVEY_ONE_INTERVIEWER) {
    firstColumnTitle = D.survey;
  } else if (mode === C.BY_SITE) {
    firstColumnTitle = D.site;
  } else {
    firstColumnTitle = [D.lastName, D.firstName, D.idep];
  }

  return [
    firstColumnTitle,
    '',
    D.completionRate,
    '',
    D.allocated,
    D.notStarted,
    D.inProgressInterviewer,
    D.waitingForIntReview,
    D.reviewedByInterviewer,
    D.reviewedEnded,
    '',
    D.preparingContact,
    D.atLeastOneContact,
    D.appointmentTaken,
    D.interviewStarted,
  ].flat();
}

function getFooterForExport(data, mode) {
  const footer = [];
  if (mode === C.BY_INTERVIEWER_ONE_SURVEY) {
    footer.push([
      D.totalDEM,
      '',
      '',
      '',
      `${(data.total.dem.completionRate * 100).toFixed(1)}%`,
      '',
      data.total.dem.total,
      data.total.dem.notStarted,
      data.total.dem.onGoing,
      data.total.dem.waitingForIntValidation,
      data.total.dem.intValidated,
      data.total.dem.demValidated,
      '',
      data.total.dem.preparingContact,
      data.total.dem.atLeastOneContact,
      data.total.dem.appointmentTaken,
      data.total.dem.interviewStarted,
    ]);
  }
  if (mode === C.BY_INTERVIEWER_ONE_SURVEY || mode === C.BY_SITE) {
    footer.push([
      mode === C.BY_INTERVIEWER_ONE_SURVEY ? [D.totalFrance, '', ''] : D.totalFrance,
      '',
      `${(data.total.france.completionRate * 100).toFixed(1)}%`,
      '',
      data.total.france.total,
      data.total.france.notStarted,
      data.total.france.onGoing,
      data.total.france.waitingForIntValidation,
      data.total.france.intValidated,
      data.total.france.demValidated,
      '',
      data.total.france.preparingContact,
      data.total.france.atLeastOneContact,
      data.total.france.appointmentTaken,
      data.total.france.interviewStarted,
    ].flat());
  }
  return footer;
}

function getBodyForExport(data) {
  return data.map((elm) => (
    [
      (elm.interviewerLastName
        ? [elm.interviewerLastName, elm.interviewerFirstName, elm.interviewerId]
        : null
      )
      || elm.survey || elm.site,
      '',
      `${(elm.completionRate * 100).toFixed(1)}%`,
      '',
      elm.total,
      elm.notStarted,
      elm.onGoing,
      elm.waitingForIntValidation,
      elm.intValidated,
      elm.demValidated,
      '',
      elm.preparingContact,
      elm.atLeastOneContact,
      elm.appointmentTaken,
      elm.interviewStarted,
    ].flat()
  ));
}

function makeTableForExport(data, mode) {
  const header = getHeaderForExport(mode);
  const body = getBodyForExport(data.linesDetails);
  const footer = getFooterForExport(data, mode);

  return [header].concat(body, footer);
}

export default MonitoringTable;
