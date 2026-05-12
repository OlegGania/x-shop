import { useNavigate } from 'react-router-dom';
import classes from './OrderSuccessPage.module.scss';

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.success}>
      <div className={classes.container}>
        <div className={classes.icon}>✓</div>
        <p className={classes.title}>Order Placed Successfully!</p>
        <p className={classes.text}>Thank you for your purchase. Your order has been confirmed.</p>
        <p className={classes.info}>
          You will receive an email confirmation shortly with your order details.
        </p>

        <div className={classes.actions}>
          <button className={classes.primary} onClick={() => navigate('/productsCatalog')}>
            Continue Shopping
          </button>
          <button className={classes.secondary} onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
