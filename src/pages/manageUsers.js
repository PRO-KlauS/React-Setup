import React, { useEffect } from 'react';
import { Container, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, Input, Button } from '../components';
import { showToast, useStateCallback } from '../utility/common';
import { decrementLoaderCount, incrementLoaderCount } from '../actions/loader';
import { getUserList } from '../apis/manageUsers';

const ManageUsers = ({ history }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { profile } = useSelector((state) => ({
    profile: state.profile,
  }));

  useEffect(() => {
    getUsers({ search: '', page: 1, is_active: true }).finally(() => {
      dispatch(decrementLoaderCount());
    });
  }, []);

  const [state, setState] = useStateCallback({
    searchValue: '',
    page: 1,
    isButtonLoading: false,
    users: {
      items: [],
      totalItemCount: 0,
      totalPages: 0,
    },
  });
  const { searchValue, page, isButtonLoading, users } = state;

  const getUsers = (body) => {
    dispatch(incrementLoaderCount());
    return getUserList(body).then((res) => {
      if (res.data.status) {
        let users = {
          items: (res.data.data && res.data.data.users) || [],
          totalItemCount:
            (res.data.pagination && res.data.pagination.count) || 0,
          totalPages: (res.data.pagination && res.data.pagination.pages) || 0,
        };
        setState({ ...state, users: users });
      } else {
        showToast(res.data.error_message);
      }
      return Promise.resolve(res);
    });
  };

  const onPageChange = (page) => {
    setState({ ...state, page: page }, () =>
      getUsers({ search: searchValue, page: page, is_active: true })
        .then((res) => {
          if (res.data.status) {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }
        })
        .finally(() => dispatch(decrementLoaderCount())),
    );
  };
  const onSearchValueChange = (e) => {
    setState({ ...state, searchValue: e.target.value });
  };
  const onSearchUser = () => {
    setState({ ...state, isButtonLoading: true, page: 1 }, () => {
      getUsers({ search: searchValue, page: 1, is_active: true }).finally(
        () => {
          setState({ ...state, isButtonLoading: false });
          dispatch(decrementLoaderCount());
        },
      );
    });
  };
  const onEditUser = (user) => {
    history.push(`/edit-user/${user.id}`, user);
  };
  const onAddUser = () => {
    history.push('/add-new-user');
  };
  const { items, totalItemCount, totalPages } = users;

  return (
    <Container className="manage-users">
      <Card>
        <Card.Body className="pad-2">
          <Card.Title>
            <span>{t('manageUsers.title')}</span>
            <div className="inline-heading-form">
              <Button
                label={t('manageUsers.buttons.add')}
                onClick={onAddUser}
                className="add-btn left"
                prependIcon={true}
                iconClass="fas fa-plus"
              />
              <Form>
                <Input
                  controlId="findUsers"
                  placeholder={t('manageUsers.searchText')}
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
            countText={t('manageUsers.pageText')}
            pageCount={totalPages}
            totalItemsCount={totalItemCount}
            headers={t('manageUsers.headers', { returnObjects: true })}
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
                      {item.is_admin
                        ? t('manageUsers.adminPlaceholder')
                        : t('manageUsers.userPlaceholder')}
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
  );
};

export default ManageUsers;
