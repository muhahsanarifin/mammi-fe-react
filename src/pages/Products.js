import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
// import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import HeaderAdmin from "../components/admin/Header";
import ProductAdmin from "../components/admin/Product";
import TitleBar from "../components/TitleBar";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import styles from "../styles/Products.module.css";
import Skeleton from "../components/Skeleton";

const Products = () => {
  // const navigation = useNavigate();
  const [products, setProducts] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState([]);
  const [promoLoading, setPromoLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  // const [filter, setFilter] = useState([]);
  // const [sort, setSort] = useState([]);
  const [seacrh, setSearch] = useState([]);
  const accessRole = localStorage.getItem("access-role");

  // TODO: Get Products
  const getProducts = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products?search=${seacrh}`
      );
      setLoading(response.data.result.data);
      setTimeout(() => {
        setProducts(response.data.result.data);
      }, 1000);
    } catch (error) {
      setLoading(loading);
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, [seacrh]);

  // TODO: Search Product
  const search = (e) => {
    const delayDebounce = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
    return () => clearTimeout(delayDebounce);
  };

  // TODO: Get Promos
  const getPromos = async () => {
    try {
      setPromoLoading(true);
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/promos`
      );
      setPromoLoading(false);
      // console.log(response.data.result);
      setPromos(response.data.result.data);
    } catch (error) {
      setPromoLoading(true);
      console.log(error.message);
    }
  };
  useEffect(() => {
    getPromos();
  }, []);

  return (
    <>
      <TitleBar title={`MAMMI | Products`} />
      {accessRole === "Admin" ? (
        <HeaderAdmin onChange={search} />
      ) : (
        <Header onChange={search} />
      )}
      <main className={styles.main}>
        <aside
          className={`${styles["main__left-side"]} ${styles["main__promo"]}`}
        >
          <h3 className={styles["promo__title"]}>Promo for you</h3>
          <p className={styles["promo__announcement"]}>
            Coupon will updated every weeks. Check them out
          </p>
          <span className={styles["promo__card-section"]}>
            <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]}>
              {promoLoading ? (
                <Loader styleSection={styles["sectionLoader"]} />
              ) : (
                promos.map((promo) => (
                  <SwiperSlide>
                    <span className={styles["promo__card"]} key={promo.id}>
                      <img src={promo.image} alt="Product Promo" />
                      <p>
                        {promo.product_name} {promo.discount}% OFF
                      </p>
                      <span className={styles["promo__card__decs"]}>
                        Buy 1 Choco Oreo and get 20% off for Beff Spaghetti
                      </span>
                      <span className={styles.coupon}>
                        <p className={styles["coupon__title"]}>COUPON CODE</p>
                        <h3>{promo.code}</h3>
                        <p className={styles.description}>{``}</p>
                      </span>
                    </span>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </span>

          <button className={styles["btn-coupon"]}>Apply Coupon</button>
          <span className={styles["terms-and-condition"]}>
            <h3>Terms and Condition</h3>
            <p>1. You can only apply 1 coupon per day</p>
            <p>2. It only for dine in</p>
            <p>3. Buy 1 get 1only for new user</p>
            <p>4. Should make member card to apply coupon</p>
          </span>

          {accessRole === "Admin" ? (
            <Link to={`/promo/add`}>
              <button className={styles["btn-add-promo"]}>Add new promo</button>
            </Link>
          ) : null}
        </aside>
        <section
          className={`${styles["main__right-side"]} ${styles["main__products"]}`}
        >
          <ul className={styles["main__products__header"]}>
            <li className={styles["favor-products"]} value={``} onClick={``}>
              Favorite Product
            </li>
            <li
              className={styles["coffee-products"]}
              value={`Cofee`}
              onClick={``}
            >
              Coffee
            </li>
            <li
              className={styles["non-coffee-products"]}
              value={``}
              onClick={``}
            >
              Non Coffee
            </li>
            <li className={styles.foods} value={``} onClick={``}>
              Foods
            </li>
            <li className={styles["Add-on"]} value={``} onClick={``}>
              Add-on
            </li>
          </ul>
          <span className={styles["sorting-and-pagination"]}>
            <span className={styles.sorting}>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret className={styles["dropdown-products"]}>
                  <p>Sort</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    header
                    className={styles["dropdown-item-products"]}
                  >
                    Price
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    // onClick={}
                  >
                    Expensive
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    // onClick={}
                  >
                    Low
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    header
                  >
                    post
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    // onClick={}
                  >
                    Latest
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    // onClick={}
                  >
                    Oldest
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
          </span>
          <span
            className={`row gap-4 mx-5 ${styles["main__products__content"]}`}
          >
            {!products.length && <Skeleton products={loading} />}

            {accessRole === "Admin"
              ? products.map((product) => (
                  <ProductAdmin
                    productKey={product.id}
                    productId={`/product/${product.id}`}
                    productImage={product.image}
                    productName={product.product_name}
                    prodcutPrice={product.price}
                  />
                ))
              : products.map((product) => (
                  <span
                    className={`col my-3 ${styles.product}`}
                    key={product.id}
                  >
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt={product.product_name} />
                    </Link>
                    <p className={styles["product__name"]}>
                      {product.product_name}
                    </p>
                    <p
                      className={styles["product__price"]}
                    >{`IDR ${product.price}`}</p>
                  </span>
                ))}
          </span>
          {accessRole === "Admin" ? (
            <Link
              to={`/product/add`}
              className={styles["link-btn-new-product"]}
            >
              <span className={styles["btn-new-product"]}>
                <button> Add new Product</button>
              </span>
            </Link>
          ) : (
            <span className={styles["sorting-and-pagination"]}>
              <span className={styles.pagination}>
                <Pagination>
                  <PaginationItem style={{ color: "red" }}>
                    <PaginationLink
                      first
                      href="#"
                      style={{ color: "#6a4029" }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      previous
                      style={{ color: "#6a4029" }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" style={{ color: "#6a4029" }}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" style={{ color: "#6a4029" }}>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" style={{ color: "#6a4029" }}>
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      next
                      style={{ color: "#6a4029" }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      last
                      style={{ color: "#6a4029" }}
                    />
                  </PaginationItem>
                </Pagination>
              </span>
            </span>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Products;
