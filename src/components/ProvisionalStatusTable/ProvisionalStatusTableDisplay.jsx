import React from 'react';
import Table from 'react-bootstrap/Table';
import SortIcon from '../SortIcon/SortIcon';
import ProvisionalStatusDisplayLine from './ProvisionalStatusDisplayLine';
import C from '../../utils/constants.json';
import D from '../../i18n';

function ProvisionalStatusTableDisplay({
  sort, displayedLines, pagination, mode, handleSort, total
}) {
  let firstColumnTitle;
  let firstColumnSortAttribute;
  if (mode === C.BY_SURVEY_ONE_INTERVIEWER) {
    firstColumnTitle = D.survey;
    firstColumnSortAttribute = 'survey';
  } else if (mode === C.BY_SITE) {
    firstColumnTitle = D.site;
    firstColumnSortAttribute = 'site';
  } else {
    firstColumnTitle = D.interviewer;
    firstColumnSortAttribute = 'CPinterviewer';
  }
  function handleSortFunct(property) { return () => { handleSort(property); }; }

  const footer = mode === C.BY_SURVEY_ONE_INTERVIEWER || (
    <tr>
      <th>{D.totalDEM}</th>
      <td className="ColumnSpacing" />
      <th>{total.npaCount}</th>
      <th>{total.npiCount}</th>
      <th>{total.npxCount}</th>
      <th>{total.rowCount}</th>
      <th>{total.total}</th>
      <td className="ColumnSpacing" />
      <th>{total.allocated}</th>
    </tr>
  );
  return (
    <Table id="FollowUpTable" className="CustomTable" bordered striped hover responsive size="sm">
      <thead>
        <tr>
          <th
            rowSpan="2"
            data-testid="TableHeader_label"
            onClick={handleSortFunct(firstColumnSortAttribute)}
            className="Clickable ColFirstCol"
          >
            {firstColumnTitle}
            <SortIcon val={firstColumnSortAttribute} sort={sort} />
          </th>
          <th rowSpan="2" className="ColumnSpacing" />
          <th colSpan="5">{D.unitsWithProvisionalStatus}</th>
          <th rowSpan="2" className="ColumnSpacing" />
          <th
            rowSpan="2"
            className="Clickable ColAllocated"
            onClick={handleSortFunct('allocated')}
          >
            {D.unitsAllocated}
            <SortIcon val="allocated" sort={sort} />
          </th>
        </tr>
        <tr>
          <th
            className="Clickable ColNpiCount"
            onClick={handleSortFunct('npiCount')}
          >
            {D.NPI}
            <SortIcon val="npiCount" sort={sort} />
          </th>
          <th
            className="Clickable ColNpaCount"
            onClick={handleSortFunct('npaCount')}
          >
            {D.NPA}
            <SortIcon val="npaCount" sort={sort} />
          </th>
          <th
            className="Clickable ColNpxCount"
            onClick={handleSortFunct('npxCount')}
          >
            {D.NPX}
            <SortIcon val="npxCount" sort={sort} />
          </th>
          <th
            className="Clickable ColRowCount"
            onClick={handleSortFunct('rowCount')}
          >
            {D.ROW}
            <SortIcon val="rowCount" sort={sort} />
          </th>
          <th
            className="Clickable ColTotal"
            onClick={handleSortFunct('total')}
          >
            {D.total}
            <SortIcon val="total" sort={sort} />
          </th>
        </tr>
      </thead>
      <tbody>
        {displayedLines
          .slice(
            (pagination.page - 1) * pagination.size,
            Math.min(pagination.page * pagination.size, displayedLines.length),
          )
          .map((line) => (
            <ProvisionalStatusDisplayLine
              key={line.id || line.interviewerId || line.survey || line.site}
              data={line}
            />
          ))}
      </tbody>
      {footer}
    </Table>
  );
}

export default ProvisionalStatusTableDisplay;
