import './streamBox.scss';
import Button from '@components/Shared/Button/Button';
import UserAvatar from '@components/Shared/user/userAvatar/userAvatar';
import BlockEl from '@components/utils/BlockEl';
import SvgIcon from '@components/utils/IconPacks';
import { useResizeContext } from '@store/context/WindowResize';
import React, { Component, useEffect, useState } from 'react';
import Scrollbar from 'react-scrollbars-custom';
import { useEmblaCarousel, UseEmblaCarouselType } from 'embla-carousel/react';
import { EmblaCarouselType } from 'embla-carousel/embla-carousel-vanilla';
import EventEmitter from '@utils/EventEmitter';
import EmblaSlider from '@components/emblaSlider/emblaSlider';


const StreamArray = Array(5).fill(
  <div className="streaming--area">
    <div className="streaming--content">
      <div className="box">
        <div className="video-wrap">
          <video controls src="./_api/videos/stream_1.mp4"></video>
          <div className="_overlay"></div>
          <div className="watch-count"><p>872</p></div>
        </div>
      </div>
    </div>
    <div className="streaming--user flx">
      <div className="name-area flx flxAC">
        <div className="avatar-area">
          <UserAvatar />
        </div>
        <div className="title-area">
          <p className="titler txtOvrf">Duos with my Babygaming to set all</p>
          <p className="user-name txtOvrf">SOXXX_3</p>
        </div>
      </div>
      <div className="right-area">
        <Button>Follow</Button>
      </div>
    </div>
  </div>
)

const StreamsList = (props: any) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  // console.log('[StreamsList]');


  useEffect(() => {
    if (emblaApi) {
      props.event.subscribe('action', (event: any) => {
        switch (event) {
          case 'next':
            emblaApi.scrollNext();
            // StreamArray.push(StreamArray[0]);
            console.log('--', emblaApi.slideNodes());
            // emblaApi.slideNodes().push(StreamArray[0]);
            // emblaApi?.reInit();
            console.log('--', emblaApi.slideNodes());
            break;
          case 'prev':
            emblaApi.scrollPrev();
            break;

          default:
            break;
        }
      });

      setTimeout(() => {
        // emblaApi.slideNodes().push(StreamArray[1]);
        emblaApi?.reInit();
      }, 2000)

      if (props.slider) {
        props.slider(emblaApi);
      }

      if (props.event) {
        emblaApi.on('select', (eventName: any) => {
          props.event.emit('select', emblaApi);
        });
      }
    }
  }, [emblaApi, props]);

  useEffect(() => {

    return () => {
      if (emblaApi) {
        console.log('---- UNMOUNT');
        emblaApi.off('select', () => {
        })
      }
    }
  }, [emblaApi])
  return (
    <div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {StreamArray.map((box: any, key: any) => {
            return <div key={key} className="embla__slide">
              {box}
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

const StreamingArrows = (props: any) => {
  const { event, slider } = props;
  const [canScrollNext, setNext] = useState(true);
  const [canScrollPrev, setPrev] = useState(false);

  useEffect(() => {
    if (event) {
      event.subscribe('select', (value: EmblaCarouselType) => {
        setNext(value.canScrollNext())
        setPrev(value.canScrollPrev())
      });
    }
  }, [event]);

  // console.log('------');

  return (
    <div className="arrows-area flx">
      <Button
        onClick={() => {
          event.emit('action', 'prev');
        }}
        disabled={!canScrollPrev}
        none={'true'}>
        <SvgIcon pack="shared" name="arrowRight" rotate={180} />
      </Button>
      <Button onClick={() => {
        event.emit('action', 'next');
        //slider.scrollNext();
      }}
        none={'true'}
        disabled={!canScrollNext}
      >
        <SvgIcon pack="shared" name="arrowRight" />
      </Button>
    </div>
  )
}

class Streaming extends Component<any, any> {
  eventEmiter: any = this.props.eventEmitter || EventEmitter();

  constructor(props: any) {
    super(props);
  }

  render() {
    // console.log('[Streaming] render', this.props);

    return (
      <div className="streaming streaming--wrap">
        <div className="streaming--head flx flxAC">
          <div className="heads">
            <p><span className="_c _r">LIVE</span> <span>Stream</span></p>
            <p className="title-about"><span className="_c _w">ჩვენ</span> <span>გირჩევთ</span></p>
          </div>
          <div className="right-area _flx-right">
            <StreamingArrows event={this.eventEmiter} />
          </div>
        </div>
        <StreamsList event={this.eventEmiter} />
      </div>
    )
  }
}

export default class StreamBox extends Component {
  render() {    
    return (
        <Streaming />
    )
  }
}