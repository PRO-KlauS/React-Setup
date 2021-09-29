const jpTranslation = {
  loginPage: {
    title: 'Japanese Account Login',
    emailPlaceholder: 'Japanese Email',
    passwordPlaceholder: 'Japanese Password',
    rememberMePlaceholder: 'Japanese Remember Me',
    buttons: {
      login: 'Japanese Login',
    },
  },
  dashboard: {
    companiesTitle: 'Japanese List of Companies',
    newEntityTitle: 'Japanese List of New Companies',
    suspendedEntityTitle: 'Japanese List of Suspended Companies',
    searchPlaceholder: 'Japanese Find by Name',
    tabTitles: [
      'Japanese Companies',
      'Japanese New Companies',
      'Japanese Suspended Companies',
    ],
    cardLabels: [
      'Japanese Companies',
      'Japanese URLs',
      'Japanese Data Points',
      'Japanese New Companies',
    ],
    newEntityHeaders: [
      { label: 'Japanese No.' },
      { label: 'Japanese Company' },
      { label: 'Japanese Action' },
    ],
    pageText: 'Japanese Company List',
    buttons: {
      update: 'Japanese Update',
    },
    dropdownOptions: [
      { value: 'Japanese All', key: 'Japanese all' },
      { value: 'Japanese Startup', key: 'Japanese startup' },
      { value: 'Japanese Investor', key: 'Japanese investor' },
      { value: 'Japanese Accelerator', key: 'Japanese accelerator' },
    ],
  },
  addNewUser: {
    title: 'Japanese Add User Details',
    firstNamePlaceholder: 'Japanese First Name',
    lastNamePlaceholder: 'Japanese Last Name',
    emailPlaceholder: 'Japanese Email',
    passwordPlaceholder: 'Japanese Password',
    adminPlaceholder: 'Japanese Admin',
    confirmPasswordPlaceholder: 'Japanese Confirm Password',
    buttons: {
      addUser: 'Japanese Save Details',
    },
  },
  editUser: {
    title: 'Japanese Edit User Details',
    firstNamePlaceholder: 'Japanese First Name',
    lastNamePlaceholder: 'Japanese Last Name',
    emailPlaceholder: 'Japanese Email',
    passwordPlaceholder: 'Japanese Password',
    adminPlaceholder: 'Japanese Admin',
    confirmPasswordPlaceholder: 'Japanese Confirm Password',
    buttons: {
      editUser: 'Japanese Save Details',
    },
  },
  profile: {
    title: 'Japanese Edit Profile',
    firstNamePlaceholder: 'Japanese First Name',
    lastNamePlaceholder: 'Japanese Last Name',
    emailPlaceholder: 'Japanese Email',
    adminPlaceholder: 'Japanese Admin',
    changePasswordPlaceholder: 'Japanese Change Password?',
    buttons: {
      update: 'Japanese Update',
    },
    changePasswordModal: {
      title: 'Japanese Change Password',
      oldPasswordPlaceholder: 'Japanese Old Password',
      newPasswordPlaceholder: 'Japanese New Password',
      confirmPasswordPlaceholder: 'Japanese Confirm Password',
      footerButtons: {
        cancel: 'Japanese Cancel',
        change: 'Japanese Change',
      },
    },
  },
  manageUsers: {
    title: 'Japanese List of Users',
    pageText: 'Japanese User List',
    searchText: 'Japanese Find by Name or Email',
    adminPlaceholder: 'Japanese Admin',
    userPlaceholder: 'Japanese User',
    headers: [
      { label: 'Japanese No.' },
      { label: 'Japanese First Name' },
      { label: 'Japanese Last Name' },
      { label: 'Japanese Email' },
      { label: 'Japanese Role' },
      { label: 'Japanese Edit' },
    ],
    buttons: {
      add: 'Japanese User',
    },
  },
  companyTable: {
    pageText: 'Japanese Company List',
    buttons: {
      update: 'Japanese Update',
    },
    headers: [
      { label: 'Japanese No.' },
      { label: 'Japanese Company', className: 'Japanese sorting' },
      { label: 'Japanese Sector' },
      { label: 'Japanese Funding Stage' },
      { label: 'Japanese UEN' },
      { label: 'Japanese Updated On' },
      { label: 'Japanese View' },
    ],
  },
  confirmationModal: {
    footerButtons: {
      cancel: 'Japanese Cancel',
      delete: 'Japanese Delete',
    },
  },
  pagination: {
    pagePlaceholder: 'Japanese Page',
    ofPlaceholder: 'Japanese of',
  },
  header: {
    dashboardPlaceholder: "Japanese Dashboard",
    addUserPlaceholder: "Japanese Add User",
    editUserPlaceholder: "Japanese Edit User",
    manageUsersPlaceholder: "Japanese Manage Users",
    profilePlaceholder: 'Japanese Manage Profile',
    logOutPlaceholder: 'Japanese Log Out',
    changeLanguagePlaceholder: 'Japanese Change Language',
    englishPlaceholder: 'English',
    japanesePlaceholder: 'Japanese',
    testNumber: 'Japanese Num : {{value, number}}',
  },
  sidebar: {
    dashboardPlaceholder: 'Japanese Dashboard',
    addUserPlaceholder: 'Japanese Add User',
    manageUsersPlaceholder: 'Japanese Manage Users',
    subMenuExamplePlaceholder: 'Japanese Submenu Example',
    route1Placeholder: 'Japanese Route 1',
    route2Placeholder: 'Japanese Route 2',
    route3Placeholder: 'Japanese Route 3',
    nestedSubMenuPlaceholder: 'Japanese Nested Submenu',
  },
  tooltips: {
    exampleTooltip: 'Japanese Example Tooltip',
  },
  messages: {
    tryAgain: 'Japanese Something went wrong! Please try again later.',
    noData: 'Japanese No data available.',
    sessionExpired: 'Japanese Your session has expired. Please log in again.',
  },
  validationMessages: {
    fieldRequired: "Japanese This field is required.",
    validEmail: "Japanese Enter valid email address.",
    password6To12Chars: 'Password must be of 6-12 characters.',
    onlyAlphabets: "Japanese Numbers and special characters are not allowed.",
    bothPasswordSame: "Japanese Both password must match."
  }
};
export default jpTranslation;
