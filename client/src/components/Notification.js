import { notification } from 'antd';

const openNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
    placement: 'topLeft',
  });
};

export const successNotification = () => {
  openNotification('success', 'Успешно');
};

export const warningNotification = () => {
  openNotification('warning', 'Ошибка', 'Учетная запись не существует');
};

export const errorNotification = array => {
  array.map(error => {
    return openNotification('error', 'Ошибка', error.msg);
  });
};
