'use strict';

module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(
      {
        message: 'Joonggonara!!!'
      },
      null,
      2
    ),
  };
};
