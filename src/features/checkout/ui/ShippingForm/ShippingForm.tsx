import type { ShippingDetails } from '@/features/checkout/model/checkout.types';
import classes from './ShippingForm.module.scss';

type ShippingFormProps = {
  value: ShippingDetails;
  onChange: (value: ShippingDetails) => void;
};

const ShippingForm = ({ value, onChange }: ShippingFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    onChange({
      ...value,
      [name]: inputValue,
    });
  };

  return (
    <form className={classes.shippingForm}>
      <div className={classes.shippingWrap}>
        <p className={classes.shippingTitle}>Shipping Address</p>
        <div className={classes.shippingLine}></div>

        <ul className={classes.shippingList}>
          <li className={classes.shippingItem}>
            <label htmlFor="address" className="sr_only">
              Delivery Address
            </label>
            <input
              id="address"
              className={classes.shippingInput}
              type="text"
              name="address"
              placeholder="Enter your address"
              value={value.address}
              onChange={handleChange}
              required
            />
          </li>

          <li className={classes.shippingItem}>
            <label htmlFor="city" className="sr_only">
              City
            </label>
            <input
              id="city"
              className={classes.shippingInput}
              type="text"
              name="city"
              placeholder="Enter your city"
              value={value.city}
              onChange={handleChange}
              required
            />
          </li>
        </ul>
      </div>
    </form>
  );
};

export default ShippingForm;
