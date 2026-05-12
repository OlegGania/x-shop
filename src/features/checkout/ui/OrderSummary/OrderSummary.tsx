import type { OrderTotals, OrderItem } from '@/features/checkout/model/checkout.types';
import Button from '@/shared/ui/Button/Button';
import { getDiscountPrice } from '@/shared/utils/getDiscountPrice';
import classes from './OrderSummary.module.scss';

type OrderSummaryProps = {
  orderItems: OrderItem[];
  totals: OrderTotals;
  canSubmit: boolean;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: () => Promise<string | null>;
};

const OrderSummary = ({
  orderItems,
  totals,
  canSubmit,
  isSubmitting,
  error,
  onSubmit,
}: OrderSummaryProps) => {
  const handleSubmit = () => {
    void onSubmit();
  };

  return (
    <div className={classes.summary}>
      <div className={classes.summaryBox}>
        <p className={classes.summaryTitle}>Order Summary</p>
        <p className={classes.summaryCount}>{orderItems.length} Items</p>
      </div>

      <div className={classes.summaryRow}>
        <p className={classes.summaryLabel}>Subtotal</p>
        <p className={classes.summaryValue}>${Math.round(totals.subtotal)}</p>
      </div>

      <div className={classes.summaryRow}>
        <p className={classes.summaryLabel}>Discount</p>
        <p className={`${classes.summaryValue} ${classes.summaryValueRed}`}>
          -${Math.round(totals.discount)}
        </p>
      </div>

      <div className={classes.summaryRow}>
        <p className={classes.summaryLabel}>Delivery Fee</p>
        <p className={classes.summaryValue}>${Math.round(totals.deliveryFee)}</p>
      </div>

      <div className={classes.products}>
        <ul className={classes.cartList}>
          {orderItems.map((orderItem, index) => (
            <li
              className={classes.cartItem}
              key={`${orderItem.id} ${orderItem.size ?? ''} ${orderItem.color ?? ''}`}>
              <div className={classes.cartItems}>
                <div className={classes.cartContent}>
                  <div className={classes.cartImgWrap}>
                    <img
                      className={classes.cartImage}
                      width={124}
                      height={124}
                      src={orderItem.image}
                      alt={orderItem.title}
                    />
                  </div>

                  <div className={classes.cartDetails}>
                    <p className={classes.cartTitle}>{orderItem.title}</p>

                    <p className={classes.cartSize}>
                      Size: <span className={classes.cartSizeValue}>{orderItem.size}</span>
                    </p>

                    <p className={classes.cartColor}>
                      Color:
                      <span
                        className={classes.cartColorDot}
                        style={{ backgroundColor: orderItem.color }}
                      />
                    </p>

                    <div className={classes.cartPrices}>
                      <p className={classes.cartPrice}>
                        $
                        {Math.round(
                          getDiscountPrice(orderItem.price, orderItem.discountPercentage ?? 0),
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={classes.cartQuantity}>x{orderItem.quantity}</div>
              </div>

              {index !== orderItems.length - 1 && <div className="line" />}
            </li>
          ))}
        </ul>
      </div>

      <div className="line" />

      <div className={classes.summaryRow}>
        <p className={classes.summaryLabel}>Total</p>
        <p className={classes.summaryValue}>${Math.round(totals.total)}</p>
      </div>

      {error && <div className={classes.error}>{error}</div>}

      <Button
        text={isSubmitting ? 'Processing...' : 'Place Order'}
        variant="dark"
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
      />
    </div>
  );
};

export default OrderSummary;
