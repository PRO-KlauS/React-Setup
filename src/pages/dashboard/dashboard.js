import React from "react";
import { Container, Row, Card, Tabs, Tab, Form } from "react-bootstrap";
import { useQuery, useQueryClient } from "react-query";
import {
  DetailCard,
  Input,
  CompanyTable,
  Checkbox,
  Button,
  Table,
  ToolTip,
  Dropdown,
  WithLoader,
} from "../../components";
import { getCompanies, getDashBoardDetails } from "../../apis/dashboard";
import { showToast, useStateCallback } from "../../utility/common";
import { constants } from "../../constants";
import { sortingMethodIconMapper } from "../../utility/mapper";
import "../../styles/dashboard.scss";

const Dashboard = ({ profile }) => {
  const [state, setState] = useStateCallback({
    searchValue: "",
    searchedValue: "",
    selectedCompanies: [],
    isHeaderCheckBoxSelected: false,
    activeTab: "companies",
    page: 1,
    isUpdateBtnLoading: false,
    sortMethod: "both",
    selectedDropdown: { value: "All", key: "all" },
    companies: {
      items: [],
      totalItemCount: 0,
      totalPages: 0,
    },
    dashboardDetails: {
      entities: 0,
      urls: 0,
      datapoints: 0,
      newEntities: 0,
    },
  });
  const {
    searchValue,
    searchedValue,
    selectedCompanies,
    isHeaderCheckBoxSelected,
    activeTab,
    page,
    isUpdateBtnLoading,
    sortMethod,
    selectedDropdown,
    companies,
    dashboardDetails,
  } = state;

  const { items = [], totalItemCount, totalPages } = companies || {};

  const generateBody = () => {
    let body = {
      search: searchedValue,
      page: page,
      is_company_and_new: activeTab === "companies",
      is_new: activeTab === "new-entities",
      is_suspended: activeTab === "suspended-entities",
    };
    if (
      activeTab !== "new-entities" &&
      selectedDropdown &&
      selectedDropdown.value !== "All"
    ) {
      body.entity_type = selectedDropdown.value;
    }
    if (sortMethod !== "both") {
      body.sort_by = sortMethod;
    }
    return body;
  };

  const getCachedCompaniesFromQueryData = (queryKey) => {
    const res = queryClient.getQueryData(queryKey);
    let newCompanies;
    if (res && res.data) {
      newCompanies = {
        items: res.data.data || [],
        totalItemCount: (res.data.pagination && res.data.pagination.count) || 0,
        totalPages: (res.data.pagination && res.data.pagination.pages) || 0,
      };
    }
    return newCompanies;
  };

  const { isLoading: isDetailsLoading } = useQuery(
    "dashboard-details",
    () => getDashBoardDetails(),
    {
      onSuccess: (res) => {
        if (!res.data.status) {
          showToast(res.data.error_message);
        }
        let newDashboardDetails = {
          entities: res.data.data ? res.data.data.entities : 0,
          urls: res.data.data ? res.data.data.urls : 0,
          datapoints: res.data.data ? res.data.data.datapoints : 0,
          newEntities: res.data.data ? res.data.data.new_entities : 0,
        };
        setState({ ...state, dashboardDetails: newDashboardDetails });
      },
    }
  );

  const { isLoading: isListLoading } = useQuery(
    [
      "companies",
      page,
      searchedValue,
      activeTab,
      selectedDropdown.value,
      sortMethod,
    ],
    () => {
      let body = generateBody();
      return getCompanies(body);
    },
    {
      onSuccess: (res) => {
        if (res.data.status) {
          showToast(res.data.message);
        } else {
          showToast(res.data.error_message);
        }
        let newCompanies = {
          items: (res.data && res.data.data) || [],
          totalItemCount:
            (res.data && res.data.pagination && res.data.pagination.count) || 0,
          totalPages:
            (res.data && res.data.pagination && res.data.pagination.pages) || 0,
        };
        setState({ ...state, companies: newCompanies });
      },
      staleTime: 10000,
    }
  );

  const queryClient = useQueryClient();

  queryClient.prefetchQuery(
    [
      "companies",
      page + 1,
      searchedValue,
      activeTab,
      selectedDropdown.value,
      sortMethod,
    ],
    () => {
      let body = generateBody();
      body.page = page + 1;
      return getCompanies(body);
    },
    {
      staleTime: 10000,
    }
  );

  const onPageChange = (page) => {
    const newCompanies = getCachedCompaniesFromQueryData([
      "companies",
      page,
      searchedValue,
      activeTab,
      selectedDropdown.value,
      sortMethod,
    ]);
    setState(
      {
        ...state,
        page: page,
        isHeaderCheckBoxSelected: false,
        selectedCompanies: [],
        companies: newCompanies || companies,
      },
      () => {
        let elem = document.getElementById("dashboard-tabs-tab-companies");
        window.scrollTo({
          top: elem.offsetTop - 70,
          behavior: "smooth",
        });
      }
    );
  };

  const onSearchValueChange = (e) => {
    setState({ ...state, searchValue: e.target.value });
  };

  const onSearchCompanies = (e) => {
    e.preventDefault();
    const newCompanies = getCachedCompaniesFromQueryData([
      "companies",
      1,
      searchValue,
      activeTab,
      selectedDropdown.value,
      sortMethod,
    ]);
    setState({
      ...state,
      page: 1,
      searchedValue: searchValue,
      companies: newCompanies || companies,
    });
  };

  const onTabChange = (tab) => {
    const newCompanies = getCachedCompaniesFromQueryData([
      "companies",
      page,
      searchedValue,
      tab,
      selectedDropdown.value,
      sortMethod,
    ]);
    setState({
      ...state,
      searchValue: "",
      searchedValue: "",
      selectedCompanies: [],
      isHeaderCheckBoxSelected: false,
      activeTab: tab,
      isUpdateBtnLoading: false,
      page: 1,
      sortMethod: "both",
      selectedDropdown: { value: "All", key: "all" },
      companies: newCompanies || companies,
    });
  };
  const onSelectCheckbox = (id) => {
    if (selectedCompanies.includes(id)) {
      setState({
        ...state,
        isHeaderCheckBoxSelected: false,
        selectedCompanies: selectedCompanies.filter(
          (companyID) => companyID !== id
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

  const onHeaderClick = () => {
    const newCompanies = getCachedCompaniesFromQueryData([
      "companies",
      page,
      searchValue,
      activeTab,
      selectedDropdown.value,
      sortMethod === "both" ? "ASC" : sortMethod === "ASC" ? "DESC" : "ASC",
    ]);
    setState({
      ...state,
      sortMethod:
        sortMethod === "both" ? "ASC" : sortMethod === "ASC" ? "DESC" : "ASC",
      companies: newCompanies || companies,
    });
  };

  const onDropdownValueChange = (selected) => {
    setState({ ...state, selectedDropdown: selected, page: 1 });
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
    className: sortMethod === "both" ? "" : "active",
    onHeaderClick: onHeaderClick,
    icons: [{ className: sortingMethodIconMapper[sortMethod] }],
  };
  const { addCompanyTooltip, removeCompanyTooltip } = constants.tooltips;
  const { entities, urls, datapoints, newEntities } = dashboardDetails;

  return (
    <WithLoader isLoading={isDetailsLoading || isListLoading}>
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
          className="no-bdr"
        >
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
                        isControlled={true}
                        value={searchValue}
                        onChange={onSearchValueChange}
                        iconClass="fas fa-search"
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
                        isControlled={true}
                        value={searchValue}
                        onChange={onSearchValueChange}
                        iconClass="fas fa-search"
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
                  onPageChange={onPageChange}
                >
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
                                data-for={"remove-company" + item.id}
                              >
                                <i className="fas fa-times-circle" />
                              </a>
                              <a
                                href="javascript:;"
                                className="approve"
                                data-tip
                                data-for={"add-company" + item.id}
                              >
                                <i className="fas fa-check-circle" />
                              </a>
                              <ToolTip
                                id={"remove-company" + item.id}
                                place="left"
                              >
                                {removeCompanyTooltip}
                              </ToolTip>
                              <ToolTip
                                id={"add-company" + item.id}
                                place="left"
                              >
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
                        isControlled={true}
                        value={searchValue}
                        onChange={onSearchValueChange}
                        iconClass="fas fa-search"
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
                  sortMethod={sortMethod}
                  onHeaderClick={onHeaderClick}
                />
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
    </WithLoader>
  );
};

export default Dashboard;
