export const submitNotification = notification => {
  return {
    type: 'NOTIFICATION_SUBMIT',
    notification
  };
};

export const fetchUserNotifications = () => {
  return {
    type: 'USER_NOTIFICATIONS_FETCH'
  };
};

export const setUserNotifications = notifications => {
  return {
    type: 'SET_USER_NOTIFICATIONS',
    notifications
  };
};