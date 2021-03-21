import { register, login } from '../../controllers/user';

const routes = app => {
  app.route('/auth/register').post(register);
  app.route('/login').post(login);
};

export default routes;
