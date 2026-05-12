import type { PaymentDetails, PaymentMethod } from '@/features/checkout/model/checkout.types';
import classes from './PaymentForm.module.scss';

type PaymentFormProps = {
  value: PaymentDetails;
  onChange: (value: PaymentDetails) => void;
};

const PaymentForm = ({ value, onChange }: PaymentFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      method: e.target.value as PaymentMethod,
    });
  };

  return (
    <form className={classes.paymentForm}>
      <div className={classes.paymentWrap}>
        <p className={classes.paymentTitle}>Payment Method</p>
        <div className={classes.paymentLine}></div>

        <ul className={classes.paymentList}>
          <li className={classes.paymentItem}>
            <input
              className={classes.paymentInput}
              value="card"
              name="payment"
              type="radio"
              id="card"
              checked={value.method === 'card'}
              onChange={handleChange}
            />
            <label className={classes.paymentLabel} htmlFor="card">
              Credit/Debit Card
              <span className={classes.paymentIcon}>💳</span>
            </label>
          </li>

          <li className={classes.paymentItem}>
            <input
              value="cash_on_delivery"
              className={classes.paymentInput}
              name="payment"
              type="radio"
              id="cash"
              checked={value.method === 'cash_on_delivery'}
              onChange={handleChange}
            />
            <label className={classes.paymentLabel} htmlFor="cash">
              Cash on Delivery
              <span className={classes.paymentIcon}>💵</span>
            </label>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default PaymentForm;
