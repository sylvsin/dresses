import React, { useContext } from 'react';
import './Admin.css';
import Orders from '../Oders/Oders';
import { DressContext } from '../../context/DressContext';
import { Fade } from 'react-awesome-reveal';

const Admin: React.FC = () => {
  const { orders } = useContext(DressContext);

  return (
    <Fade direction="up">
    <div>
      <h2>Orders</h2>
      <div className="admin">
                <div className="order-row orders-header"> 
          <span className="center">Order</span>
          <span className="center">DATE</span>
          <span className="center">TOTAL</span>
          <span className="center">NAME</span>
          <span className="center">EMAIL</span>
          <span className="center">ADDRESS</span>
          <span className="center">ITEMS</span>
          <span className="center">SIZE</span>
        </div>

        {
          orders.map((order, i) => {
            return (
              <Orders order={order} key={`${order._id}-${order.name}-${i}`} />
            )
          })
        }
      </div>
    </div>
    </Fade>
  );
}

export default Admin;
