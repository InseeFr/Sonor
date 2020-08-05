import React from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import SortIcon from '../SortIcon/SortIcon';
import Utils from '../../utils/Utils';
import PaginationNav from '../PaginationNav/PaginationNav';
import { BY_SITE } from '../../utils/constants.json';
import D from '../../i18n';

function displaySurveyLines(props, pagination) {
  const lines = [];
  const { data } = props;
  let oddLine = true;
  for (let i = (pagination.page - 1) * pagination.size;
    i < pagination.page * pagination.size && i < data.length;
    i += 1
  ) {
    if (Utils.isVisible(data[i])) {
      lines.push(<SurveyListLine key={i} oddLine={oddLine} lineData={data[i]} props={props} />);
      oddLine = !oddLine;
    }
  }
  return lines;
}

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: { size: 5, page: 1 },
    };
  }

  handlePageChange(pagination) {
    this.setState({ pagination });
  }

  render() {
    const { sort, handleSort, data } = this.props;
    const { pagination } = this.state;
    function handleSortFunct(property) { return () => { handleSort(property); }; }
    return (
      <div id="MainScreen">
        <Card className="ViewCard">
          <Card.Title>{D.surveyList}</Card.Title>
          <PaginationNav.SizeSelector
            updateFunc={(newPagination) => this.handlePageChange(newPagination)}
          />
          <Table id="SurveyList" className="CustomTable" bordered striped hover responsive size="sm">
            <thead>
              <tr>
                <th rowSpan="2" onClick={handleSortFunct('label')}>
                  <SortIcon val="label" sort={sort} />
                  {D.survey}
                </th>
                <th rowSpan="2" className="ColumnSpacing" />
                <th rowSpan="2" onClick={handleSortFunct('collectionStartDate')}>
                  <SortIcon val="collectionStartDate" sort={sort} />
                  {D.collectionStartDate}
                </th>
                <th rowSpan="2" onClick={handleSortFunct('collectionEndDate')}>
                  <SortIcon val="collectionEndDate" sort={sort} />
                  {D.collectionEndDate}
                </th>
                <th rowSpan="2" onClick={handleSortFunct('treatmentEndDate')}>
                  <SortIcon val="treatmentEndDate" sort={sort} />
                  {D.treatmentEndDate}
                </th>
                <th rowSpan="2" className="ColumnSpacing" />
                <th rowSpan="2" onClick={handleSortFunct('phase')} className="Clickable">
                  <SortIcon val="phase" sort={sort} />
                  {D.phase}
                </th>
                <th rowSpan="2" className="ColumnSpacing" />
                <th colSpan="6">{D.surveyUnits}</th>
              </tr>
              <tr>
                <th onClick={handleSortFunct('allocated')} className="Clickable">
                  <SortIcon val="allocated" sort={sort} />
                  {D.allocated}
                </th>
                <th onClick={handleSortFunct('toProcessInterviewer')} className="Clickable">
                  <SortIcon val="toProcessInterviewer" sort={sort} />
                  {D.toTreatInterviewer}
                </th>
                <th onClick={handleSortFunct('toAffect')} className="Clickable">
                  <SortIcon val="toAffect" sort={sort} />
                  {D.toBeAssigned}
                </th>
                <th onClick={handleSortFunct('toFollowUp')} className="Clickable">
                  <SortIcon val="toFollowUp" sort={sort} />
                  {D.toRemind}
                </th>
                <th onClick={handleSortFunct('toReview')} className="Clickable">
                  <SortIcon val="toReview" sort={sort} />
                  {D.toBeReviewed}
                </th>
                <th onClick={handleSortFunct('finalized')} className="Clickable">
                  <SortIcon val="finalized" sort={sort} />
                  {D.terminated}
                </th>
              </tr>
            </thead>
            <tbody>
              {displaySurveyLines(this.props, pagination)}
            </tbody>
          </Table>
          <div className="tableOptionsWrapper">
            <PaginationNav.PageSelector
              pagination={pagination}
              updateFunc={(newPagination) => { this.handlePageChange(newPagination); }}
              numberOfItems={data.length}
            />
          </div>
        </Card>
      </div>
    );
  }
}

function SurveyListLine({ lineData, oddLine, props }) {
  const data = lineData;
  const lineColor = oddLine ? 'DarkgreyLine' : 'LightGreyLine';
  const survey = {
    id: data.id,
    label: data.label,
    visibilityStartDate: data.visibilityStartDate,
    treatmentEndDate: data.treatmentEndDate,
    allSurveys: props.data,
  };
  const goToPortal = () => { props.goToCampaignPortal(survey, data); };
  const goToListSU = () => { props.goToListSU(survey); };
  const goToReview = () => { props.goToReview(survey); };
  const goToRemind = () => { props.goToRemind(survey); };
  const goToMonitoringTable = () => { props.goToMonitoringTable(survey); };
  const goToMonitoringTableSites = () => { props.goToMonitoringTable(survey, BY_SITE); };
  return (
    <tr className={lineColor}>
      <td onClick={goToMonitoringTableSites} className="Clickable" data-testid="campaign-label">{data.label}</td>
      <td className="ColumnSpacing" />
      <td onClick={goToPortal} className="Clickable">{Utils.convertToDateString(data.collectionStartDate)}</td>
      <td onClick={goToPortal} className="Clickable">{Utils.convertToDateString(data.collectionEndDate)}</td>
      <td onClick={goToPortal} className="Clickable">{Utils.convertToDateString(data.treatmentEndDate)}</td>
      <td className="ColumnSpacing" />
      <td onClick={goToPortal} className="Clickable">{Utils.displayCampaignPhase(data.phase)}</td>
      <td className="ColumnSpacing" />
      <td onClick={goToListSU} className="Clickable">{data.allocated}</td>
      <td onClick={goToMonitoringTable} className="Clickable">{data.toProcessInterviewer}</td>
      <td>{data.toAffect}</td>
      <td onClick={goToRemind} className="Clickable">{data.toFollowUp}</td>
      <td onClick={goToReview} className="Clickable">{data.toReview}</td>
      <td>{data.finalized}</td>
    </tr>
  );
}

export default MainScreen;
