import { Link } from 'react-router-dom';
import { fontSize, fontWeight, lineHeight } from '@/styles/fonts';
import Button from '@/shared/ui/Button/Button';
import Card from '@/shared/ui/Card/Card';
import Title from '@/shared/ui/Title/Title';
import classes from './TopSelling.module.scss';
import { Product } from '@/types/product';

type TopSellingProps = {
  products: Product[];
};

const TopSelling = ({ products }: TopSellingProps) => {
  return (
    <section className="section" id="topSelling">
      <div className="container">
        <Title
          level={2}
          text="top selling"
          size={fontSize.h2}
          weight={fontWeight.bold}
          lineHeight={lineHeight.h2}
          style={{
            fontFamily: 'Integral CF, sans-serif',
            marginBottom: '60px',
            textAlign: 'center',
          }}
        />

        <ul className={classes.topsellingsList}>
          {products.map((product) => (
            <li key={product.id}>
              <Card
                id={product.id}
                image={product.thumbnail}
                title={product.title}
                rating={product.rating}
                price={product.price}
                discount={product.discountPercentage ?? 0}
              />
            </li>
          ))}
        </ul>

        <div className={classes.buttonWrap}>
          <Link to="/productscatalog">
            <Button text="View All" variant="white" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSelling;
