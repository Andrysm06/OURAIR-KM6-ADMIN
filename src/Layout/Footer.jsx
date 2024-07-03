import { Link } from "react-router-dom";
import Logo from "../../public/logoFooter.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-transparent text-black">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center">
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-white hover:text-blue-500"
              />
            </a>
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-white hover:text-blue-500"
              />
            </a>
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-white hover:text-blue-500"
              />
            </a>
          </div>
        </div>

        {/* Menu */}
        {/* <div className="mt-8">
          <ul className="flex flex-wrap justify-center space-x-8">
            <li>
              <Link to="/about" className="hover:text-blue-500">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-500">
                Layanan
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500">
                Kontak
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-blue-500">
                FAQ
              </Link>
            </li>
          </ul>
        </div> */}

        {/* Copy Right */}
        <div className="text-center mt-8">
          <p>&copy; 2024 OurAir. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
