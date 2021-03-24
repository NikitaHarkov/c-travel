import { Tooltip, Tag } from 'antd';

export const columns = [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    // render: text => <a>{text}</a>,
    width: 150,
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
    width: 140,
  },
  {
    title: 'Сумма €',
    dataIndex: 'summ',
    key: 'summ',
    render: summ => {
      return (
        <span>
          <Tag color={'geekblue'}>{summ} €</Tag>
        </span>
      );
    },
    width: 120,
  },
  {
    title: 'Срок действия',
    dataIndex: 'validity',
    key: 'validity',
    width: 140,
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
