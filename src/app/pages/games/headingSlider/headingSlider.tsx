import React, { useEffect, useState } from 'react';
import './headingSlider.scss';
import GamerPNG from '@assets/street_striker_fortnite_chapter_2_4k-1920x1080.png';
import BlockEl from '@components/utils/BlockEl';
import StreamBox from '@components/streamBox/streamBox';
import { useEmblaCarousel } from 'embla-carousel/react';
import { randomNumber } from '@utils/Functions';

const SlidesArray = Array(3).fill(null).map((e, key) => {
  const bgColor = `#${Math.floor(randomNumber(5, 9))}f${Math.floor(randomNumber(0, 9))}f${Math.floor(randomNumber(0, 9))}a`;
  return <div key={key} className='container-item'>
    <BlockEl style={{ clipPath: "url(#path-12)", backgroundColor: bgColor, height: 400, marginBottom: 0, borderRadius: 20 }}>
    </BlockEl>
    <img src={GamerPNG} alt="" />
  </div>
});

const ImitationSlide = ({ embla }) => {
  const emblaApi = embla;
  const [imitationValue, setImitationValue] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('scroll', (eventName) => {
      setImitationValue(emblaApi.dangerouslyGetEngine().target.get())
      // console.log('--', { embal: emblaApi.dangerouslyGetEngine(), px: emblaApi.dangerouslyGetEngine().target.get() });
    });
  })

  return (
    <div className="imitation--wrap"
      style={{ width: '100%', overflow: 'hidden' }}
    >
      <div className="imitation flx" style={{ transform: `translate3d(${imitationValue}%, 0px, 0px)` }}>
        {emblaApi?.slideNodes().map((e, key) => {
          return <div style={{ flex: '0 0 100%', margin: '0 20px' }} key={key}

          >{key}</div>
        })}
      </div>
    </div>
  )
}

const HeadingSlider = (props: any) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeKey, setActiveKey] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('scroll', (eventName) => {
      console.log('--', { 
        embal: emblaApi.dangerouslyGetEngine(), 
        px: emblaApi.dangerouslyGetEngine().target.get(),
        index: emblaApi.dangerouslyGetEngine().index.get()
       });
    });
    emblaApi.on('select', (eventName) => {
      setActiveKey(emblaApi.dangerouslyGetEngine().index.get());
      console.log('--', emblaApi.dangerouslyGetEngine().index.get());
    });
  })

  return (
    <div className="component-heading-slider">

      <div className="component-heading-slider--wrap">
        <div className="embla2" ref={emblaRef}>
          <div className="embla__container">
            {SlidesArray.map((box: any, key: any) => {
              return <div key={key} className="embla__slide sliderItem">
                {box}
              </div>
            })}
          </div>
        </div>

        <div className="embla-dots">
          {emblaApi?.slideNodes().map((e, key) => {
            return <div key={key}
              onClick={(() => {
                console.log('emblaApi.slidesInView()', emblaApi.slidesInView());
                emblaApi.scrollTo(key)
              })}
              className={['dot'].concat(emblaApi.dangerouslyGetEngine().index.get() == key ? ['active'] : ['']).join((' '))}></div>
          })}
        </div>
      </div>

      {/* <ImitationSlide embla={emblaApi} /> */}

    </div>


  );
}

export default HeadingSlider
