const APIs = {
  DEV: 'http://192.168.1.200:1234/api'
};

const API = APIs.DEV;
const StripeApi = 'https://api.stripe.com/v1/tokens';

const Endpoints = {
  Users: {
    signUp: () => `${API}/users/signup`,
    resetPassword: () => `${API}/users/resetpassword`,
    requestNewPassword: () => `${API}/users/requestnewpassword`,
    login: () => `${API}/users/login`,
    update: () => `${API}/users/update`,
    createManagedAccount: () => `${API}/users/createmanagedaccount`,
    createStripeCustomer: () => `${API}/users/createstripecustomer`,
    listCaddies: () => `${API}/users/caddies`,
    listGolfers: () => `${API}/users/search/members?terms=`,
    getSignedRequest: ({ type, name }) =>
      `${API}/users/requestsignedurl?file-name=${name}&file-type=${type}`,
    cardDetails: () => `${API}/users/carddetails`,
  },
  Round: {
    create: () => `${API}/rounds/`,
    update: (id) => `${API}/rounds/${id}`,
    roundsForCaddie: () => `${API}/rounds/caddie`,
    roundsForGolfer: () => `${API}/rounds/member`,
    inviteFriends: (id) => `${API}/rounds/invitefriendtoround/${id}`,
    calculateCost: () => `${API}/rounds/calculateroundcost`,
  },
  Tip: {
    create: () => `${API}/tips/`,
    tipsForCaddie: (id) => `${API}/tips/${id}`
  },
  Keys: {
    get: () => `${API}/tags`,
    add: () => `${API}/tags`,
    remove: (id) => `${API}/tags/${id}`
  },
  Notifications: {
    create: () => `${API}/notifications/`,
    notificationsForUser: (id) => `${API}/notifications`
  },
  Stripe: {
    createCardToken: data => `${StripeApi}?${data}`
  }
};

export default Endpoints;
