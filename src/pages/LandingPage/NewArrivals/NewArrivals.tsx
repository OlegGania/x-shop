import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';
import { fontSize, fontWeight, lineHeight } from '@/styles/fonts';
import Button from '@/shared/ui/Button/Button';
import Card from '@/shared/ui/Card/Card';
import Title from '@/shared/ui/Title/Title';
import classes from './NewArrivals.module.scss';

type NewArrivalsProps = {
  products: Product[];
};

const NewArrivals = ({ products }: NewArrivalsProps) => {
  return (
    <section className="section" id="newArrivals">
      <div className="container">
        <Title
          level={2}
          text="New Arrivals"
          size={fontSize.h2}
          weight={fontWeight.bold}
          lineHeight={lineHeight.h2}
          style={{
            fontFamily: 'Integral CF, sans-serif',
            marginBottom: '60px',
            textAlign: 'center',
          }}
        />

        <ul className={classes.newArrivalsList}>
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

        <div className={classes.newArrivalsLineBottom} />
      </div>
    </section>
  );
};

export default NewArrivals;
