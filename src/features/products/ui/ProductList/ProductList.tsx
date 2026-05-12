import classes from './ProductList.module.scss';
import Card from '@/shared/ui/Card/Card';
import useMedia from '@/shared/hooks/useMediaQuery';
import { Product } from '@/types/product';

type ProductListProps = {
  products: Product[];
  totalPages: number;
  onPageChange: (page: number) => void;
};

const ProductList = ({ products, totalPages, onPageChange }: ProductListProps) => {
  const { isMediumDevice } = useMedia();

  return (
    <div className={classes.productsCatalogContent}>
      <ul
        className={classes.productList}
        style={{ justifyContent: isMediumDevice ? 'space-evenly' : 'space-between' }}>
        {products.map((product) => {
          return (
            <li className={classes.productItem} key={product.id}>
              <Card
                id={product.id}
                image={product.thumbnail}
                title={product.title}
                rating={product.rating}
                price={product.price}
                discount={product.discountPercentage ?? 0}
              />
            </li>
          );
        })}
      </ul>

      <div className="line"></div>
      <ul className={classes.productPageList}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <li className={classes.productPageItem} key={number}>
            <button onClick={() => onPageChange(number)} className={classes.buttonPagination}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
