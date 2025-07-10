import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "Women", path: "/products/women" },
        { name: "Men", path: "/products/men" },
        { name: "Kids", path: "/products/kids" },
        { name: "Home & Living", path: "/products/home-living" },
        { name: "Beauty", path: "/products/beauty" }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "Size Guide", path: "/size-guide" },
        { name: "Return Policy", path: "/returns" },
        { name: "Shipping Info", path: "/shipping" },
        { name: "FAQs", path: "/faqs" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Press", path: "/press" },
        { name: "Sustainability", path: "/sustainability" },
        { name: "Investor Relations", path: "/investors" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Accessibility", path: "/accessibility" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "#" },
    { name: "Instagram", icon: "Instagram", url: "#" },
    { name: "Twitter", icon: "Twitter", url: "#" },
    { name: "YouTube", icon: "Youtube", url: "#" }
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name="ShoppingBag" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold text-white font-display">
                  StyleHub
                </span>
              </Link>
              <p className="text-gray-300 text-sm mb-4">
                Your one-stop destination for trendy fashion and lifestyle products.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <ApperIcon name={social.icon} size={16} className="text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm">
                Subscribe to get updates on new arrivals and exclusive offers.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-r-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 StyleHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" size={16} className="text-gray-400" />
                <span className="text-gray-300 text-sm">Secure Shopping</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Truck" size={16} className="text-gray-400" />
                <span className="text-gray-300 text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="RotateCcw" size={16} className="text-gray-400" />
                <span className="text-gray-300 text-sm">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;