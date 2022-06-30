import EventEmitter from '@utils/EventEmitter';
import { useEmblaCarousel, UseEmblaCarouselType } from 'embla-carousel/react';
import React, { Component, FunctionComponent, useEffect, useState } from 'react';
import './emblaSlider.scss'


const EmbalSlider = (props: any) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const eventEmitter = EventEmitter();
  const [canRender, setRender] = useState(false);

  useEffect(() => {
    if (emblaApi) {
      console.log('e', emblaApi);
      setRender(true);
    }
  }, [emblaApi]);


  return <div className="embla" ref={emblaRef}>
    <div className="embla__container">
      {!!canRender ? props.children({emblaApi, eventEmitter}) : null}
    </div>
  </div>;
}

export default EmbalSlider;
