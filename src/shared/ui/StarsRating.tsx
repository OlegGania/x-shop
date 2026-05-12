import React from 'react';
type StarsRatingProps = {
  rating: number;
};

const StarRating = ({ rating }: StarsRatingProps) => {
  const getStarFill = (starIndex: number) => {
    if (rating >= starIndex + 1) {
      return '100%';
    } else if (rating > starIndex) {
      return `${(rating - starIndex) * 100}%`;
    }
    return '0%';
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {[0, 1, 2, 3, 4].map((starIndex) => (
        <div
          key={starIndex}
          style={{
            position: 'relative',
            width: '20px',
            height: '20px',
            marginRight: '3px',
          }}>
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="#ccc"
            strokeWidth="1.5"
            strokeLinejoin="round">
            <path
              d="M12 .587l3.668 7.429 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.868 1.401-8.168L.132 9.209l8.2-1.193z"
              fill="#e0e0e0"
            />
          </svg>

          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: getStarFill(starIndex),
              height: '100%',
              overflow: 'hidden',
            }}>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="#ffcb0e"
              strokeWidth="1.5"
              strokeLinejoin="round">
              <path
                d="M12 .587l3.668 7.429 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.868 1.401-8.168L.132 9.209l8.2-1.193z"
                fill="#ffcb0e"
              />
            </svg>
          </div>
        </div>
      ))}

      <span style={{ marginLeft: '6px', fontSize: '14px', color: '#4e4c4cff' }}>
        {rating.toFixed(1)}/5
      </span>
    </div>
  );
};

export default StarRating;
