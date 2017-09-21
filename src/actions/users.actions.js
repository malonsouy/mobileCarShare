export const signUpUser = userData => {
  return {
    type: 'SIGN_UP_USER',
    userData
  };
};

export const resetPassword = (newPassword,isGolfer) => {
  return {
    type: 'RESET_PASSWORD',
    newPassword,
    isGolfer
  };
};

export const requestNewPassword = email => {
  return {
    type: 'REQUEST_NEW_PASSWORD',
    email
  };
};

export const logout = () => {
  return {
    type: 'USER_LOGOUT'
  };
};

export const resetUser = () => {
  return {
    type: 'USER_RESET'
  };
};

export const updateUser = userData => {
  return {
    type: 'UPDATE_USER',
    userData
  };
};

export const userLogin = ({ email, password }) => {
  return {
    type: 'VALIDATE_USER_LOGIN',
    email,
    password
  };
};

export const setUserData = userData => {
  return {
    type: 'SET_USER_DATA',
    userData
  };
};