import { notification } from 'antd';

const openNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
    placement: 'topLeft',
  });
};

export const successNotification = () => {
  openNotification('success', 'Success');
};

export const warningNotification = () => {
  openNotification('warning', 'Failed', 'Bad credentials');
};

export const errorNotification = array => {
  array.map(error => {
    return openNotification('error', 'Error', error.msg);
  });
};
