import React, { useState } from 'react';
import { Drawer, Form, Button, Col, Row, Input, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useContractContext } from '../../context/contractContext';

const DrawerForm = ({ isVisible, showDrawer, closeDrawer }) => {
  const { singleContract, createContract } = useContractContext();

  const [formData, setFormData] = useState({
    date: '',
    contractNumber: '',
    fullName: '',
    summ: 0,
    validity: '',
    phone: '',
    email: '',
    comment: '',
  });

  const {
    date,
    contractNumber,
    fullName,
    summ,
    validity,
    phone,
    email,
    comment,
  } = formData;

  const clearState = () => {
    closeDrawer();
  };

  const changeHandler = (e, dateInput = '') => {
    if (e.target) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [dateInput]: e._d });
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    createContract(formData);
    closeDrawer();
  };

  return (
    <>
      <Button type='primary' onClick={showDrawer}>
        <PlusOutlined /> {singleContract ? 'Изменить' : 'Добавить'} новый
        контракт
      </Button>
      <Drawer
        title='Добавить новый контракт'
        width={720}
        onClose={clearState}
        visible={isVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={clearState} style={{ marginRight: 8 }}>
              Отменить
            </Button>
            <Button onClick={submitHandler} type='primary'>
              Сохранить
            </Button>
          </div>
        }
      >
        <Form layout='vertical' hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name='fullName' label='Имя'>
                <Input
                  value={fullName}
                  name='fullName'
                  onChange={changeHandler}
                  placeholder='Введите имя'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='date' label='Дата заключения'>
                <DatePicker
                  locale='locale'
                  style={{ width: '100%' }}
                  name='date'
                  value={date}
                  onChange={e => changeHandler(e, 'date')}
                  placeholder='Выберите дату'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name='contractNumber' label='Номер договора'>
                <Input
                  name='contractNumber'
                  value={contractNumber}
                  onChange={changeHandler}
                  placeholder='Введите номер договора'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='summ' label='Сумма'>
                <Input
                  style={{ width: '100%', margin: 0 }}
                  type='number'
                  addonAfter='€'
                  name='summ'
                  value={summ}
                  onChange={changeHandler}
                  placeholder='Введите сумму'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name='phone' label='Телефон'>
                <Input
                  style={{ width: '100%', margin: 0 }}
                  addonBefore='+372'
                  name='phone'
                  value={phone}
                  onChange={changeHandler}
                  placeholder='Введите телефон'
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='validity' label='Дата окончания'>
                <DatePicker
                  style={{ width: '100%' }}
                  name='validity'
                  value={validity}
                  onChange={e => changeHandler(e, 'validity')}
                  placeholder='Выберите дату'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name='email' label='Email'>
                <Input
                  style={{ width: '100%', margin: 0 }}
                  addonBefore='@'
                  type='email'
                  name='email'
                  value={email}
                  onChange={changeHandler}
                  placeholder='example@example.ee'
                  required
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name='comment' label='Комментарий'>
                <Input.TextArea
                  rows={4}
                  name='comment'
                  value={comment}
                  onChange={changeHandler}
                  placeholder='Введите комментарий'
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default DrawerForm;
