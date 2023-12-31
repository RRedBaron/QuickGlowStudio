import 'swiper/css';
import 'swiper/css/pagination';

import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import bannerImage1 from "/images/portfolio-1.jpg";
import bannerImage2 from "/images/portfolio-2.jpg";
import bannerImage3 from "/images/portfolio-3.jpg";
import bannerImage4 from "/images/portfolio-4.jpeg";
import bannerImage5 from "/images/portfolio-5.jpg";

import styles from './PortfolioSlider.module.css';

function PortfolioSlider() {
    return (
        <Swiper
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            className={styles['mySwiper']}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}

            slidesPerView={2}
            spaceBetween={20}
            centeredSlides={true}
            loop={true}
            style={{
                width: '80%',
            }}
        >
            <SwiperSlide>
                <div className={styles['banner-container']}>
                    <img
                        src={bannerImage1}
                        alt="Banner"
                        className={styles['banner']}
                    />

                </div>
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src={bannerImage2}
                    alt="Banner"
                    className={styles['banner']}
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src={bannerImage3}
                    alt="Banner"
                    className={styles['banner']}
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src={bannerImage4}
                    alt="Banner"
                    className={styles['banner']}
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src={bannerImage5}
                    alt="Banner"
                    className={styles['banner']}
                />
            </SwiperSlide>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
        </Swiper>
    )
}

export default PortfolioSlider;