import classes from './ProductCardSkeleton.module.scss';

interface ProductCardSkeletonProps {
  itemsCount?: number;
}

const ProductCardSkeleton = ({ itemsCount = 4 }: ProductCardSkeletonProps) => {
  return (
    <section className="section" aria-busy="true">
      <div className="container">
        <div className={classes.titleSkeleton} />

        <ul className={classes.list}>
          {Array.from({ length: itemsCount }).map((_, index) => (
            <li key={index}>
              <article className={classes.card} aria-label="Loading product">
                <div className={classes.imgBox} />
                <div className={classes.cardWrap}>
                  <div className={classes.title} />
                  <div className={classes.stars} />
                  <div className={classes.pricesRow}>
                    <div className={classes.price} />
                    <div className={classes.oldPrice} />
                    <div className={classes.discount} />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className={classes.buttonWrap}>
          <div className={classes.buttonSkeleton} />
        </div>

        <div className={classes.lineBottom} />
      </div>
    </section>
  );
};

export default ProductCardSkeleton;
