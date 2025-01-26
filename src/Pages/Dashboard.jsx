import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sideBar";
import { IconBrandTabler, IconSettings } from "@tabler/icons-react";
import { cn } from "../utils/cd";
import { Outlet, useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { useDispatch } from "react-redux";
import { logout } from "../services/operations/authAPI";
import { LuLogOut } from "react-icons/lu";
import { motion } from "framer-motion";

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
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      icon: (
        <LuLogOut className="text-neutral-700 group dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => {
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
        });
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className={cn(
        "flex flex-col md:flex-row w-full h-screen bg-gray-100 dark:bg-neutral-800",
        "max-w-full mx-auto border border-neutral-200 dark:border-neutral-700"
      )}
    >
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
        transition={{ duration: 0.8 }}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 flex flex-col gap-6"
              >
                {links.map((link, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <SidebarLink link={link} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </SidebarBody>
          {confirmationModal && (
            <ConfirmationModal modalData={confirmationModal} />
          )}
        </Sidebar>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 w-full h-full overflow-auto"
      >
        <Dashboard />
      </motion.div>
    </motion.div>
  );
}

export const LogoIcon = () => {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </motion.a>
  );
};

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-1 bg-black mt-20"
    >
      <div className="md:rounded-tl-2xl bg-white dark:bg-neutral-200 flex flex-col gap-2 flex-1 h-auto">
        <div className="flex gap-2 h-auto">
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};
