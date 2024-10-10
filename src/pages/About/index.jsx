import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div>
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Sakeny-Shokran</strong>, your trusted partner in real estate. Founded in 2024, we have dedicated ourselves to providing exceptional service and expertise in the property market. Our mission is to connect buyers and sellers with the perfect properties that meet their needs.
        </p>
      </div>

      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-secondary text-white text-center">
        <h2>Our Vision</h2>
        <p>
          At Sakeny-Shokran, we envision a world where every individual can find their ideal home. We believe in the importance of community and strive to make a positive impact in every neighborhood we serve.
        </p>
      </div>

      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center">
        <h2>Our Team</h2>
        <p>
          Our team consists of experienced real estate professionals who are passionate about helping clients navigate the complexities of buying and selling properties. With extensive knowledge of the local market, we are committed to delivering personalized service tailored to each client’s unique needs.
        </p>
      </div>

      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-secondary text-white text-center">
        <h2>Why Choose Us?</h2>
        <ul className="list-unstyled">
          <li>🌟 <strong>Expert Guidance:</strong> Our agents are well-versed in market trends and property values, ensuring you make informed decisions.</li>
          <li>🏡 <strong>Comprehensive Services:</strong> From residential sales to commercial properties, we cover all aspects of real estate.</li>
          <li>🤝 <strong>Client-Centric Approach:</strong> Your satisfaction is our priority. We work tirelessly to exceed your expectations at every step.</li>
        </ul>
      </div>

      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center">
        <h2>Get in Touch</h2>
        <p>
          Whether you’re looking to buy, sell, or invest in real estate, Sakeny-Shokran is here to help. Contact us today to learn more about how we can assist you in your real estate journey.
        </p>
      </div>
    </div>
  );
}

export default About;