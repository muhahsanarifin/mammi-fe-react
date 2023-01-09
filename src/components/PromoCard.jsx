import React from "react";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import pen from "../assets/icons/pen.svg";

import styles from "../styles/PromoCard.module.css";

const PromoCard = ({ promos }) => {
  const navigation = useNavigate()
  return (
    <span className={styles["promo__card-section"]}>
      <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]}>
        {promos.map((promo) => (
          <SwiperSlide>
            <span className={styles["promo__card"]} key={promo.id}>
              <span
                className={styles["btn-product"]}
                onClick={() => navigation(`/promo/${promo.id}/edit`)}
              >
                <img
                  src={pen}
                  alt="btn-product"
                  className={styles["btn-product-icon"]}
                />
              </span>
              <img
                src={promo.image}
                alt="Product Promo"
                className={styles["promo__card__image"]}
              />
              <p>
                {promo.product_name} {promo.discount}% OFF
              </p>
              <span className={styles["promo__card__decs"]}>
                Buy {promo.product_name} get {promo.discount}% off{" "}
                {promo.product_name}
              </span>
              <span className={styles.coupon}>
                <p className={styles["coupon__title"]}>COUPON CODE</p>
                <h3>{promo.code}</h3>
                <p className={styles.description}>{``}</p>
              </span>
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </span>
  );
};

export default PromoCard;
