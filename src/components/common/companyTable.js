import React from "react";
import { Table, Checkbox, Button, ToolTip } from "../index";
import { formatDate } from "../../utility/common";
import { sortingMethodIconMapper } from "../../utility/mapper";
import { constants } from "../../constants";

const CompanyTable = ({
  page,
  onPageChange,
  headerComponent,
  dataCheckbox,
  pageCount,
  totalItemsCount,
  items,
  onSelectCheckbox,
  onSelectHeaderCheckbox,
  selectedCompanies,
  isHeaderCheckboxSelected,
  isUpdateBtnLoading,
  onUpdate,
  sortMethod,
  onHeaderClick,
}) => {
  const { selectAllCompaniesTooltip } = constants.tooltips;
  const { pageText, buttons, headers } = constants.companyTable;
  headers[1] = {
    ...headers[1],
    className: sortMethod === "both" ? "sorting" : "active sorting",
    onHeaderClick: onHeaderClick,
    icons: [{ className: sortingMethodIconMapper[sortMethod] }],
  };
  const tableHeaders = headerComponent
    ? [
        ...headers,
        {
          component: (
            <>
              <Checkbox
                controlId="updateAllCheckbox"
                onClick={onSelectHeaderCheckbox}
                value={isHeaderCheckboxSelected}
                isControlled={true}
                dataFor="select-all"
              />
              <Button
                variant="success"
                label={buttons.update}
                onClick={onUpdate}
                isLoading={isUpdateBtnLoading}
              />
              <ToolTip id="select-all">{selectAllCompaniesTooltip}</ToolTip>
            </>
          ),
        },
      ]
    : headers;
  return (
    <Table
      activePage={page}
      countText={pageText}
      pageCount={pageCount}
      totalItemsCount={totalItemsCount}
      headers={tableHeaders}
      onPageChange={onPageChange}
    >
      {items &&
        items.length > 0 &&
        items.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>
                <a href="javascript:;">{item.name}</a>
              </td>
              <td>
                {(item.verified_response && item.verified_response["sector"]) ||
                  "-"}
              </td>
              <td>
                {(item.verified_response &&
                  item.verified_response["funding stage"]) ||
                  "-"}
              </td>
              <td>
                {(item.verified_response && item.verified_response["uen"]) ||
                  "-"}
              </td>
              <td>{item.updated_on && formatDate(item.updated_on)}</td>
              <td>
                <a href="javascript:;" className="action view">
                  <i className="fas fa-eye" />
                </a>
              </td>
              {dataCheckbox && (
                <td>
                  <Checkbox
                    controlId="updateCheckbox"
                    onClick={() => onSelectCheckbox(item.id)}
                    value={selectedCompanies.includes(item.id)}
                    isControlled={true}
                  />
                </td>
              )}
            </tr>
          );
        })}
    </Table>
  );
};

export default CompanyTable;
