"use client";

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "./main.css";

const page = () => {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/user");
  // }, [router]);
  return (
    <div className="index-page">
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <a href="/user" className="logo d-flex align-items-center me-auto">
            <img src="/img/logo.png" alt="" />
            <h1 className="sitename">Active Store</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="#hero" className="active">
                  Home
                  <br />
                </a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#how-it-works">How it Works</a>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a className="btn-getstarted flex-md-shrink-0" href="/user/login">
            Sign in
          </a>
        </div>
      </header>
      <main className="main">
        {/* <!-- Hero Section --> */}
        <section id="hero" className="hero section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">
                  Discover unique social account in active store{" "}
                </h1>
                <p data-aos="fade-up" data-aos-delay="100">
                  Boost your online presence by browsing, authenticating, and
                  obtaining genuine accounts on active store.
                </p>
                <div
                  className="d-flex flex-column flex-md-row"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <a href="/user/login" className="btn-get-started">
                    Get Started <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
              <div
                className="col-lg-6 order-1 order-lg-2 hero-img"
                data-aos="zoom-out"
              >
                <img
                  src="/img/hero-img.png"
                  className="img-fluid animated"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- /Hero Section --> */}

        {/* <!-- About Section --> */}
        <section id="about" className="about section">
          <div className="container section-title" data-aos="fade-up">
            <h2>About Us</h2>
            <p>
              Who we are <br />
            </p>
          </div>
          <div className="container" data-aos="fade-up">
            <div className="row gx-0">
              <div
                className="col-lg-6 d-flex flex-column justify-content-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="content">
                  <h3>About Active Store</h3>
                  <h2>
                    At Activestore, we specialize in providing a diverse array
                    of accounts suited for multiple purposes, including
                    marketing, brand promotion, newsletters, and more.
                  </h2>
                  <p>
                    We sell all types of social media accounts such as Facebook,
                    Instagram, Twitter, TikTok, Foreign Numbers.
                  </p>
                  <p>
                    We boost followers, We create website and mobile apps too
                    VPN and tools for work, Professionals photo and video
                    editing
                  </p>
                  <div className="text-center text-lg-start">
                    <a
                      href="/user"
                      className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <span>Purchase now</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-6 d-flex align-items-center"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <img src="/img/about.jpg" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- /About Section --> */}

        {/* <!-- Values Section --> */}

        {/* <!-- /Values Section --> */}

        {/* <!-- Stats Section --> */}
        <>
          {/* <section id="stats" className="stats section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-3 col-md-6">
                <div className="stats-item d-flex align-items-center w-100 h-100">
                  <i className="bi bi-emoji-smile color-blue flex-shrink-0"></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="232"
                      data-purecounter-duration="1"
                      className="purecounter"
                    ></span>
                    <p>Happy Clients</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="stats-item d-flex align-items-center w-100 h-100">
                  <i
                    className="bi bi-journal-richtext color-orange flex-shrink-0"
                    style={{ color: "#ee6c20" }}
                  ></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="521"
                      data-purecounter-duration="1"
                      className="purecounter"
                    ></span>
                    <p>Projects</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="stats-item d-flex align-items-center w-100 h-100">
                  <i
                    className="bi bi-headset color-green flex-shrink-0"
                    style={{ color: "#15be56" }}
                  ></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="1463"
                      data-purecounter-duration="1"
                      className="purecounter"
                    ></span>
                    <p>Hours Of Support</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="stats-item d-flex align-items-center w-100 h-100">
                  <i
                    className="bi bi-people color-pink flex-shrink-0"
                    style={{ color: "#bb0852" }}
                  ></i>
                  <div>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="15"
                      data-purecounter-duration="1"
                      className="purecounter"
                    ></span>
                    <p>Hard Workers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        </>
        {/* <!-- /Stats Section --> */}

        {/* <!-- Features Section --> */}
        <section id="features" className="features section">
          {/* <!-- Section Title --> */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Features</h2>
            <p>
              Our key Features
              <br />
            </p>
          </div>
          {/* <!-- End Section Title --> */}

          <div className="container">
            <div className="row gy-5">
              <div
                className="col-xl-6"
                data-aos="zoom-out"
                data-aos-delay="100"
              >
                <img src="/img/features.png" className="img-fluid" alt="" />
              </div>

              <div className="col-xl-6 d-flex">
                <div className="row align-self-center gy-4">
                  <div
                    className="col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>Facebook Accounts</h3>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div
                    className="col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>Instagram Accounts</h3>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div
                    className="col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>Twitter Accounts</h3>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div
                    className="col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="500"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>TikTok Accounts</h3>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div
                    className="col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>Foreign Numbers</h3>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div
                    className="col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>We boost followers</h3>
                    </div>
                  </div>
                  <div
                    className="col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>We create website and mobile apps</h3>
                    </div>
                  </div>
                  <div
                    className="col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>VPN and toool for work</h3>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- /Features Section --> */}

        {/* <!-- Alt Features Section --> */}
        <section id="how-it-works" className="alt-features section">
          <div className="container section-title" data-aos="fade-up">
            <h2>How it Works</h2>
            <p>
              How to use active store
              <br />
            </p>
          </div>
          <div className="container">
            <div className="row gy-5">
              <div
                className="col-xl-7 d-flex order-2 order-xl-1"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="row align-self-center gy-5">
                  <div className="col-md-6 icon-box">
                    <i className="bi bi-award"></i>
                    <div>
                      <h4>Explore</h4>
                      <p>
                        Dive into our store and discover a world of unique
                        products.
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div className="col-md-6 icon-box">
                    <i className="bi bi-card-checklist"></i>
                    <div>
                      <h4>Connect</h4>
                      <p>
                        Communicate directly with sellers to ask questions, or
                        discuss customization options. Our platform fosters a
                        sense of connection between buyers and sellers.
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div className="col-md-6 icon-box">
                    <i className="bi bi-dribbble"></i>
                    <div>
                      <h4>Secure Checkout</h4>
                      <p>
                        Once you’ve found your perfect item, proceed to our
                        secure checkout process. Rest easy knowing that your
                        payment is protected, and your purchase is in good
                        hands.
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div className="col-md-6 icon-box">
                    <i className="bi bi-filter-circle"></i>
                    <div>
                      <h4>Enjoy</h4>
                      <p>
                        Sit back and relax as your chosen item makes its way to
                        you. Join a community of like-minded individuals who
                        appreciate the value of genuine and authentic product.
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  {/* <div className="col-md-6 icon-box">
                    <i className="bi bi-lightning-charge"></i>
                    <div>
                      <h4>Molestiae dolor</h4>
                      <p>
                        Et fuga et deserunt et enim. Dolorem architecto ratione
                        tensa raptor marte
                      </p>
                    </div>
                  </div> */}
                  {/* <!-- End Feature Item --> */}

                  {/* <div className="col-md-6 icon-box">
                    <i className="bi bi-patch-check"></i>
                    <div>
                      <h4>Explicabo consectetur</h4>
                      <p>
                        Est autem dicta beatae suscipit. Sint veritatis et sit
                        quasi ab aut inventore
                      </p>
                    </div>
                  </div> */}
                  {/* <!-- End Feature Item --> */}
                </div>
              </div>

              <div
                className="col-xl-5 d-flex align-items-center order-1 order-xl-2"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <img src="/img/alt-features.png" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- /Alt Features Section --> */}

        {/* <!-- Services Section --> */}

        {/* <!-- /Services Section --> */}

        {/* <!-- Faq Section --> */}

        {/* <!-- /Faq Section --> */}
      </main>
      <footer id="footer" className="footer">
        <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">Active Store</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default page;
