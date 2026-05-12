import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '@/features/cart/context/useCart';
import { isSameCartProduct } from '@/features/cart/context/cart.helpers';
import { useProductDetails } from '@/features/products/hooks/useProductDetails';
import ProductDetail from '@/features/products/ui/ProductDetail/ProductDetail';
import { notify } from '@/services/notify';
import { colors } from '@/shared/constants/colors';
import { sizes } from '@/shared/constants/sizes';
import useMedia from '@/shared/hooks/useMediaQuery';
import Preloader from '@/shared/ui/Preloader/Preloader';
import classes from './ProductDetailPage.module.scss';

const ProductDetailPage = () => {
  const { isSmallDevice } = useMedia();
  const { cartProducts, addProductToCart } = useCart();
  const { id } = useParams<{ id: string }>();

  const productId = id && !Number.isNaN(Number(id)) ? Number(id) : undefined;

  const { product, isLoading, isError } = useProductDetails(productId);

  const [activeSize, setActiveSize] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [localQuantity, setLocalQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const isProductInCart = cartProducts.some((cartProduct) =>
    isSameCartProduct(cartProduct, product?.id ?? 0, activeSize, activeColor),
  );

  const increaseLocalQuantity = () => {
    setLocalQuantity((prev) => prev + 1);
  };

  const decreaseLocalQuantity = () => {
    setLocalQuantity((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (!activeSize || !activeColor) {
      notify.warning('First Select Product Options');
      return;
    }

    if (isProductInCart) {
      notify.info('Product Already In Cart');
      return;
    }

    addProductToCart({
      ...product,
      image: product.thumbnail,
      quantity: localQuantity,
      color: activeColor,
      size: activeSize,
    });
    notify.success('Product Added To Cart');
  };

  if (isError) return <p>Error loading</p>;
  if (!product) return <p>Product not found</p>;

  return isLoading ? (
    <Preloader width="350px" height="350px" />
  ) : (
    <section className={classes.section}>
      <div className="container">
        <ul
          className="navigateList"
          style={{
            flexDirection: isSmallDevice ? 'column' : undefined,
            alignItems: isSmallDevice ? 'center' : undefined,
          }}>
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
            <Link to="/productsCatalog" className="navigateLink">
              Product
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
            <span>{product?.title}</span>
          </li>
        </ul>

        <ProductDetail
          sizes={sizes}
          colors={colors}
          product={product}
          onImageChange={handleImageClick}
          selectedImage={selectedImage ?? product.images[0]}
          activeSize={activeSize}
          activeColor={activeColor}
          onSizeChange={setActiveSize}
          onColorChange={setActiveColor}
          quantity={localQuantity}
          onIncreaseQuantity={increaseLocalQuantity}
          onDecreaseQuantity={decreaseLocalQuantity}
          onAddToCart={handleAddToCart}
        />
      </div>
    </section>
  );
};

export default ProductDetailPage;
