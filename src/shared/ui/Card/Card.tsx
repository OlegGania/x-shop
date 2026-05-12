import classes from './Card.module.scss';
import { Link } from 'react-router-dom';
import StarsRating from '@/shared/ui/StarsRating';
import { getDiscountPrice } from '@/shared/utils/getDiscountPrice';

type CardProps = {
  id: number;
  image: string;
  title: string;
  rating: number;
  price: number;
  discount: number;
};

const Card = ({ id, image, title, rating, price, discount }: CardProps) => {
  return (
    <Link to={`/productsCatalog/${id}`}>
      <article className={classes.card}>
        <div className={classes.imgBox}>
          <img className={classes.cardImg} src={image} width={290} height={290} alt={title} />
        </div>

        <div className={classes.cardWrap}>
          <p className={classes.cardTitle}>{title}</p>

          <StarsRating rating={rating} />

          <div className={classes.cardPricesWrap}>
            <p className={classes.cardPrice}>
              ${Math.round(getDiscountPrice(price, discount ?? 0))}
            </p>

            <p className={classes.cardOldPrice}>${Math.round(price)}</p>

            <p className={classes.cardDiscount}>-{Math.round(discount ?? 0)}%</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Card;
