import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sideBar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { useDispatch } from "react-redux";
import { logout } from "../services/operations/authAPI";
import { LuLogOut } from "react-icons/lu";

import { BackgroundBeams } from "../components/ui/background-beam";  

export function SidebarDemo() {
  const links = [
    {
      label: "Order History",
      href: "/dashboard/order-history",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/dashboard/my-profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full h-screen bg-gray-100 dark:bg-neutral-800",
        "max-w-full mx-auto border border-neutral-200 dark:border-neutral-700" 
      )}
    >
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-6">
              {links.map((link, idx) => (
                <div key={idx}>
                  <SidebarLink link={link} />
                </div>
              ))}
            <button
              className="flex"
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => {
                    dispatch(logout(navigate));
                    setConfirmationModal(null);
                  },
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
            >
              
              <LuLogOut className="text-neutral-700 group dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            </button>
            </div>
          </div>
        </SidebarBody>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 w-full h-full overflow-auto">
        <Dashboard />
      </div>
    </div>
  );
}

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex-1 min-h-screen overflow-hidden">
      <div className="md: rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-200 flex flex-col gap-2 flex-1 w-full h-full">
      {/* <BackgroundBeams /> */}
        <div className="flex gap-2">
          <Outlet />
          
        </div>
      </div>
    </div>
  );
};
