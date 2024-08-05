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
          <a
            href="index.html"
            className="logo d-flex align-items-center me-auto"
          >
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
                  We offer modern solutions for growing your business
                </h1>
                <p data-aos="fade-up" data-aos-delay="100">
                  We are team of talented designers making websites with
                  Bootstrap
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
                  <h3>Who We Are</h3>
                  <h2>
                    Expedita voluptas omnis cupiditate totam eveniet nobis sint
                    iste. Dolores est repellat corrupti reprehenderit.
                  </h2>
                  <p>
                    Quisquam vel ut sint cum eos hic dolores aperiam. Sed
                    deserunt et. Inventore et et dolor consequatur itaque ut
                    voluptate sed et. Magnam nam ipsum tenetur suscipit
                    voluptatum nam et est corrupti.
                  </p>
                  <div className="text-center text-lg-start">
                    <a
                      href="#"
                      className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <span>Read More</span>
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
              Our Advacedd Features
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
                      <h3>Eos aspernatur rem</h3>
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
                      <h3>Facilis neque ipsa</h3>
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
                      <h3>Volup amet volupt</h3>
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
                      <h3>Rerum omnis sint</h3>
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
                      <h3>Alias possimus</h3>
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
                      <h3>Repellendus molli</h3>
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
                      <h4>Corporis voluptates sit</h4>
                      <p>
                        Consequuntur sunt aut quasi enim aliquam quae harum
                        pariatur laboris nisi ut aliquip
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div className="col-md-6 icon-box">
                    <i className="bi bi-card-checklist"></i>
                    <div>
                      <h4>Ullamco laboris nisi</h4>
                      <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div className="col-md-6 icon-box">
                    <i className="bi bi-dribbble"></i>
                    <div>
                      <h4>Labore consequatur</h4>
                      <p>
                        Aut suscipit aut cum nemo deleniti aut omnis. Doloribus
                        ut maiores omnis facere
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div className="col-md-6 icon-box">
                    <i className="bi bi-filter-circle"></i>
                    <div>
                      <h4>Beatae veritatis</h4>
                      <p>
                        Expedita veritatis consequuntur nihil tempore laudantium
                        vitae denat pacta
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div className="col-md-6 icon-box">
                    <i className="bi bi-lightning-charge"></i>
                    <div>
                      <h4>Molestiae dolor</h4>
                      <p>
                        Et fuga et deserunt et enim. Dolorem architecto ratione
                        tensa raptor marte
                      </p>
                    </div>
                  </div>
                  {/* <!-- End Feature Item --> */}

                  <div className="col-md-6 icon-box">
                    <i className="bi bi-patch-check"></i>
                    <div>
                      <h4>Explicabo consectetur</h4>
                      <p>
                        Est autem dicta beatae suscipit. Sint veritatis et sit
                        quasi ab aut inventore
                      </p>
                    </div>
                  </div>
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
