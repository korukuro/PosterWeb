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
      <div className="w-full bg-black">
        <img src={Logo} alt="" className="object-contain invert " />
        <div className="border-b w-[100%] flex flex-col lg:flex-row pt-5 border-richblack-700 text-white">
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="flex flex-col gap-3 mb-7 lg:pl-0 h-[29rem]">
              <h1 className="text-richblack-50 text-2xl font-bold">
                About Us
              </h1>
              <p>
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

          {/* Section 2 */}
          <div className="lg:w-[50%] pt-20 flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]"></h1>
              <div className="flex flex-col gap-5 mt-2">
                <div className="hover:underline cursor-pointer transition duration-500">Contact Us</div>
                <div className="hover:underline cursor-pointer transition duration-500">Cancellation Policy</div>
                <div className="hover:underline cursor-pointer transition duration-500">FAQs</div>

              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
          <div className="flex gap-5">
            <div className="text-white hover:underline cursor-pointer transition duration-500">
              Terms of Service
            </div>
            <div className="text-white hover:underline cursor-pointer transition duration-500">
              Refund Policy
            </div>
            <div className="text-white hover:underline cursor-pointer transition duration-500">
              About Us  
            </div>
          </div>
        </div>
      </div>
  );
};

export default Footer;
