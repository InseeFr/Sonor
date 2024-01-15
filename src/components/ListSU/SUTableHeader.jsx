import React from "react";
import SortIcon from "../SortIcon/SortIcon";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const SUTableHeader = ({
  label,
  tooltipLabel,
  className,
  sortValue,
  sort,
  handleSortFunction,
  dataTestId,
}) => {
  return tooltipLabel ? (
    <OverlayTrigger placement="top" overlay={<Tooltip>{tooltipLabel}</Tooltip>}>
      <th
        data-testid={dataTestId}
        onClick={handleSortFunction}
        className={className}
      >
        {label}
        {sortValue && <SortIcon val={sortValue} sort={sort} />}
      </th>
    </OverlayTrigger>
  ) : (
    <th
      data-testid={dataTestId}
      onClick={handleSortFunction}
      className={className}
    >
      {label}
      {sortValue && <SortIcon val={sortValue} sort={sort} />}
    </th>
  );
};
