import Swiper from 'swiper';
import { Navigation, A11y } from 'swiper/modules';

const swipers = document.querySelectorAll('.slider');

swipers.forEach((swiper) => {
  new Swiper(swiper.querySelector('.slider__swiper'), {
    modules: [Navigation, A11y],
    a11y: {
      a11y: true,
      prevSlideMessage: Drupal.t('Go to previous slide'),
      nextSlideMessage: Drupal.t('Go to next slide'),
    },
    direction: 'horizontal',
    slidesPerView: 'auto',
    watchOverflow: true,
    spaceBetween: 16,
    loop: true,
    navigation: {
      nextEl: swiper.querySelector('.slider__next'),
      prevEl: swiper.querySelector('.slider__prev'),
    },
  });
});
