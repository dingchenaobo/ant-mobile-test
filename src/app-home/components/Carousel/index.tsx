import React, { PureComponent, ReactNode } from 'react';
import { Carousel } from 'antd-mobile';

interface IMyCarouselProps {
  data: {
    image: string,
    link: string,
    id: number,
  }[];
}

interface IMyCarouselStates {}

class MyCarousel extends PureComponent<IMyCarouselProps, IMyCarouselStates> {
  render():ReactNode {
    const { data } = this.props;
    return (
      <Carousel
        infinite={true}
        autoplay={true}
      >
        {data.map(({ image, link, id }) => (
          <a href={link} key={id}>
            <img src={image} />
          </a>
        ))}
      </Carousel>
    );
  }
}

export default MyCarousel;
