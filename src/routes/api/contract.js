import { body } from 'express-validator';
import { getContracts, saveContract } from '../../controllers/contract';
import auth from '../../middleware/auth';

const contractRoute = app => {
  app
    .route('/contracts')
    .get(auth, getContracts)
    .post(
      [
        auth,
        [
          body('date', 'Date is required').notEmpty(),
          body('contractNumber', 'Contract Number is required').notEmpty(),
          body('fullName', 'Name is required').notEmpty(),
          body('summ', 'Summ is required').notEmpty().isNumeric(),
          body('validity', 'Dates are required').notEmpty(),
          body('phone', 'Phone is required').notEmpty(),
          body('email', 'Email is required').notEmpty().isEmail(),
        ],
      ],
      saveContract
    );
};

export default contractRoute;
