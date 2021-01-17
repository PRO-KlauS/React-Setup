import React from 'react';
import { Container, Card, Form } from 'react-bootstrap';
import { useQuery, useQueryClient } from 'react-query';
import { Table, Input, Button, WithLoader } from '../../components';
import { getUserList } from '../../apis/manageUsers';
import { showToast, useStateCallback } from '../../utility/common';
import { constants } from '../../constants';
import '../../styles/manageUsers.scss';

const ManageUsers = ({ history, profile }) => {
  const queryClient = useQueryClient();
  const getCachedUsersFromQueryData = (queryKey) => {
    const res = queryClient.getQueryData(queryKey);
    let newUsers = {
      items: [],
      totalItemCount: 0,
      totalPages: 0,
    };
    if (res && res.data) {
      newUsers = {
        items: (res.data && res.data.data && res.data.data.users) || [],
        totalItemCount:
          (res.data && res.data.pagination && res.data.pagination.count) || 0,
        totalPages:
          (res.data && res.data.pagination && res.data.pagination.pages) || 0,
      };
    }
    return newUsers;
  };

  const [state, setState] = useStateCallback({
    page: 1,
    searchValue: '',
    searchedValue: '',
    isButtonLoading: false,
    users: getCachedUsersFromQueryData(['users', 1, '']),
  });
  const { isButtonLoading, page, searchValue, searchedValue, users } = state;

  const generateBody = () => {
    return {
      page: page,
      is_active: true,
      search: searchedValue,
    };
  };

  const { isLoading } = useQuery(
    ['users', page, searchedValue],
    () => {
      const body = generateBody();
      return getUserList(body);
    },
    {
      onSuccess: (res) => {
        if (res.data.status) {
          showToast(res.data.message);
        } else {
          showToast(res.data.error_message);
        }
        let newUsers = {
          items: (res.data && res.data.data && res.data.data.users) || [],
          totalItemCount:
            (res.data && res.data.pagination && res.data.pagination.count) || 0,
          totalPages:
            (res.data && res.data.pagination && res.data.pagination.pages) || 0,
        };
        setState({ ...state, users: newUsers });
      },
      staleTime: 10000,
    },
  );

  queryClient.prefetchQuery(
    ['users', page + 1, searchedValue],
    () => {
      const body = generateBody();
      body.page = page + 1;
      return getUserList(body);
    },
    {
      staleTime: 10000,
    },
  );

  const onPageChange = (page) => {
    const newUsers = getCachedUsersFromQueryData([
      'users',
      page,
      searchedValue,
    ]);
    setState({ ...state, page: page, users: newUsers || users }, () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  };
  const onSearchValueChange = (e) => {
    setState({ ...state, searchValue: e.target.value });
  };
  const onSearchUser = (e) => {
    e.preventDefault();
    const newUsers = getCachedUsersFromQueryData(['users', 1, searchValue]);
    setState({
      ...state,
      searchedValue: searchValue,
      page: 1,
      users: newUsers || users,
    });
  };
  const onEditUser = (user) => {
    history.push(`/edit-user/${user.id}`, user);
  };
  const onAddUser = () => {
    history.push('/add-new-user');
  };
  const { items, totalItemCount, totalPages } = users;
  const {
    adminPlaceholder,
    buttons,
    headers,
    pageText,
    searchText,
    title,
    userPlaceholder,
  } = constants.manageUsers;
  return (
    <WithLoader isLoading={isLoading}>
      <Container className="manage-users">
        <Card>
          <Card.Body className="pad-2">
            <Card.Title>
              <span>{title}</span>
              <div className="inline-heading-form">
                <Button
                  label={buttons.add}
                  onClick={onAddUser}
                  className="add-btn left"
                  prependIcon={true}
                  iconClass="fas fa-plus"
                />
                <Form>
                  <Input
                    controlId="findUsers"
                    placeholder={searchText}
                    name="dataPoint"
                    isControlled={true}
                    value={searchValue}
                    onChange={onSearchValueChange}
                    iconClass="fas fa-search"
                    isButtonDisabled={isButtonLoading}
                    onButtonClick={onSearchUser}
                    isLoading={isButtonLoading}
                    buttonVariant="success"
                    hasButton={true}
                    buttonType="submit"
                  />
                </Form>
              </div>
            </Card.Title>
            <Table
              activePage={page}
              countText={pageText}
              pageCount={totalPages}
              totalItemsCount={totalItemCount}
              headers={headers}
              onPageChange={onPageChange}>
              {items &&
                items.length > 0 &&
                items.map((item, index) => {
                  return (
                    <tr>
                      <td>{(page - 1) * 10 + index + 1}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>
                        <i className="fas fa-envelope" />
                        {item.email}
                      </td>
                      <td>
                        <i className="fas fa-user" />
                        {item.is_admin ? adminPlaceholder : userPlaceholder}
                      </td>
                      <td>
                        {profile && profile.id !== item.id && (
                          <a href="javascript:;" className="action edit">
                            <i
                              className="fas fa-pencil-alt"
                              onClick={() => onEditUser(item)}
                            />
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </WithLoader>
  );
};

export default ManageUsers;
