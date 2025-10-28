const NESTED_ROUTES = {
  ROOT: '/',
  CREATE: '/new',
  EDIT: '/edit',
}

export const ROUTES = {
  PUBLIC: {
    ROOT: '/',
  },
  PRIVATE: {
    ROOT: '/dashboard',
    ASSETS: {
      PARENT: '/assets',
      ...NESTED_ROUTES
    },
    THREATS_HUB: {
      PARENT: '/threats',
      ...NESTED_ROUTES
    },
    VULNERABILITY: {
      PARENT: '/vulnerability',
      ...NESTED_ROUTES
    },
    CONTROLS: {
      PARENT: '/controls',
      ...NESTED_ROUTES
    },
    COMPLIANCE: {
      PARENT: '/compliance',
      ...NESTED_ROUTES
    },
    INCIDENT: {
      PARENT: '/incident',
      ...NESTED_ROUTES
    },
    RISK: {
      PARENT: '/risk',
      ...NESTED_ROUTES
    },
    REPORTS: '/reports',
    USERS: {
      PARENT: '/users',
      ...NESTED_ROUTES
    },
    PROFILE: '/profile',
    SETTING: '/setting',
    ADMINISTRATION: {
      PARENT: '/administration',
      CHILD: {
        ASSET_TYPE: {
          PARENT: '/asset_types',
          ...NESTED_ROUTES
        },
        DEPARTMENTS: {
          PARENT: '/departments',
          ...NESTED_ROUTES
        },
        CONTROL_QUESTIONS: {
          PARENT: '/control_questions',
          ...NESTED_ROUTES
        },
        COMPLIANCE_QUESTIONS: {
          PARENT: '/compliance_questions',
          ...NESTED_ROUTES
        },
        ORGANIZATIONS: {
          PARENT: '/organizations',
          ...NESTED_ROUTES
        },
        FRAMEWORKS: {
          PARENT: '/frameworks',
          ...NESTED_ROUTES
        },
      }
    },
  },
};
