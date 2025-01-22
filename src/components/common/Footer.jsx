import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-link";
import Logo from "../../additionalFile/logo.png";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="w-full h-screen">
      <div className="">
        <div className="border-b-2 border-r-2 border-l-2 border-black h-44 flex flex-col lg:flex-row">
          <div className="flex-1 relative">
            <div className="text-2xl w-full text-center absolute top-1/3">
              SHOP
            </div>
          </div>
          <div className="flex-1 border-r-2 border-l-2 border-black flex flex-row lg:flex-col items-center">
            <div className="w-full text-2xl text-center mt-4 lg:mt-12">
              ABOUT
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-center gap-4 bg-red-600 mt-4 lg:mt-0">
              <span>Shop</span>
              <span>Contact</span>
              <span>FAQs</span>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="w-full text-2xl text-center absolute top-1/3">
              CONTACT
            </div>
          </div>
        </div>

        <div className="border-b w-full flex flex-col lg:flex-row pt-5 border-richblack-700">
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="flex flex-col gap-3 mb-7 lg:pl-0 pt-14">
              <h1 className="text-richblack-50 text-2xl font-bold bg-yellow-400">
                About Us
              </h1>
              <p className="text-sm lg:text-base">
                Welcome to the ultimate destination where your creative ideas
                come to life! Transform your walls into stunning masterpieces
                with our premium-quality posters, designed to elevate your space
                and reflect your unique style. Let your imagination soar as you
                explore endless possibilities to create a truly personalized and
                captivating environment.
              </p>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0"></div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0"></div>
          </div>

          <div className="lg:w-[50%] pt-14 flex flex-wrap flex-row pl-3 lg:pl-5 gap-3">
            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <div className="flex flex-col gap-2 mt-2 items-start lg:items-end">
                <h1 className="font-bold">Help</h1>
                <div className="hover:underline cursor-pointer transition duration-500">
                  Shipment
                </div>
                <div className="hover:underline cursor-pointer transition duration-500">
                  Payments
                </div>
                <div className="hover:underline cursor-pointer transition duration-500">
                  Cancellation Policy
                </div>
                <div className="hover:underline cursor-pointer transition duration-500">
                  Track Your Order
                </div>
                <div className="hover:underline cursor-pointer transition duration-500">
                  Return Policy
                </div>
              </div>
            </div>
            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <div className="flex flex-col gap-2 mt-2 items-start lg:items-end">
                <h1 className="font-bold">Legal Info</h1>
                <div className="hover:underline cursor-pointer transition duration-500">
                  Terms & Conditions
                </div>
                <div className="hover:underline cursor-pointer transition duration-500">
                  Privacy Policy
                </div>
                <div className="hover:underline cursor-pointer transition duration-500">
                  Conditions
                </div>
                <div className="hover:underline cursor-pointer transition duration-500">
                  Items Inside The Box
                </div>
              </div>
            </div>
            <div className="w-[48%] lg:w-[25%] mb-7 lg:pl-0">
              <div className="flex flex-col gap-2 mt-2 items-start lg:items-end">
                <h1 className="font-bold">FOLLOW US</h1>
                <div className="hover:underline cursor-pointer transition duration-500">
                  Instagram
                </div>
                <div className="hover:underline cursor-pointer transition duration-500">
                  LinkedIn
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[3rem] lg:text-[11rem] w-full text-center font-extrabold font-serif">
          POSTERWEB
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto text-sm">
          <div className="flex gap-5"></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
