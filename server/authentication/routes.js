const controller = require('./controllers');
const { authorizeRoute } = require('enmapi/services').Authentication;
module.exports = {
  '/auth': {
    get: {
      '/logout': [authorizeRoute, controller.authGetLogoutUser],
      '/test': [authorizeRoute, controller.test]
    },
    post: {
      '/login': controller.authPostLoginUser,
      '/update': [authorizeRoute, controller.authPostUpdateUser],
      '/register': controller.authPostRegisterUser
    }
  }
};
