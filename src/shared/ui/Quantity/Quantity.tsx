import classes from './Quantity.module.scss';

interface QuantityProps {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

const Quantity = ({ increaseQuantity, decreaseQuantity, quantity }: QuantityProps) => {
  return (
    <div className={classes.quantity}>
      <button
        className={classes.quantityButton}
        onClick={decreaseQuantity}
        aria-label="Decrease quantity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <g clipPath="url(#clip0_1826_1890)">
            <path d="M19 13H5V11H19V13Z" fill="black" />
          </g>
          <defs>
            <clipPath id="clip0_1826_1890">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <div className={classes.quantityNumber}>{quantity}</div>

      <button
        className={classes.quantityButton}
        onClick={increaseQuantity}
        aria-label="Increase quantity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <g clipPath="url(#clip0_1826_1896)">
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="black" />
          </g>
          <defs>
            <clipPath id="clip0_1826_1896">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default Quantity;
