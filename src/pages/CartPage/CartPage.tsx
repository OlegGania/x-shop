import { Link } from 'react-router-dom';
import { useCart } from '@/features/cart/context/useCart';
import { fontSize, fontWeight, lineHeight } from '@/styles/fonts';
import { getDiscountPrice } from '@/shared/utils/getDiscountPrice';
import useMedia from '@/shared/hooks/useMediaQuery';
import Button from '@/shared/ui/Button/Button';
import Quantity from '@/shared/ui/Quantity/Quantity';
import Title from '@/shared/ui/Title/Title';
import classes from './CartPage.module.scss';

const CartPage = () => {
  const { isExtraSmallDevice, isSmallDevice, isLargeDevice } = useMedia();
  const { cartProducts, deleteProductFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <section className={classes.section}>
      <div className="container">
        <ul className="navigateList">
          <li className="navigateItem">
            <Link to="/" className="navigateLink">
              Home
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path
                  d="M1.53073 0.469402L6.53073 5.4694C6.60065 5.53908 6.65613 5.62187 6.69399 5.71304C6.73184 5.8042 6.75133 5.90194 6.75133 6.00065C6.75133 6.09936 6.73184 6.1971 6.69399 6.28827C6.65613 6.37943 6.60065 6.46222 6.53073 6.5319L1.53073 11.5319C1.38984 11.6728 1.19874 11.752 0.999484 11.752C0.800227 11.752 0.609131 11.6728 0.468235 11.5319C0.327338 11.391 0.248184 11.1999 0.248184 11.0007C0.248184 10.8014 0.327338 10.6103 0.468235 10.4694L4.93761 6.00003L0.46761 1.53065C0.326714 1.38976 0.247559 1.19866 0.247559 0.999403C0.247559 0.800145 0.326714 0.609049 0.46761 0.468153C0.608506 0.327257 0.799603 0.2481 0.99886 0.2481C1.19812 0.2481 1.38921 0.327257 1.53011 0.468153L1.53073 0.469402Z"
                  fill="black"
                  fillOpacity="0.6"
                />
              </svg>
            </Link>
          </li>
          <li className="navigateItem">
            <span>Cart</span>
          </li>
        </ul>

        <Title
          level={2}
          text="Your cart"
          size={fontSize.h2}
          weight={fontWeight.bold}
          lineHeight={lineHeight.h2}
          style={{ fontFamily: 'Integral CF, sans-serif', marginBottom: '24px' }}
        />

        {cartProducts.length === 0 ? (
          <div className={classes.cartInfo}>
            <div
              className={classes.cartInfoWrap}
              style={{
                paddingTop: isSmallDevice ? '50px' : '100px',
                paddingBottom: isSmallDevice ? '50px' : '100px',
                paddingRight: '15px',
                paddingLeft: '15px',
              }}>
              <p
                className={classes.cartInfoText}
                style={{ fontSize: isSmallDevice ? '44px' : '60px' }}>
                Your Cart Is Empty!
              </p>
              <Link to="/productscatalog">
                <Button text="Shopping Now" variant="dark" />
              </Link>
            </div>
          </div>
        ) : (
          <div
            className={classes.cart}
            style={{ flexDirection: isLargeDevice ? 'column' : undefined }}>
            <div className={classes.cartWrap}>
              <div className={classes.cartBox}>
                <ul className={classes.cartList}>
                  {cartProducts.map((product, index) => (
                    <li
                      className={classes.cartItem}
                      key={`${product.id} ${product.size ?? ''} ${product.color ?? ''}`}>
                      <div
                        className={classes.cartItems}
                        style={{
                          flexDirection: isExtraSmallDevice ? 'column' : undefined,
                        }}>
                        <div className={classes.cartContent}>
                          <div className={classes.cartImgWrap}>
                            <img
                              className={classes.cartImage}
                              width={124}
                              height={124}
                              src={product.image}
                              alt={product.title}
                            />
                          </div>

                          <div className={classes.cartDetails}>
                            <p className={classes.cartTitle}>{product.title}</p>
                            <p className={classes.cartAttribute}>
                              Size: <span className={classes.cartValue}>{product.size}</span>
                            </p>
                            <p className={classes.cartColor}>
                              Color:
                              <span
                                className={classes.cartColorValue}
                                style={{ backgroundColor: product.color }}
                              />
                            </p>
                            <div className={classes.cartPrices}>
                              <p
                                className={classes.cartPrice}
                                style={{ fontSize: isSmallDevice ? '25px' : '30px' }}>
                                $
                                {Math.round(
                                  getDiscountPrice(product.price, product.discountPercentage ?? 0),
                                )}
                              </p>
                              <p
                                className={classes.cartOldPrice}
                                style={{ fontSize: isSmallDevice ? '25px' : '32px' }}>
                                ${Math.round(product.price)}
                              </p>
                              <p className={classes.cartDiscount}>
                                -{Math.round(product.discountPercentage ?? 0)}%
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          className={classes.cartActions}
                          style={{
                            flexDirection: isExtraSmallDevice ? 'row-reverse' : 'column',
                            alignItems: isExtraSmallDevice ? 'center' : 'flex-end',
                          }}>
                          <button
                            className={classes.cartRemove}
                            onClick={() =>
                              deleteProductFromCart(product.id, product.size, product.color)
                            }>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none">
                              <path
                                fill="#F33"
                                d="M20.25 4.5H16.5v-.75a2.25 2.25 0 0 0-2.25-2.25h-4.5A2.25 2.25 0 0 0 7.5 3.75v.75H3.75a.75.75 0 0 0 0 1.5h.75v13.5A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5V6h.75a.75.75 0 1 0 0-1.5M10.5 15.75a.75.75 0 1 1-1.5 0v-6a.75.75 0 0 1 1.5 0zm4.5 0a.75.75 0 1 1-1.5 0v-6a.75.75 0 1 1 1.5 0zM15 4.5H9v-.75A.75.75 0 0 1 9.75 3h4.5a.75.75 0 0 1 .75.75z"
                              />
                            </svg>
                          </button>

                          <div className={classes.cartQuantity}>
                            <Quantity
                              increaseQuantity={() =>
                                increaseQuantity(product.id, product.size, product.color)
                              }
                              decreaseQuantity={() =>
                                decreaseQuantity(product.id, product.size, product.color)
                              }
                              quantity={product.quantity}
                            />
                          </div>
                        </div>
                      </div>

                      {index !== cartProducts.length - 1 && <div className="line" />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link to="/checkout">
              <Button text="Checkout" variant="dark" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
