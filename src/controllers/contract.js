import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { ContractSchema } from '../models/Contract';

const Contract = mongoose.model('contract', ContractSchema);

export const getContracts = (req, res) => {
  Contract.find()
    .sort({ date: -1 })
    .then(results => res.json(results))
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
    const { startDate, endDate } = req.body.validity;
    const newContract = new Contract({
      date: req.body.date,
      contractNumber: req.body.contractNumber,
      fullName: req.body.fullName,
      summ: req.body.summ,
      validity: {
        startDate,
        endDate,
      },
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
    const { startDate, endDate } = req.body.validity;
    Contract.findByIdAndUpdate(
      { _id: req.params.contractId },
      {
        date: req.body.date,
        contractNumber: req.body.contractNumber,
        fullName: req.body.fullName,
        summ: req.body.summ,
        validity: {
          startDate,
          endDate,
        },
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
