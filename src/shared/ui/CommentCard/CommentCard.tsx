import StarRating from '@/shared/ui/StarsRating';
import classes from './CommentCard.module.scss';

type CommentCardProps = {
  rating: number;
  name: string;
  comment: string;
};

const CommentCard = ({ rating, name, comment }: CommentCardProps) => {
  return (
    <article className={classes.commentCard} aria-label={`Comment by ${name}`}>
      <div className={classes.commentCardWrap}>
        <div className={classes.commentCardRating} aria-label={`Rating: ${rating} out of 5`}>
          <StarRating rating={rating} />
        </div>
        <blockquote className={classes.commentCardComment}>
          <cite className={classes.commentCardName}>{name}</cite>
          {comment}
        </blockquote>
      </div>
    </article>
  );
};

export default CommentCard;
