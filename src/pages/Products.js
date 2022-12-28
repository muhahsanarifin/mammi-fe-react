import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import HeaderAdmin from "../components/admin/Header";
import ProductAdmin from "../components/admin/Product";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import styles from "../styles/Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // TODO: Get Products
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/?page=1&limit=6`
      );
      setProducts(response.data.result.data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const favorProduct = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/?favorite=true`
      );
      setProducts(response.data.result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const coffee = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/?category=Coffee`
      );
      setProducts(response.data.result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const nonCofee = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/?category=Non Coffee`
      );
      setProducts(response.data.result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const foods = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/?category=Food`
      );
      setProducts(response.data.result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addOn = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products`
      );
      setProducts(response.data.result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const expensive = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/?price=expensive`
      );
      setProducts(response.data.result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const low = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/?price=low`
      );
      setProducts(response.data.result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const latest = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/?post=latest`
      );
      setProducts(response.data.result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const oldest = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/products/?post=oldest`
      );
      setProducts(response.data.result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // TODO: Get Promos
  const getPromos = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(
        `${process.env.REACT_APP_BACKEND_HOST}api/v1/promos?page=1&limit=1`
      );
      setLoading(false);
      setPromos(response.data.result.data);
    } catch (error) {
      setLoading(true);
      console.log(error.message);
    }
  };
  useEffect(() => {
    getPromos();
  }, []);

  return (
    <>
      {role === "Admin" ? (
        <HeaderAdmin
          // value = {}
          // onChange = {}
          // onSubmit = {}
        />
      ) : (
        <Header
          // value={}
          // onChange={}
          // onSubmit={}
        />
      )}
      <main className={styles.main}>
        <aside
          className={`${styles["main__left-side"]} ${styles["main__promo"]}`}
        >
          <h3 className={styles["promo__title"]}>Promo for you</h3>
          <p className={styles["promo__announcement"]}>
            Coupon will updated every weeks. Check them out
          </p>
          {loading ? (
            <Loader />
          ) : (
            promos.map((promo, index) => (
              <span className={styles["promo__card"]} key={index}>
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
                  <p className={styles.description}>
                    Valid until October 10th 2020
                  </p>
                </span>
              </span>
            ))
          )}
          <button className={styles["btn-coupon"]}>Apply Coupon</button>
          <span className={styles["terms-and-condition"]}>
            <h3>Terms and Condition</h3>
            <p>1. You can only apply 1 coupon per day</p>
            <p>2. It only for dine in</p>
            <p>3. Buy 1 get 1only for new user</p>
            <p>4. Should make member card to apply coupon</p>
          </span>
          {role === "Admin" ? (
            <Link to={`/promo/add`}>
              <button className={styles["btn-add-promo"]}>Add new promo</button>
            </Link>
          ) : null}
        </aside>
        <section
          className={`${styles["main__right-side"]} ${styles["main__products"]}`}
        >
          <span className={styles["main__products__header"]}>
            <p className={styles["favor-products"]} onClick={favorProduct}>
              Favorite Product
            </p>
            <p className={styles["coffee-products"]} onClick={coffee}>
              Coffee
            </p>
            <p className={styles["non-coffee-products"]} onClick={nonCofee}>
              Non Coffee
            </p>
            <p className={styles.foods} onClick={foods}>
              Foods
            </p>
            <p className={styles["Add-on"]} onClick={addOn}>
              Add-on
            </p>
          </span>
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
                    onClick={expensive}
                  >
                    Expensive
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    onClick={low}
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
                    onClick={latest}
                  >
                    Latest
                  </DropdownItem>
                  <DropdownItem
                    className={styles["dropdown-item-products"]}
                    onClick={oldest}
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
            {loading && <Loader />}
            {role === "Admin"
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
          {role === "Admin" ? (
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
