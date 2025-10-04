"use client";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { RootState } from "@/redux/store";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.user);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-4 pl-6 py-1.5 items-center justify-center space-x-4",
        className
      )}
    >
      {navItems.map((navItem: any, idx: number) => (
        <a
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            "flex items-center space-x-2 text-neutral-50 hover:text-neutral-300 px-3 py-1 rounded-full"
          )}
        >
          
          {navItem.icon && <span className="w-5 h-5">{navItem.icon}</span>}
          <span className="text-sm">{navItem.name}</span>
        </a>
      ))}

      <button
        className="border text-sm font-medium relative border-white/[0.2] text-white px-4 py-1.5 rounded-full flex items-center space-x-2"
        onClick={() => navigate(`/profile/${userData?.userName}`)}
      >
        {userData?.profileImage && (
          <img
            src={userData.profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <span className="text-sm">{userData?.userName}</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
      </button>
    </motion.div>
  );
};
