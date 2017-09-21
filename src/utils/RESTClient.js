import Endpoints from './Endpoints';
import Reactotron from 'reactotron-react-native'

const RESTClient = {

  Notifications: {
    notificationsForUser: (authToken,userId) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Notifications.notificationsForUser(userId),
            options: {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              },
            }
          },
          resolve,
          reject
        );
      });
    },
    create: (authToken, notification) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Notifications.create(),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              },
              body: JSON.stringify(notification)
            }
          },
          resolve,
          reject
        );
      });
    },
  },
  Tips: {
    create: (authToken, tipData) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Tip.create(),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              },
              body: JSON.stringify(tipData)
            }
          },
          resolve,
          reject
        );
      });
    },
    tipsForCaddie: (authToken,caddieId) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Tip.tipsForCaddie(caddieId),
            options: {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              },
            }
          },
          resolve,
          reject
        );
      });
    },
  },
  Users: {
    resetPassword: (data) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.resetPassword(),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }
          },
          resolve,
          reject
        );
      });
    },
    requestNewPassword: (data) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.requestNewPassword(),
            options: {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }
          },
          resolve,
          reject
        );
      });
    },
    signUp: (userData) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.signUp(),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
            }
          },
          resolve,
          reject
        );
      });
    },
    update: (authToken, userId, userData) => {
      return new Promise((resolve, reject) => {
        request({
          endpoint: Endpoints.Users.update(),
          options: {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': authToken
          },
          body: JSON.stringify(userData)
          }
        }, resolve, reject);
      });
    },
    login: ({ email, password }) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.login(),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
            }
          },
          resolve,
          reject
        );
      });
    },
    createManagedAccount: (data, authToken) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.createManagedAccount(),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              },
              body: JSON.stringify(data)
            }
          },
          resolve,
          reject
        );
      });
    },
    createStripeCustomer: (token, authToken) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.createStripeCustomer(),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              },
              body: JSON.stringify({ token })
            }
          },
          resolve,
          reject
        );
      });
    },
    listCaddies: authToken => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.listCaddies(),
            options: {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              }
            }
          },
          resolve,
          reject
        );
      });
    },
    listGolfers: authToken => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.listGolfers(),
            options: {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              }
            }
          },
          resolve,
          reject
        );
      });
    },
    getSignedRequest: ({type,name}) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.getSignedRequest({type,name}),
            options: {
              method: 'GET',
            }
          },
          resolve,
          reject
        );
      });
    },
    cardDetails: authToken => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Users.cardDetails(),
            options: {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              }
            }
          },
          resolve,
          reject
        );
      });
    },
  },

  S3: {

    uploadFile: (file, signedRequest) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.setRequestHeader('Content-Type', 'image/jpeg');
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if(xhr.status === 200) {
              resolve(xhr.response);
            } else {
              reject({
                status: this.status,
                statusText: xhr.statusText
              });
            }
          }
        };
        xhr.onerror = function () {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        };
        xhr.send(file);
      });
    }

  },

  Round: {
    create: (authToken, roundDetails) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Round.create(),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              },
              body: JSON.stringify(roundDetails)
            }
          },
          resolve,
          reject
        );
      });
    },
    update: (authToken, roundId, roundDetails) => {
      return new Promise((resolve, reject) => {
        request({
          endpoint: Endpoints.Round.update(roundId),
          options: {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': authToken
          },
          body: JSON.stringify(roundDetails)
          }
        }, resolve, reject);
      });
    },
    roundsForGolfer: authToken => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Round.roundsForGolfer(),
            options: {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': authToken
              }
            }
          },
          resolve,
          reject
        );
      });
    },
    roundsForCaddie: authToken => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Round.roundsForCaddie(),
            options: {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': authToken
              }
            }
          },
          resolve,
          reject
        );
      });
    },
    inviteFriends: (authToken, friends) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Round.inviteFriends(),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              },
              body: JSON.stringify(friends)
            }
          },
          resolve,
          reject
        );
      });
    },
    calculateCost: (authToken, data) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Round.calculateCost(),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': authToken
              },
              body: JSON.stringify(data)
            }
          },
          resolve,
          reject
        );
      });
    },
  },

  Stripe: {
    createCardToken: cardData => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Stripe.createCardToken(cardData),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer pk_test_kEvdItrteZsUTKZVX4b2bFLI'
              }
            }
          },
          resolve,
          reject
        );
      });
    },
    createBankAccountToken: accountData => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Stripe.createCardToken(accountData),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer pk_test_kEvdItrteZsUTKZVX4b2bFLI'
              }
            }
          },
          resolve,
          reject
        );
      });
    }
  }
};

const request = (config, resolve, reject) => {
  fetch(config.endpoint, config.options)
    .then(res => {
      Reactotron.log(res);
      if (res.status === 503){
       return {status:"error", message: "Service is unavailable at the moment. Try again later."};
      }
      if (res.status !== 200 && res.status !== 304 && res.status !== 500){
       return res.text();
      }
      if(res._bodyInit === null || res._bodyInit === ""){
        return null;
      }
      const contentType = res.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return res.json();
      }else{
        return res.text();
      }
    })
    .then(res => {
      if (typeof res !== 'undefined') {
        resolve(res);
      } else {
        reject(res);
      }
    })
    .catch(err => {
      reject(err);
    });
};

export default RESTClient;
