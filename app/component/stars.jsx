import React, { useEffect, useState } from 'react';

function StarRating({ difficulty }) {
    
    // const [star,setStar]=useState(1)

    // setStar(difficulty==='hard'?5:difficulty==='medium'?3:difficulty==='easy'?1:0)


    const [hoveredStar, setHoveredStar] = useState(0);

  const handleMouseEnter = (star) => {
    setHoveredStar(star);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  const handleClick = (star) => {
    // Your logic for handling the click event
  };

  const renderStars = () => {
    let stars = [];
    const totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
      if (i <= difficulty) {
        stars.push(
          <span
            key={i}
            className="cursor-pointer text-yellow-500 hover:text-yellow-600"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(i)}
          >
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span
            key={i}
            className={`cursor-pointer ${i <= hoveredStar ? 'text-yellow-400' : 'text-white'}`}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(i)}
          >
            &#9734;
          </span>
        );
      }
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
}

export default StarRating;
