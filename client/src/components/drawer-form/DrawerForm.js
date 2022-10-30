import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useContractContext } from '../../context/contractContext';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import FileDownload from 'js-file-download';

const DrawerForm = ({
  isVisible,
  showDrawer,
  closeDrawer,
  formData,
  setFormData,
}) => {
  const { singleContract, createContract, updateContract, deleteContract } =
    useContractContext();

  const {
    id,
    date,
    contractNumber,
    fullName,
    summ,
    validity,
    phone,
    email,
    status,
    comment,
  } = formData;

  const clearForm = () => {
    let setAll = (obj, val) => Object.keys(obj).forEach(k => (obj[k] = val));
    let setEmpty = obj => setAll(obj, '');
    setEmpty(formData);
    closeDrawer();
  };

  const changeHandler = (e, dateInput = '') => {
    if (dateInput !== '') {
      setFormData({ ...formData, [dateInput]: e });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const deleteHandler = () => {
    deleteContract(id);
    closeDrawer();
  };

  const downloadEmails = () => {
    axios({
      url: '/emails-excel',
      method: 'GET',
      responseType: 'blob', // Important
    }).then(response => {
      FileDownload(response.data, 'clubs-travel-emails.xlsx');
    });
  };

  const submitHandler = e => {
    if (id !== '') {
      updateContract(formData);
    } else {
      createContract(formData);
    }
  };

  return (
    <>
      <Button type='primary' onClick={showDrawer}>
        <PlusOutlined /> Добавить новый контракт
      </Button>
      <Button
        type='primary'
        onClick={() => downloadEmails()}
        style={{
          background: 'green',
          borderColor: 'yellowgreen',
          float: 'left',
        }}
      >
        Excel
      </Button>
      <Drawer
        title={`${singleContract ? 'Изменить' : 'Добавить новый'} контракт`}
        width={720}
        onClose={clearForm}
        visible={isVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout='vertical' onFinish={submitHandler}>
          <Row gutter={16}>
            <Col span={12}>
              <div className='col-md-12'>
                <label name='fullName' className='form-label'>
                  Имя
                </label>
                <input
                  className='form-control'
                  name='fullName'
                  value={fullName}
                  onChange={changeHandler}
                  placeholder='Введите имя'
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='col-md-12'>
                <label name='date' className='form-label'>
                  Дата заключения
                </label>
                <br />
                <DatePicker
                  className='form-control'
                  selected={date}
                  dateFormat='dd.MM.yyyy'
                  onChange={e => changeHandler(e, 'date')}
                  placeholderText='День/Месяц/Год'
                />
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div className='col-md-12'>
                <label name='contractNumber' className='form-label'>
                  Номер договора
                </label>
                <input
                  className='form-control'
                  name='contractNumber'
                  value={contractNumber}
                  onChange={changeHandler}
                  placeholder='Введите номер договора'
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='col-md-12'>
                <label name='summ' className='form-label'>
                  Сумма
                </label>
                <input
                  className='form-control'
                  type='number'
                  name='summ'
                  value={summ}
                  onChange={changeHandler}
                  placeholder='Введите сумму'
                />
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <div className='col-md-12'>
                <label name='phone' className='form-label'>
                  Телефон
                </label>
                <input
                  className='form-control'
                  name='phone'
                  value={phone}
                  onChange={changeHandler}
                  placeholder='Введите телефон'
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='col-md-12'>
                <label name='date' className='form-label'>
                  Дата окончания
                </label>
                <br />
                <DatePicker
                  className='form-control'
                  selected={validity}
                  dateFormat='dd.MM.yyyy'
                  onChange={e => changeHandler(e, 'validity')}
                  placeholderText='День/Месяц/Год'
                />
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <div className='col-md-12'>
                <label name='email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  value={email}
                  onChange={changeHandler}
                  placeholder='example@example.ee'
                />
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <div className='col-md-12'>
                <label name='status' className='form-label'>
                  Статус
                </label>
                <input
                  type='status'
                  className='form-control'
                  name='status'
                  value={status}
                  onChange={changeHandler}
                />
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <div className='col-md-12'>
                <label name='comment' className='form-label'>
                  Комментарий
                </label>
                <Input.TextArea
                  rows={4}
                  name='comment'
                  value={comment}
                  onChange={changeHandler}
                  placeholder='Введите комментарий'
                />
              </div>
            </Col>
          </Row>

          <Button onClick={clearForm} style={{ marginRight: 8 }}>
            Отменить
          </Button>
          <Button type='primary' htmlType='submit'>
            Сохранить
          </Button>
          {id && (
            <Wrapper className='delete-button'>
              <Popconfirm title='Удалить?' onConfirm={() => deleteHandler()}>
                <Button type='primary' danger>
                  Удалить
                </Button>
              </Popconfirm>
            </Wrapper>
          )}
        </Form>
      </Drawer>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
`;

export default DrawerForm;
