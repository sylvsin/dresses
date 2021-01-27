import React from 'react';
import './Orders.css';
import { Order } from '../../context/DressContext';
import formatCurrency from '../../util';
import Moment from 'react-moment';

const Orders: React.FC<{order: Order}> = ({order}) => {
  return (
    <div className="orders-list">
        <div className="order-row">
            <span className="center">{order._id}</span>
            <span className="center"><Moment format="Do MMMM YYYY - HH:mm">{order.createdAt}</Moment></span>
            <span className="center">{formatCurrency(order.total)}</span>
            <span className="center">{order.name}</span>
            <span className="center">{order.email}</span>
            <span className="center">{order.address}</span>
            <span className="center">
                {order.cartItems.map(item => <span>
                    {item.count} {" x "} {item.title}
                </span>)}
            </span>
        </div>
    </div>
  );
}

export default Orders;
