const createDataObject = (data) => {
  const dataObject = data.attributes;
  dataObject.id = data.id;
  return dataObject;
};

const createObjectFromJsonApi = (data) => {
  let dataObject = {};

  if (data.length > 0) {
    dataObject = data.map(item => createDataObject(item));
  } else {
    dataObject = createDataObject(data);
  }

  return dataObject;
};

module.exports = createObjectFromJsonApi;
