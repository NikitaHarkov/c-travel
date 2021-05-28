import { body } from 'express-validator';
import {
  getContractById,
  getContracts,
  saveContract,
  changeContract,
  deleteContract,
  downloadEmails,
} from '../../controllers/contract';
import auth from '../../middleware/auth';

const contractRoute = app => {
  app
    .route('/contracts')
    .get(auth, getContracts)
    .post(
      [
        auth,
        [
          body('date', 'Дата заключения обязательна').notEmpty(),
          body('contractNumber', 'Номер договора обязателен').notEmpty(),
          body('fullName', 'Имя обязательно').notEmpty(),
          body('summ', 'Сумма обязательна').notEmpty().isNumeric(),
          body('validity', 'Дата оканчания обязательна').notEmpty(),
          body('phone', 'Телефон обязателен').notEmpty(),
          body('email', 'Эмайл обязателен').notEmpty().isEmail(),
        ],
      ],
      saveContract
    );

  app
    .route('/contracts/:contractId')
    .get(auth, getContractById)
    .delete(auth, deleteContract)
    .put(
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
      changeContract
    );

  app.route('/emails-excel').get(auth, downloadEmails);
};

export default contractRoute;
