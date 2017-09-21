const pubnubKeys = {
  subscribe: "sub-c-379d2322-ec93-11e6-a85c-0619f8945a4f",
  publish: "pub-c-28a46c53-1fa8-4da5-89bb-417521d8f771"
};

const roundState = {
  PENDING: 0,
  ACCEPTED: 1,
  CANCELED: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  CLOSED: 5
};

const notificationMessage = {
  requested: 'requested a round:',
  updated: 'updated a round:',
  accepted: 'confirmed your round',
  cancelled: 'declined your round',
  tip: 'sent you a tip!',
  invite: 'invited you to a round'
};

export default {pubnubKeys, roundState, notificationMessage};
