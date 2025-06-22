// In ./sidebar.tsx
"use client";
import { menuItems } from "@/config/routes.config";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/lib/features/auth/authSlice";
import { sidebarRef } from "@/lib/refs";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export interface SidebarProps {
  isDesktop?: boolean;
  isSidebarOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isDesktop = true,
  isSidebarOpen = false,
}) => {
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Scrollable Menu */}
      <div className="flex-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-track-gray-700 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.title}>
            {item.submenu ? (
              <>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className="flex justify-between items-center w-full p-2 rounded hover:bg-orange-400 hover:text-white text-gray-600 dark:text-white"
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                  </div>
                  {openMenus.includes(item.title) ? <FaCaretUp /> : <FaCaretDown />}
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openMenus.includes(item.title) ? "auto" : 0,
                    opacity: openMenus.includes(item.title) ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <ul className="pl-6 space-y-1 mt-1">
                    {item.submenu.map((sub) => (
                      <li key={sub.title}>
                        <Link
                          href={sub.path}
                          onClick={isDesktop ? undefined : () => {}}
                          className="block px-2 py-1 rounded text-gray-600 dark:text-white hover:bg-orange-400 hover:text-white"
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </>
            ) : (
              <Link
                href={item.path!}
                onClick={isDesktop ? undefined : () => {}}
                className="flex items-center gap-2 px-2 py-2 rounded text-gray-600 dark:text-white hover:bg-orange-400 hover:text-white"
              >
                {item.icon && <item.icon className="size-4" />}
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 p-2 rounded font-medium text-gray-600 dark:text-white hover:bg-red-500 hover:text-white"
        >
          <MdLogout className="size-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  const sidebarClasses = "h-full w-64 bg-white dark:bg-gray-700";

  return isDesktop ? (
    <aside ref={sidebarRef} className={sidebarClasses}>
      {SidebarContent()}
    </aside>
  ) : (
    isSidebarOpen && (
      <motion.aside
        ref={sidebarRef}
        className={sidebarClasses}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{
          type: "tween",
          ease: [0.25, 0.1, 0.25, 1],
          duration: 0.5,
        }}
      >
        {SidebarContent()}
      </motion.aside>
    )
  );
};