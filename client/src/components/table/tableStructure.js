import { Tooltip, Tag } from 'antd';
import { formatDate, formatPrice } from '../../utils/helpers';

export const columns = [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    render: date => formatDate(date),
    width: 120,
  },
  {
    title: 'Номер Договора',
    dataIndex: 'contractNumber',
    key: 'contractNumber',
    width: 120,
  },
  {
    title: 'Имя/Фамилия',
    dataIndex: 'fullName',
    key: 'fullName',
    width: 160,
  },
  {
    title: 'Сумма €',
    dataIndex: 'summ',
    key: 'summ',
    render: summ => {
      return (
        <span>
          <Tag color={'geekblue'}>{formatPrice(summ)}</Tag>
        </span>
      );
    },
    width: 120,
  },
  {
    title: 'Срок действия',
    dataIndex: 'validity',
    key: 'validity',
    render: validity => formatDate(validity),
    width: 150,
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
  },
  {
    title: 'Эл. почта',
    dataIndex: 'email',
    key: 'email',
    width: 250,
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    width: 250,
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    key: 'comment',
    ellipsis: {
      showTitle: false,
    },
    render: address => (
      <Tooltip placement='topLeft' title={address}>
        {address}
      </Tooltip>
    ),
  },
];
