import { render, screen, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import App from '../../App';
import {
  showToast,
  getFileNameFromURL,
  getFileExtensionFromName,
  useStateCallback,
  getHeaderTitle,
  getSidebarMenuClasses,
  getBaseURL,
} from '../../utility';

test('Testing showToast fn', () => {
  act(() => {
    render(<App />);
  });

  act(() => {
    showToast('Testing showToast function');
  });

  const toastElement = screen.getByText('Testing showToast function');

  expect(toastElement).toBeInTheDocument();
});

test('Testing getFileNameFromURL fn', () => {
  const fileName1 = getFileNameFromURL(
    'https://React_Setup/ib7iIvRF_400x400.jpg',
  );
  const fileName2 = getFileNameFromURL(undefined);

  expect(fileName1).toMatch('ib7iIvRF_400x400.jpg');
  expect(fileName2).toMatch('');
});

test('Testing getFileExtensionFromName fn', () => {
  const fileName1 = getFileNameFromURL(
    'https://React_Setup/ib7iIvRF_400x400.jpg',
  );
  const fileExtension1 = getFileExtensionFromName(fileName1);
  const fileExtension2 = getFileExtensionFromName(undefined);

  expect(fileExtension1).toMatch('jpg');
  expect(fileExtension2).toMatch('');
});

test('Testing useStateCallback fn', () => {
  const { result } = renderHook(() => useStateCallback('test'));

  expect(result.current[0]).toMatch('test');

  act(() => {
    result.current[1]('value changed', (state) => {
      expect(state).toMatch('value changed');
    });
  });
  expect(result.current[0]).toMatch('value changed');
});

test('Testing getHeaderTitle fn', () => {
  const headerTitle1 = getHeaderTitle('http://localhost:3000/profile');
  const headerTitle2 = getHeaderTitle('http://localhost:3000/dashboard');
  const headerTitle3 = getHeaderTitle('http://localhost:3000/add-new-user');
  const headerTitle4 = getHeaderTitle('http://localhost:3000/edit-user');
  const headerTitle5 = getHeaderTitle('http://localhost:3000/manage-users');
  const headerTitle6 = getHeaderTitle(undefined);

  expect(headerTitle1).toMatch('Manage Profile');
  expect(headerTitle2).toMatch('Dashboard');
  expect(headerTitle3).toMatch('Add User');
  expect(headerTitle4).toMatch('Edit User');
  expect(headerTitle5).toMatch('Manage Users');
  expect(headerTitle6).toMatch('Yet to be set');
});

test('Testing getSidebarMenuClasses fn', () => {
  const sidebarClasses1 = getSidebarMenuClasses(
    'http://localhost:3000/profile',
  );
  const sidebarClasses2 = getSidebarMenuClasses(
    'http://localhost:3000/dashboard',
  );
  const sidebarClasses3 = getSidebarMenuClasses(
    'http://localhost:3000/add-new-user',
  );
  const sidebarClasses4 = getSidebarMenuClasses(
    'http://localhost:3000/edit-user',
  );
  const sidebarClasses5 = getSidebarMenuClasses(
    'http://localhost:3000/manage-users',
  );
  const sidebarClasses6 = getSidebarMenuClasses(undefined);

  const case1 = {
    dashboard: 'active',
    manageUsers: '',
  };
  const case2 = {
    dashboard: '',
    manageUsers: 'active',
  };
  const case3 = {
    dashboard: '',
    manageUsers: '',
  };

  expect(sidebarClasses1).toEqual(case3);
  expect(sidebarClasses2).toEqual(case1);
  expect(sidebarClasses3).toEqual(case2);
  expect(sidebarClasses4).toEqual(case2);
  expect(sidebarClasses5).toEqual(case2);
  expect(sidebarClasses6).toEqual(case3);
});

test('Testing getBaseURL fn', () => {
  // For local environment
  global.process.env.REACT_APP_LOCAL_URL = 'https://local-url.com';
  const baseURL1 = getBaseURL();

  expect(baseURL1).toMatch('https://local-url.com');

  // For staging environment
  global.process.env.REACT_APP_ENV = 'staging';
  global.process.env.REACT_APP_STAGING_URL = 'https://staging-url.com';
  const baseURL2 = getBaseURL();

  expect(baseURL2).toMatch('https://staging-url.com');

  // For production environment
  global.process.env.REACT_APP_ENV = 'production';
  global.process.env.REACT_APP_PRODUCTION_URL = 'https://production-url.com';
  const baseURL3 = getBaseURL();

  expect(baseURL3).toMatch('https://production-url.com');
});
