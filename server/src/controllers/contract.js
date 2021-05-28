import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { ContractSchema } from '../models/Contract';
import excel from 'exceljs';

const Contract = mongoose.model('contract', ContractSchema);

export const getContracts = (req, res) => {
  let query = {};
  if (req.query.data) {
    query = {
      $or: [
        { contractNumber: { $regex: req.query.data, $options: 'i' } },
        { fullName: { $regex: req.query.data, $options: 'i' } },
      ],
    };
  }
  Contract.find(query)
    .sort({ date: -1 })
    .then(results => {
      const amount = results.length;
      const data = results;
      res.json({ amount, data });
    })
    .catch(err => {
      console.error(err.message);
      return res.status(500).json({ message: 'Server Error' });
    });
};

export const saveContract = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const newContract = new Contract({
      date: req.body.date,
      contractNumber: req.body.contractNumber,
      fullName: req.body.fullName,
      summ: req.body.summ,
      validity: req.body.validity,
      phone: req.body.phone,
      email: req.body.email,
      comment: req.body.comment,
    });

    newContract
      .save()
      .then(contract => res.json(contract))
      .catch(err => {
        console.error(err.message);
        return res.status(500).json({ message: 'Server Error' });
      });
  }
};

export const getContractById = (req, res) => {
  Contract.findById(req.params.contractId, (err, contract) => {
    if (contract) {
      return res.json(contract);
    } else if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Contract not found' });
    } else {
      console.error(err.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  });
};

export const changeContract = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    Contract.findByIdAndUpdate(
      { _id: req.params.contractId },
      {
        date: req.body.date,
        contractNumber: req.body.contractNumber,
        fullName: req.body.fullName,
        summ: req.body.summ,
        validity: req.body.validity,
        phone: req.body.phone,
        email: req.body.email,
        comment: req.body.comment,
      },
      (err, result) => {
        if (result) return res.status(200).json(result);
        else if (err.kind === 'ObjectId')
          return res.status(404).json({ message: 'Contract not found' });
        else {
          console.error(err.message);
          return res.status(500).json({ message: 'Server Error' });
        }
      }
    );
  }
};

export const deleteContract = (req, res) => {
  Contract.findByIdAndDelete({ _id: req.params.contractId }, (err, result) => {
    if (result) return res.status(200).json({ message: 'Deleted' });
    if (err.kind === 'ObjectId')
      return res.status(404).json({ message: 'Contract not found' });
    else {
      console.error(err.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  });
};

export const downloadEmails = (req, res) => {
  let emails = [];
  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet('Emails');
  worksheet.columns = [
    {
      header: 'Email',
      key: 'email',
      width: 50,
    },
  ];
  worksheet.getRow(1).font = { bold: true };

  Contract.find().then(results => {
    worksheet.addRows(results);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'clubs-travel-emails.xlsx'
    );

    return workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  });
};
