import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { getCurrentDate } from "../../assets/dateUtils";

const Footer = () => {
  return (
    <footer>
      <div className="main_footer">
        <div className="main_footer_company">
          <span>morent</span>
          <p>
            Our vision is to provide convenience <br /> and help increase your
            sales business.
          </p>
        </div>
        <div className="footer_nav">
          <div>
            <span>About</span>
            <ul>
              <li>
                <Link to="/">How it works</Link>
              </li>
              <li>
                <Link to="/">Featured</Link>
              </li>
              <li>
                <Link to="/">Partnership</Link>
              </li>
              <li>
                <Link to="/">Business Relations</Link>
              </li>
            </ul>
          </div>
          <div>
            <span>Community</span>
            <ul>
              <li>
                <Link to="/">Events</Link>
              </li>
              <li>
                <Link to="/">Blog</Link>
              </li>
              <li>
                <Link to="/">Podcast</Link>
              </li>
              <li>
                <Link to="/">Invite A friend</Link>
              </li>
            </ul>
          </div>
          <div>
            <span>Socials</span>
            <ul>
              <li>
                <Link to="/">Discord</Link>
              </li>
              <li>
                <Link to="/">Instagram</Link>
              </li>
              <li>
                <Link to="/">Twitter</Link>
              </li>
              <li>
                <Link to="/">Facebook</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer_dates">
        <p>© {getCurrentDate()} MORENT. All rights reserved.</p>

        <div className="footer_links">
          <span>Privacy & Policy</span>
          <span>Term & Condition</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
