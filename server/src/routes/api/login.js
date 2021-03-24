import { register, login, getAuthUser } from '../../controllers/user';
import auth from '../../middleware/auth';

const routes = app => {
  app.route('/auth').get(auth, getAuthUser);
  //app.route('/auth/register').post(register);
  app.route('/login').post(login);
};

export default routes;
