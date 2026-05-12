import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useReviews } from '@/features/products/hooks/useReviews';
import { fontSize, fontWeight, lineHeight } from '@/styles/fonts';
import CommentCard from '@/shared/ui/CommentCard/CommentCard';
import Title from '@/shared/ui/Title/Title';
import classes from './Reviews.module.scss';

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 992,
      settings: { slidesToShow: 2, slidesToScroll: 1 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

const Reviews = () => {
  const { reviews, isLoading, isError } = useReviews();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading reviews!</p>;

  return (
    <section className={classes.section}>
      <div className="container">
        <Title
          level={2}
          text="OUR HAPPY CUSTOMERS"
          size={fontSize.h2}
          weight={fontWeight.bold}
          lineHeight={lineHeight.h2}
          style={{
            fontFamily: 'Integral CF, sans-serif',
            marginBottom: '40px',
          }}
        />
        <div className={classes.sliderContainer}>
          <Slider {...sliderSettings} className={classes.slickSlider}>
            {reviews.map((review) => (
              <div key={review.id} className={classes.slideItem}>
                <CommentCard
                  rating={review.rating}
                  name={review.reviewer_name}
                  comment={review.comment}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
