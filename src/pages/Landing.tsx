import Hero from './LandingPage/Hero/Hero';
import NewArrivals from './LandingPage/NewArrivals/NewArrivals';
import TopSelling from './LandingPage/TopSelling/TopSelling';
import StyleBrowse from './LandingPage/StyleBrowse/StyleBrowse';
import Reviews from './LandingPage/Reviews/Reviews';
import Brand from './LandingPage/Brand/Brand';
import { useProducts } from '@/features/products/hooks/useProducts';
import { sortProductsByHighRating } from '@/shared/utils/sortProductsByHighRating';
import { sortProductsByLowestPrice } from '@/shared/utils/sortProductsByLowestPrice';
import ProductCardSkeleton from '@/shared/ui/ProductCardSkeleton/ProductCardSkeleton';

const Landing = () => {
  const { products, isLoading, isError } = useProducts();

  const bestRatingProducts = sortProductsByHighRating(products, 4);
  const bestPriceProducts = sortProductsByLowestPrice(products, 4);

  return (
    <>
      <Hero />
      <Brand />

      {isError && <p>Error loading products!</p>}

      {isLoading ? (
        <>
          <ProductCardSkeleton itemsCount={4} />
          <ProductCardSkeleton itemsCount={4} />
        </>
      ) : (
        <>
          <NewArrivals products={bestRatingProducts} />
          <TopSelling products={bestPriceProducts} />
        </>
      )}

      <StyleBrowse />
      <Reviews />
    </>
  );
};

export default Landing;
