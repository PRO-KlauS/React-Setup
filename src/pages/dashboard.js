import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DetailCard,
  Input,
  CompanyTable,
  Checkbox,
  Button,
  Table,
  ToolTip,
  Dropdown,
} from '../components';
import { getDashBoardDetails } from '../apis/dashboard';
import { incrementLoaderCount, decrementLoaderCount } from '../actions/loader';
import {
  showToast,
  useStateCallback,
  sortingMethodIconMapper,
} from '../utility';
import { Container, Row, Card, Tabs, Tab, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Dashboard = ({ history }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [state, setState] = useStateCallback({
    searchValue: '',
    selectedCompanies: [],
    isHeaderCheckBoxSelected: false,
    activeTab: 'companies',
    page: 1,
    isButtonLoading: false,
    isUpdateBtnLoading: false,
    sortMethod: 'both',
    selectedDropdown: { value: 'All', key: 'all' },
    dashboardDetails: {
      entities: 0,
      urls: 0,
      datapoints: 0,
      newEntities: 0,
    },
    companies: {
      items: [],
      totalItemCount: 0,
      totalPages: 0,
    },
  });

  const {
    searchValue,
    selectedCompanies,
    isHeaderCheckBoxSelected,
    activeTab,
    page,
    isButtonLoading,
    isUpdateBtnLoading,
    sortMethod,
    selectedDropdown,
    companies,
    dashboardDetails,
  } = state;

  const { items = [], totalItemCount, totalPages } = companies || {};

  const { profile } = useSelector((state) => ({
    profile: state.profile,
  }));

  useEffect(() => {
    setDashboardData();
  }, []);

  const setDashboardData = () => {
    dispatch(incrementLoaderCount());
    return getDashBoardDetails()
      .then((res) => {
        if (res.data.status) {
          let dashboardDetails = {
            entities: res.data.data ? res.data.data.entities : 0,
            urls: res.data.data ? res.data.data.urls : 0,
            datapoints: res.data.data ? res.data.data.datapoints : 0,
            newEntities: res.data.data ? res.data.data.new_entities : 0,
          };
          setState((state) => ({
            ...state,
            dashboardDetails: dashboardDetails,
          }));
        } else {
          showToast(res.data.error_message);
        }
        dispatch(decrementLoaderCount());
        return res.data;
      })
      .catch(() => dispatch(decrementLoaderCount()));
  };

  const onPageChange = (page) => {
    setState(
      (state) => ({
        ...state,
        page: page,
        isHeaderCheckBoxSelected: false,
        selectedCompanies: [],
      }),
      ({ selectedDropdown, page, sortMethod, activeTab } = {}) => {
        let body = {
          page: page,
          is_company_and_new: activeTab === 'companies',
          is_new: activeTab === 'new-entities',
          is_suspended: activeTab === 'suspended-entities',
        };
        if (
          activeTab !== 'new-entities' &&
          selectedDropdown &&
          selectedDropdown.value !== 'All'
        ) {
          body.entity_type = selectedDropdown.value;
        }
        if (sortMethod !== 'both') {
          body.sort_by = sortMethod;
        }
        // Do API cal with all the details
      },
    );
  };
  const onSearchValueChange = (e) => {
    setState((state) => ({ ...state, searchValue: e.target.value }));
  };
  const onSearchCompanies = () => {
    setState(
      (state) => ({
        ...state,
        page: 1,
        isButtonLoading: true,
      }),
      ({ searchValue, activeTab, selectedDropdown, sortMethod } = {}) => {
        let body = {
          search: searchValue,
          page: 1,
          is_company_and_new: activeTab === 'companies',
          is_new: activeTab === 'new-entities',
          is_suspended: activeTab === 'suspended-entities',
        };
        if (
          activeTab !== 'new-entities' &&
          selectedDropdown &&
          selectedDropdown.value !== 'All'
        ) {
          body.entity_type = selectedDropdown.value;
        }
        if (sortMethod !== 'both') {
          body.sort_by = sortMethod;
        }
        // Do API call with all the details
      },
    );
  };
  const onTabChange = (tab) => {
    setState(
      (state) => ({
        ...state,
        isButtonLoading: false,
        searchValue: '',
        selectedCompanies: [],
        isHeaderCheckBoxSelected: false,
        activeTab: tab,
        isUpdateBtnLoading: false,
        page: 1,
        sortMethod: 'both',
        selectedDropdown: { value: 'All', key: 'all' },
      }),
      () => {
        // Do API call
      },
    );
  };
  const onSelectCheckbox = (id) => {
    if (selectedCompanies.includes(id)) {
      setState((state) => ({
        ...state,
        isHeaderCheckBoxSelected: false,
        selectedCompanies: state?.selectedCompanies?.filter?.(
          (companyID) => companyID !== id,
        ),
      }));
    } else {
      setState((state) => ({
        ...state,
        selectedCompanies: [...(state?.selectedCompanies || []), id],
        isHeaderCheckBoxSelected:
          state?.selectedCompanies.length + 1 === items.length,
      }));
    }
  };
  const onSelectHeaderCheckbox = () => {
    if (isHeaderCheckBoxSelected) {
      setState((state) => ({
        ...state,
        isHeaderCheckBoxSelected: false,
        selectedCompanies: [],
      }));
    } else {
      let newSelectedCompanies = [];
      items.forEach((item) => newSelectedCompanies.push(item.id));
      setState((state) => ({
        ...state,
        isHeaderCheckBoxSelected: true,
        selectedCompanies: newSelectedCompanies,
      }));
    }
  };

  const onUpdateCompanies = () => {
    // Do API Call
  };

  const onAddCompany = () => {
    // Do API Call and Refresh the Page Data
  };

  const onRemoveCompany = () => {
    // Do API Call and Refresh the Page Data
  };

  const onHeaderClick = () => {
    setState(
      (state) => ({
        ...state,
        sortMethod:
          state?.sortMethod === 'both'
            ? 'ASC'
            : state?.sortMethod === 'ASC'
            ? 'DESC'
            : 'ASC',
      }),
      ({ sortMethod, searchValue, activeTab, selectedDropdown } = {}) => {
        let body = {
          search: searchValue,
          page: 1,
          is_company_and_new: activeTab === 'companies',
          is_new: activeTab === 'new-entities',
          is_suspended: activeTab === 'suspended-entities',
        };
        if (
          activeTab !== 'new-entities' &&
          selectedDropdown &&
          selectedDropdown.value !== 'All'
        ) {
          body.entity_type = selectedDropdown.value;
        }
        if (sortMethod !== 'both') {
          body.sort_by = sortMethod;
        }
        // Do API call with all the details
      },
    );
  };

  const onDropdownValueChange = (selected) => {
    setState(
      (state) => ({ ...state, selectedDropdown: selected, page: 1 }),
      ({ searchValue, activeTab, sortMethod } = {}) => {
        let body = {
          search: searchValue,
          page: 1,
          is_company_and_new: activeTab === 'companies',
          is_new: activeTab === 'new-entities',
          is_suspended: activeTab === 'suspended-entities',
        };
        if (
          activeTab !== 'new-entities' &&
          selected &&
          selected.value !== 'All'
        ) {
          body.entity_type = selected.value;
        }
        if (sortMethod !== 'both') {
          body.sort_by = sortMethod;
        }
        // Do API call with all the details
      },
    );
  };

  let newEntityHeaders = t('dashboard.newEntityHeaders', {
    returnObjects: true,
  });
  let dropdownOptions = t('dashboard.dropdownOptions', { returnObjects: true });
  newEntityHeaders[1] = {
    ...newEntityHeaders[1],
    className: sortMethod === 'both' ? '' : 'active',
    onHeaderClick: onHeaderClick,
    icons: [{ className: sortingMethodIconMapper[sortMethod] }],
  };
  const { entities, urls, datapoints, newEntities } = dashboardDetails;

  return (
    <Container className="dashboard">
      <Row className="small-data-card-info">
        <DetailCard
          value={entities}
          label={t('dashboard.cardLabels.0')}
          colorClass="pink"
          imagePath="/images/company.svg"
        />
        <DetailCard
          value={newEntities}
          label={t('dashboard.cardLabels.3')}
          colorClass="sky-blue"
          imagePath="/images/office-building.svg"
        />
        <DetailCard
          value={urls}
          label={t('dashboard.cardLabels.1')}
          colorClass="light-orange"
          imagePath="/images/web-url.svg"
        />
        <DetailCard
          value={datapoints}
          label={t('dashboard.cardLabels.2')}
          colorClass="dark-cyan"
          imagePath="/images/data-points.svg"
        />
      </Row>
      <Tabs
        defaultActiveKey="companies"
        id="dashboard-tabs"
        onSelect={onTabChange}
        activeKey={activeTab}
        mountOnEnter={true}
        className="no-bdr">
        <Tab eventKey="companies" title={t('dashboard.tabTitles.0')}>
          <Card className="no-top-radius companies">
            <Card.Body className="pad-2">
              <Card.Title>
                <span>{t('dashboard.companiesTitle')}</span>
                <div className="inline-heading-form">
                  <Dropdown
                    id="filter-dropdown"
                    onClick={onDropdownValueChange}
                    options={dropdownOptions}
                    selected={selectedDropdown}
                  />
                  <Form>
                    <Input
                      controlId="searchInput"
                      placeholder={t('dashboard.searchPlaceholder')}
                      isLoading={isButtonLoading}
                      isControlled={true}
                      value={searchValue}
                      onChange={onSearchValueChange}
                      iconClass="fas fa-search"
                      isButtonDisabled={isButtonLoading}
                      onButtonClick={onSearchCompanies}
                      buttonVariant="success"
                      hasButton={true}
                      buttonType="submit"
                    />
                  </Form>
                </div>
              </Card.Title>
              <CompanyTable
                dataCheckbox={profile && profile.is_admin}
                headerComponent={profile && profile.is_admin}
                onPageChange={onPageChange}
                page={page}
                pageCount={totalPages}
                totalItemsCount={totalItemCount}
                items={items || []}
                history={history}
                onSelectCheckbox={onSelectCheckbox}
                onSelectHeaderCheckbox={onSelectHeaderCheckbox}
                selectedCompanies={selectedCompanies}
                isHeaderCheckboxSelected={isHeaderCheckBoxSelected}
                isUpdateBtnLoading={isUpdateBtnLoading}
                onUpdate={onUpdateCompanies}
                sortMethod={sortMethod}
                onHeaderClick={onHeaderClick}
              />
            </Card.Body>
          </Card>
          <div className="update-mobile">
            <Checkbox
              controlId="isCheckAll"
              label="Select All"
              name="isSelectAll"
              onClick={onSelectHeaderCheckbox}
              value={isHeaderCheckBoxSelected}
              isControlled={true}
            />
            <Button
              variant="success"
              label={t('dashboard.buttons.update')}
              onClick={onUpdateCompanies}
              isLoading={isUpdateBtnLoading}
            />
          </div>
        </Tab>
        <Tab eventKey="new-entities" title={t('dashboard.tabTitles.1')}>
          <Card className="no-top-radius new-entities">
            <Card.Body className="pad-2">
              <Card.Title>
                <span>{t('dashboard.newEntityTitle')}</span>
                <Form>
                  <div className="inline-heading-form">
                    <Input
                      controlId="searchInput"
                      placeholder={t('dashboard.searchPlaceholder')}
                      isLoading={isButtonLoading}
                      isControlled={true}
                      value={searchValue}
                      onChange={onSearchValueChange}
                      iconClass="fas fa-search"
                      isButtonDisabled={isButtonLoading}
                      onButtonClick={onSearchCompanies}
                      buttonVariant="success"
                      hasButton={true}
                      buttonType="submit"
                    />
                  </div>
                </Form>
              </Card.Title>
              <Table
                activePage={page}
                countText={t('dashboard.pageText')}
                pageCount={totalPages}
                totalItemsCount={totalItemCount}
                headers={newEntityHeaders}
                onPageChange={onPageChange}>
                {items &&
                  items.length > 0 &&
                  items.map((item, index) => {
                    return (
                      <tr>
                        <td>{(page - 1) * 10 + index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          <div className="actions">
                            <a
                              href="javascript:;"
                              className="reject"
                              data-tip
                              data-for={'remove-company' + item.id}
                              onClick={() => onRemoveCompany(item.id)}>
                              <i className="fas fa-times-circle" />
                            </a>
                            <a
                              href="javascript:;"
                              className="approve"
                              data-tip
                              data-for={'add-company' + item.id}
                              onClick={() => onAddCompany(item.id)}>
                              <i className="fas fa-check-circle" />
                            </a>
                            <ToolTip
                              id={'remove-company' + item.id}
                              place="left">
                              {t('tooltips.removeCompanyTooltip')}
                            </ToolTip>
                            <ToolTip id={'add-company' + item.id} place="left">
                              {t('tooltips.addCompanyTooltip')}
                            </ToolTip>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="suspended-entities" title={t('dashboard.tabTitles.2')}>
          <Card className="no-top-radius suspended-entities">
            <Card.Body className="pad-2">
              <Card.Title>
                <span>{t('dashboard.suspendedEntityTitle')}</span>
                <div className="inline-heading-form">
                  <Dropdown
                    id="filter-dropdown"
                    onClick={onDropdownValueChange}
                    options={dropdownOptions}
                    selected={selectedDropdown}
                  />
                  <Form>
                    <Input
                      controlId="searchInput"
                      placeholder={t('dashboard.searchPlaceholder')}
                      isLoading={isButtonLoading}
                      isControlled={true}
                      value={searchValue}
                      onChange={onSearchValueChange}
                      iconClass="fas fa-search"
                      isButtonDisabled={isButtonLoading}
                      onButtonClick={onSearchCompanies}
                      buttonVariant="success"
                      hasButton={true}
                      buttonType="submit"
                    />
                  </Form>
                </div>
              </Card.Title>
              <CompanyTable
                onPageChange={onPageChange}
                page={page}
                pageCount={totalPages}
                totalItemsCount={totalItemCount}
                items={items || []}
                history={history}
                sortMethod={sortMethod}
                onHeaderClick={onHeaderClick}
              />
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Dashboard;
