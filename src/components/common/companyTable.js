import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Checkbox, Button, ToolTip } from '../index';
import { formatDate, sortingMethodIconMapper } from '../../utility';

const CompanyTable = ({
  page,
  onPageChange,
  headerComponent,
  dataCheckbox,
  pageCount,
  totalItemsCount,
  items,
  history,
  onSelectCheckbox,
  onSelectHeaderCheckbox,
  selectedCompanies,
  isHeaderCheckboxSelected,
  isUpdateBtnLoading,
  onUpdate,
  sortMethod,
  onHeaderClick,
}) => {
  const { t } = useTranslation();
  const navigateToCompanyPage = (company) =>
    history.push(`/company-details/${company.id}`, company);
  let headers = t('companyTable.headers', { returnObjects: true });
  headers[1] = {
    ...headers[1],
    className: sortMethod === 'both' ? 'sorting' : 'active sorting',
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
                label={t('companyTable.buttons.update')}
                onClick={onUpdate}
                isLoading={isUpdateBtnLoading}
              />
              <ToolTip id="select-all">
                {t('tooltips.selectAllCompaniesTooltip')}
              </ToolTip>
            </>
          ),
        },
      ]
    : headers;
  return (
    <Table
      activePage={page}
      countText={t('companyTable.pageText')}
      pageCount={pageCount}
      totalItemsCount={totalItemsCount}
      headers={tableHeaders}
      onPageChange={onPageChange}>
      {items &&
        items.length > 0 &&
        items.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{(page - 1) * 10 + index + 1}</td>
              <td>
                <a
                  href="javascript:;"
                  onClick={() => navigateToCompanyPage(item)}>
                  {item.name}
                </a>
              </td>
              <td>
                {(item.verified_response && item.verified_response['sector']) ||
                  '-'}
              </td>
              <td>
                {(item.verified_response &&
                  item.verified_response['funding stage']) ||
                  '-'}
              </td>
              <td>
                {(item.verified_response && item.verified_response['uen']) ||
                  '-'}
              </td>
              <td>{item.updated_on && formatDate(item.updated_on)}</td>
              <td>
                <a
                  href="javascript:;"
                  className="action view"
                  onClick={() => navigateToCompanyPage(item)}>
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
