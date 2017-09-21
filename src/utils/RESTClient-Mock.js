import Endpoints from './Endpoints';
import Reactotron from 'reactotron-react-native'

const RESTClient = {


  Car: {

    fetchCars: authToken => {
      return new Promise((resolve,reject) => {
        resolve('Yeah');
      }).then((res) =>{

        return {
          status: "success",
          data: [{
            id: 1,
            name: "Suzuki swift",
            ip: "192.168.1.200",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Suzuki_Swift_IV_Facelift_front_20100501.jpg",
            state: 0,
            keys: []
          },
          {
            id: 2,
            name: "Chevrolet Onix",
            ip: "192.168.1.105",
            image: "http://motorsports.com.uy/wp-content/uploads/chevrolet-onix-2015-hatchback-blaco.jpg",
            state: 1,
            keys: ["1234","123456ad"]
          },
          {
            id: 3,
            name: "Volkswagen Gol",
            ip: "192.168.1.105",
            image: "https://http2.mlstatic.com/volkswagen-gol-g3-16-D_NQ_NP_932405-MLU20856087935_082016-F.jpg",
            state: 1,
            keys: ["1234","123456ad"]
          },
          {
            id: 2,
            name: "Chevrolet Onix",
            ip: "192.168.1.105",
            image: "http://motorsports.com.uy/wp-content/uploads/chevrolet-onix-2015-hatchback-blaco.jpg",
            state: 1,
            keys: ["1234","123456ad"]
          }]
        }


      }
        

        ).catch((error)=>{
                  return error;
        });
    },
  },

  Key: {
/*
    fetchKeys: () => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Keys.get(),
            options: {
              method: 'GET',
              headers: {
                Accept: 'application/json',
              },
            }
          },
          resolve,
          reject
        );
      });
    },*/
    remove: (id) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Keys.remove(id),
            options: {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
              },
            }
          },
          resolve,
          reject
        );
      });
    },
    add: (key) => {
      return new Promise((resolve, reject) => {
        request(
          {
            endpoint: Endpoints.Keys.add(),
            options: {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(key)
            }
          },
          resolve,
          reject
        );
      });
    },

    fetchKeys: authToken => {
      return new Promise((resolve,reject) => {
        resolve('Yeah');
      }).then((res) =>{

        return {
          status: "success",
          data: [{
            ownerName: "Jota Pe",
            id: "d2f3fkkf32kfkfpf",
            hours: [[1000,2000]],
          }]
        }


      }
        

        ).catch((error)=>{
                  return error;
        });
    },
  },



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
  },

}

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
