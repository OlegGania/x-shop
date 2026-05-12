import classes from './ProductDetail.module.scss';
import Quantity from '@/shared/ui/Quantity/Quantity';
import StarRating from '@/shared/ui/StarsRating';
import Button from '@/shared/ui/Button/Button';
import { getDiscountPrice } from '@/shared/utils/getDiscountPrice';
import { Product } from '@/types/product';
import useMedia from '@/shared/hooks/useMediaQuery';

type ProductDetailProps = {
  sizes: string[];
  colors: string[];
  product: Product;
  selectedImage: string;
  onImageChange: (imageUrl: string) => void;
  activeSize: string | null;
  activeColor: string | null;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  onAddToCart: () => void;
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
};

const ProductDetail = ({
  sizes,
  colors,
  product,
  onImageChange,
  selectedImage,
  activeSize,
  activeColor,
  onColorChange,
  onSizeChange,
  onAddToCart,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: ProductDetailProps) => {
  const { isSmallDevice, isMediumDevice } = useMedia();
  return (
    <div
      className={classes.productDetail}
      style={{ flexDirection: isMediumDevice ? 'column' : undefined }}>
      <div className={classes.productDetailImgWrap}>
        <div className={classes.productDetailImgBox}>
          <img
            className={classes.productDetailImg}
            src={selectedImage}
            width={680}
            height={410}
            alt={product.title}
          />
        </div>

        <ul className={classes.productDetailImgList}>
          {product.images.slice(0, 3).map((imageUrl) => (
            <li className={classes.productDetailItem} key={imageUrl}>
              <button
                type="button"
                className={`${classes.productDetailImageButton} ${
                  selectedImage === imageUrl ? classes.productDetailImageButtonActive : ''
                }`}
                onClick={() => onImageChange(imageUrl)}>
                <img
                  className={classes.productDetailImgMini}
                  src={imageUrl}
                  width={152}
                  height={152}
                  alt={product.title}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.productDetailInfo}>
        <div className={classes.productDetailContent}>
          <p className={classes.productDetailName}>{product.title}</p>

          <div className={classes.productDetailRating}>
            <StarRating rating={product.rating} />
          </div>

          <div className={classes.productDetailPrices}>
            <p className={classes.productDetailPrice}>
              ${Math.round(getDiscountPrice(product.price, product.discountPercentage ?? 0))}
            </p>
            <p className={classes.productDetailOldPrice}>${Math.round(product.price)}</p>
            <p className={classes.productDetailDiscount}>
              -{Math.round(product.discountPercentage ?? 0)}%
            </p>
          </div>

          <p className={classes.productDetailDescription}>{product.description}</p>
        </div>

        <div className="line"></div>

        <div className={classes.productDetailColors}>
          <span className={classes.productDetailTitle}>Select Colors</span>
          <ul className={classes.productDetailSelectList}>
            {colors.map((color) => (
              <li key={color} className={classes.productDetailSelectItem}>
                <button
                  className={classes.productDetailSelectButton}
                  style={{ backgroundColor: color }}
                  onClick={() => onColorChange(color)}>
                  {activeColor === color && (
                    <svg
                      className={classes.iconColor}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="line"></div>

        <div className={classes.productDetailSize}>
          <span className={classes.productDetailTitle}>Choose Size</span>

          <ul className={classes.productDetailSizeList}>
            {sizes.map((size) => (
              <li key={size} className={classes.productDetailSizeItem}>
                <button
                  className={`${classes.productDetailSizeButton} ${
                    activeSize === size ? classes.productDetailSizeButtonActive : ''
                  }`}
                  onClick={() => onSizeChange(size)}>
                  {size}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="line"></div>

        <div
          className={classes.productDetailButtonWrap}
          style={{ flexDirection: isSmallDevice ? 'column' : undefined }}>
          <Quantity
            increaseQuantity={onIncreaseQuantity}
            decreaseQuantity={onDecreaseQuantity}
            quantity={quantity}
          />

          <Button
            onClick={onAddToCart}
            text="Add to Cart"
            variant="dark"
            style={{
              cursor: !activeSize || !activeColor ? 'not-allowed' : 'pointer',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
