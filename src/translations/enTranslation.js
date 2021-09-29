const enTranslation = {
  loginPage: {
    title: 'Account Login',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    rememberMePlaceholder: 'Remember Me',
    buttons: {
      login: 'Login',
    },
  },
  dashboard: {
    companiesTitle: 'List of Companies',
    newEntityTitle: 'List of New Companies',
    suspendedEntityTitle: 'List of Suspended Companies',
    searchPlaceholder: 'Find by Name',
    tabTitles: ['Companies', 'New Companies', 'Suspended Companies'],
    cardLabels: ['Companies', 'URLs', 'Data Points', 'New Companies'],
    newEntityHeaders: [
      { label: 'No.' },
      { label: 'Company' },
      { label: 'Action' },
    ],
    pageText: 'Company List',
    buttons: {
      update: 'Update',
    },
    dropdownOptions: [
      { value: 'All', key: 'all' },
      { value: 'Startup', key: 'startup' },
      { value: 'Investor', key: 'investor' },
      { value: 'Accelerator', key: 'accelerator' },
    ],
  },
  addNewUser: {
    title: 'Add User Details',
    firstNamePlaceholder: 'First Name',
    lastNamePlaceholder: 'Last Name',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    adminPlaceholder: 'Admin',
    confirmPasswordPlaceholder: 'Confirm Password',
    buttons: {
      addUser: 'Save Details',
    },
  },
  editUser: {
    title: 'Edit User Details',
    firstNamePlaceholder: 'First Name',
    lastNamePlaceholder: 'Last Name',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Password',
    adminPlaceholder: 'Admin',
    confirmPasswordPlaceholder: 'Confirm Password',
    buttons: {
      editUser: 'Save Details',
    },
  },
  profile: {
    title: 'Edit Profile',
    firstNamePlaceholder: 'First Name',
    lastNamePlaceholder: 'Last Name',
    emailPlaceholder: 'Email',
    adminPlaceholder: 'Admin',
    changePasswordPlaceholder: 'Change Password?',
    buttons: {
      update: 'Update',
    },
    changePasswordModal: {
      title: 'Change Password',
      oldPasswordPlaceholder: 'Old Password',
      newPasswordPlaceholder: 'New Password',
      confirmPasswordPlaceholder: 'Confirm Password',
      footerButtons: {
        cancel: 'Cancel',
        change: 'Change',
      },
    },
  },
  manageUsers: {
    title: 'List of Users',
    pageText: 'User List',
    searchText: 'Find by Name or Email',
    adminPlaceholder: 'Admin',
    userPlaceholder: 'User',
    headers: [
      { label: 'No.' },
      { label: 'First Name' },
      { label: 'Last Name' },
      { label: 'Email' },
      { label: 'Role' },
      { label: 'Edit' },
    ],
    buttons: {
      add: 'User',
    },
  },
  companyTable: {
    pageText: 'Company List',
    buttons: {
      update: 'Update',
    },
    headers: [
      { label: 'No.' },
      { label: 'Company', className: 'sorting' },
      { label: 'Sector' },
      { label: 'Funding Stage' },
      { label: 'UEN' },
      { label: 'Updated On' },
      { label: 'View' },
    ],
  },
  confirmationModal: {
    footerButtons: {
      cancel: 'Cancel',
      delete: 'Delete',
    },
  },
  pagination: {
    pagePlaceholder: 'Page',
    ofPlaceholder: 'of',
  },
  header: {
    dashboardPlaceholder: "Dashboard",
    addUserPlaceholder: "Add User",
    editUserPlaceholder: "Edit User",
    manageUsersPlaceholder: "Manage Users",
    profilePlaceholder: 'Manage Profile',
    logOutPlaceholder: 'Log Out',
    changeLanguagePlaceholder: 'Change Language',
    englishPlaceholder: 'English',
    japanesePlaceholder: 'Japanese',
    testNumber: 'Num : {{value, number}}',
  },
  sidebar: {
    dashboardPlaceholder: 'Dashboard',
    addUserPlaceholder: 'Add User',
    manageUsersPlaceholder: 'Manage Users',
    subMenuExamplePlaceholder: 'Submenu Example',
    route1Placeholder: 'Route 1',
    route2Placeholder: 'Route 2',
    route3Placeholder: 'Route 3',
    nestedSubMenuPlaceholder: 'Nested Submenu',
  },
  tooltips: {
    exampleTooltip: 'Example Tooltip',
  },
  messages: {
    tryAgain: 'Something went wrong! Please try again later.',
    noData: 'No data available.',
    sessionExpired: 'Your session has expired. Please log in again.',
  },
  validationMessages: {
    fieldRequired: "This field is required.",
    validEmail: "Enter valid email address.",
    password6To12Chars: 'Password must be of 6-12 characters.',
    onlyAlphabets: "Numbers and special characters are not allowed.",
    bothPasswordSame: "Both password must match."
  }
};
export default enTranslation;
