const axios = require("axios");

export default axiOS = {
  get: async (endpoint = '', body = {}) => {
    await axios.get(`http://localhost:3001${endpoint}`)
      .then(response => response)
      .catch(async err => {
        //if axios cannot find the server, the status code will be 0
        if (err.request.status === 0) {
          await axios.get(`http://172.31.99.105:3001${endpoint}`)
          .then(response => response)
          .catch(err => console.log("GET Error: ", err))
        } else {
          console.log("GET Error: ", err);
        }
      });
  },

  post: (endpoint, obj) => {
    return `data at ${endpoint} posted`;
  },

  put: (endpoint, obj) => {
    return `data at ${endpoint} putted`;
  },

  delete: (endpoint, obj) => {
    return `data at ${endpoint} deleted`;
  }
};

// axios
//   .get("http://localhost:3001/api/time")
//   .then(response => {
//     console.log("response.data", response.data);
//   })
//   .catch(err => {
//     if (err.request.status === 0) {
//       axios.get("http://172.31.99.105:3001/api/time").then(response => {
//         console.log("response.data", response.data);
//       });
//     } else {
//       console.log("err", err);
//     }
//   });
