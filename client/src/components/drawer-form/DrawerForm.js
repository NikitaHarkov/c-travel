import React from 'react';
import { Drawer, Form, Button, Col, Row, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useContractContext } from '../../context/contractContext';

const DrawerForm = ({
  isVisible,
  showDrawer,
  closeDrawer,
  formData,
  setFormData,
}) => {
  const {
    singleContract,
    createContract,
    updateContract,
    errors,
  } = useContractContext();

  const {
    id,
    date,
    contractNumber,
    fullName,
    summ,
    validity,
    phone,
    email,
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
      setFormData({ ...formData, [dateInput]: e.target.valueAsDate });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = e => {
    if (id !== '') {
      updateContract(formData);
    } else {
      createContract(formData);
    }
    if (errors === []) {
      closeDrawer();
    }
  };

  return (
    <>
      <Button type='primary' onClick={showDrawer}>
        <PlusOutlined /> Добавить новый контракт
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
                <input
                  className='form-control'
                  type='date'
                  name='date'
                  value={date}
                  onChange={e => changeHandler(e, 'date')}
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
                <input
                  type='date'
                  className='form-control'
                  name='validity'
                  value={validity}
                  onChange={e => changeHandler(e, 'validity')}
                  placeholder='Выберите дату'
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
        </Form>
      </Drawer>
    </>
  );
};

export default DrawerForm;
