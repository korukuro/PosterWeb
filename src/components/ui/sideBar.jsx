"use client";

import { cn } from "../../utils/cd";
import { Link } from "react-router-dom";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

// Create a context for managing sidebar state
const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// SidebarProvider to manage open state and animation
export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Sidebar component to wrap the provider
export const Sidebar = ({ children, open, setOpen, animate }) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

// SidebarBody to render desktop and mobile versions
export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

// Desktop sidebar for larger screens
export const DesktopSidebar = ({ className, children, ...props }) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-black flex-shrink-0 mt-16",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Mobile sidebar for smaller screens
export const MobileSidebar = ({ className, children, ...props }) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      {/* Mobile Menu Button */}
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full",
          className
        )}
        {...props}
      >
        <IconMenu2
          className="text-neutral-800 dark:text-neutral-200 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-neutral-900 z-[100] flex flex-col p-4 md:hidden shadow-lg",
              className
            )}
          >
            <div
              className="absolute top-4 right-4 text-neutral-800 dark:text-neutral-200 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <IconX />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// SidebarLink for individual links
export const SidebarLink = ({ link, className, ...props }) => {
  const { open, animate } = useSidebar();

  // Check if the link has an onClick handler
  const isClickable = link.onClick;

  return (
    <div
      className={cn("flex items-center justify-start gap-2 group/sidebar py-2", className)}
      {...props}
    >
      {isClickable ? (
        <div
          onClick={link.onClick}
          className="cursor-pointer flex items-center gap-2 group"
        >
          {link.icon}
          <motion.span
            animate={{
              opacity: animate ? (open ? 1 : 0) : 1,
              display: open ? "inline-block" : "none",
            }}
            className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre"
          >
            {link.label}
          </motion.span>
        </div>
      ) : (
        <Link
          to={link.href}
          className="flex items-center justify-start gap-2 group/sidebar py-2"
        >
          {link.icon}
          <motion.span
            animate={{
              opacity: animate ? (open ? 1 : 0) : 1,
              display: open ? "inline-block" : "none",
            }}
            className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre"
          >
            {link.label}
          </motion.span>
        </Link>
      )}
    </div>
  );
};
