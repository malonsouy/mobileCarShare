const Utils = {

  updateObjectInArray(array, object) {
      return array.map( (item) => {
          if(item._id !== object._id) {
              // This isn't the item we care about - keep it as-is
              return item;
          }

          // Otherwise, this is the one we want - return an updated value
          return {
              ...item,
              ...object
          };    
      });
  },

  dateByDateTimeString(date,time) {

    const dateString = date.split('/');
    const timeString = time.split(':');
    
    let dateTime = new Date(
        parseInt(dateString[2]),
        parseInt(dateString[0]) - 1,
        parseInt(dateString[1]),
        parseInt(timeString[0]),
        parseInt(timeString[1])
      );
    return dateTime;

  },

  capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  },

  encodeJSONToQueryString(json) {
    var formBody = [];
    for (var property in json) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(json[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    return formBody;
  },

  validateForm(form) {
    const result = { valid: true, form };

    const regexes = {
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      password: /^[a-zA-Z0-9!@#\$%&]+$/,
      name: /^[a-zA-Z ]+$/,
      number: /^[0-9]+$/,
      numberFourDigits: /^[0-9]{4}/,
      member: /^[0-9]+$/,
      exp: /^((0[1-9])|([1-9])|(1[0-2]))\/(20\d{2})$/,
      address: /^[a-zA-Z0-9\s\*\/\.\"\-\#]+$/
    };

    for (let key in form) {
      if (form.hasOwnProperty(key)) {
        const input = form[key];
        if (input && typeof input === 'object') {
          if (!input.type) {
            result.valid = this.validateForm(input).valid ? result.valid : false;
          } else {
            if (!regexes[input.type].test(input.value)) {
              input.error = true;
              result.valid = false;
            } else if (input.hasOwnProperty('equalsTo')) {
              if (input.value !== form[input.equalsTo].value) {
                result.valid = false;
                input.error = true;
              }
            }
          }
        }
      }
    }
    return result;
  }
};

export default Utils;
