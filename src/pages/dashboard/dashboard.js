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
} from '../../components';
import { setDashboardData } from '../../actions/dashboard';
import { showToast, useStateCallback } from '../../utility/common';
import { Container, Row, Card, Tabs, Tab, Form } from 'react-bootstrap';
import { constants } from '../../constants';
import { sortingMethodIconMapper } from '../../utility/mapper';
import '../../styles/dashboard.scss';

const Dashboard = ({ companies, history, addCompany, removeCompany }) => {
  const dispatch = useDispatch();
  const { dashboardDetails, profile } = useSelector((state) => ({
    dashboardDetails: state.dashboardDetails,
    profile: state.profile,
  }));

  useEffect(() => {
    dispatch(setDashboardData());
  }, []);
  const { items = [], totalItemCount, totalPages } = companies || {};
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
  } = state;
  const onPageChange = (page) => {
    setState(
      {
        ...state,
        page: page,
        isHeaderCheckBoxSelected: false,
        selectedCompanies: [],
      },
      () => {
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
    setState({ ...state, searchValue: e.target.value });
  };
  const onSearchCompanies = () => {
    setState(
      {
        ...state,
        page: 1,
        isButtonLoading: true,
      },
      () => {
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
      {
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
      },
      () => {
        // Do API call
      },
    );
  };
  const onSelectCheckbox = (id) => {
    if (selectedCompanies.includes(id)) {
      setState({
        ...state,
        isHeaderCheckBoxSelected: false,
        selectedCompanies: selectedCompanies.filter(
          (companyID) => companyID !== id,
        ),
      });
    } else {
      setState({
        ...state,
        selectedCompanies: [...selectedCompanies, id],
        isHeaderCheckBoxSelected: selectedCompanies.length + 1 === items.length,
      });
    }
  };
  const onSelectHeaderCheckbox = () => {
    if (isHeaderCheckBoxSelected) {
      setState({
        ...state,
        isHeaderCheckBoxSelected: false,
        selectedCompanies: [],
      });
    } else {
      let newSelectedCompanies = [];
      items.forEach((item) => newSelectedCompanies.push(item.id));
      setState({
        ...state,
        isHeaderCheckBoxSelected: true,
        selectedCompanies: newSelectedCompanies,
      });
    }
  };

  const onUpdateCompanies = () => {
    // Do API Call
  };

  const onAddCompany = (id) => {
    addCompany({ company_id: id }, page).then((res) => {
      setState({
        ...state,
        page: res.newPage && res.newPage !== page ? res.newPage : page,
      });
      if (res.status) {
        showToast(res.message);
      } else {
        showToast(res.error_message);
      }
    });
  };

  const onRemoveCompany = (id) => {
    removeCompany({ company_id: id }, page).then((res) => {
      setState({
        ...state,
        page: res.newPage && res.newPage !== page ? res.newPage : page,
      });
      if (res.status) {
        showToast(res.message);
      } else {
        showToast(res.error_message);
      }
    });
  };

  const onHeaderClick = () => {
    setState(
      {
        ...state,
        sortMethod:
          sortMethod === 'both' ? 'ASC' : sortMethod === 'ASC' ? 'DESC' : 'ASC',
      },
      ({ sortMethod }) => {
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
    setState({ ...state, selectedDropdown: selected, page: 1 }, () => {
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
    });
  };

  const {
    companiesTitle,
    newEntityTitle,
    searchPlaceholder,
    suspendedEntityTitle,
    tabTitles,
    cardLabels,
    buttons,
    pageText,
    newEntityHeaders,
    dropdownOptions,
  } = constants.dashboard;
  newEntityHeaders[1] = {
    ...newEntityHeaders[1],
    className: sortMethod === 'both' ? '' : 'active',
    onHeaderClick: onHeaderClick,
    icons: [{ className: sortingMethodIconMapper[sortMethod] }],
  };
  const { addCompanyTooltip, removeCompanyTooltip } = constants.tooltips;
  const { entities, urls, datapoints, newEntities } = dashboardDetails;

  return (
    <Container className="dashboard">
      <Row className="small-data-card-info">
        <DetailCard
          value={entities}
          label={cardLabels[0]}
          colorClass="pink"
          imagePath="/images/company.svg"
        />
        <DetailCard
          value={newEntities}
          label={cardLabels[3]}
          colorClass="sky-blue"
          imagePath="/images/office-building.svg"
        />
        <DetailCard
          value={urls}
          label={cardLabels[1]}
          colorClass="light-orange"
          imagePath="/images/web-url.svg"
        />
        <DetailCard
          value={datapoints}
          label={cardLabels[2]}
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
        <Tab eventKey="companies" title={tabTitles[0]}>
          <Card className="no-top-radius companies">
            <Card.Body className="pad-2">
              <Card.Title>
                <span>{companiesTitle}</span>
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
                      placeholder={searchPlaceholder}
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
              label={buttons.update}
              onClick={onUpdateCompanies}
              isLoading={isUpdateBtnLoading}
            />
          </div>
        </Tab>
        <Tab eventKey="new-entities" title={tabTitles[1]}>
          <Card className="no-top-radius new-entities">
            <Card.Body className="pad-2">
              <Card.Title>
                <span>{newEntityTitle}</span>
                <Form>
                  <div className="inline-heading-form">
                    <Input
                      controlId="searchInput"
                      placeholder={searchPlaceholder}
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
                countText={pageText}
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
                              {removeCompanyTooltip}
                            </ToolTip>
                            <ToolTip id={'add-company' + item.id} place="left">
                              {addCompanyTooltip}
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
        <Tab eventKey="suspended-entities" title={tabTitles[2]}>
          <Card className="no-top-radius suspended-entities">
            <Card.Body className="pad-2">
              <Card.Title>
                <span>{suspendedEntityTitle}</span>
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
                      placeholder={searchPlaceholder}
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
