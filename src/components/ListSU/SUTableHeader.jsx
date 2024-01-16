import React from "react";
import SortIcon from "../SortIcon/SortIcon";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const HeaderContent = ({
  label,
  className,
  sortValue,
  sort,
  handleSortFunction,
  dataTestId,
  ...props
}) => (
  <th
    {...props}
    data-testid={dataTestId}
    onClick={sortValue ? handleSortFunction(sortValue) : undefined}
    className={className}
  >
    {label}
    {sortValue && <SortIcon val={sortValue} sort={sort} />}
  </th>
);

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
      <HeaderContent
        label={label}
        className={className}
        sortValue={sortValue}
        sort={sort}
        handleSortFunction={handleSortFunction}
        dataTestId={dataTestId}
      />
    </OverlayTrigger>
  ) : (
    <HeaderContent
      label={label}
      className={className}
      sortValue={sortValue}
      sort={sort}
      handleSortFunction={handleSortFunction}
      dataTestId={dataTestId}
    />
  );
};
