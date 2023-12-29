"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const route = useRouter();
  const pathname = usePathname();

  let navList = [
    {
      name: "Pricing",
      href: "/",
    },
    {
      name: "Client Area",
      href: "/client",
    },
  ];

  let navList_styleNormal =
    "py-2 px-10 whitespace-nowrap text-[#52525B] transition-all";
  let navList_styleActive = " !text-white bg-[#F44336] rounded-[50px]";
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="flex flex-col items-center justify-between p-4 md:flex-row md:justify-evenly lg:justify-center">
        <a href="/" className="flex items-center gap-2 lg:absolute left-6">
          <Image
            src="/logo.png"
            alt="OpSec CloudVerse"
            width={48}
            height={48}
          />
          <span className="flex font-semibold">OpSec CloudVerse</span>
        </a>
        <div className="my-4 md:m-0 flex rounded-[50px] border-2 border-[#27272A] p-2 gap-4">
          {navList.map((nav) => (
            <a
              className={
                pathname === nav.href
                  ? navList_styleNormal + navList_styleActive
                  : navList_styleNormal
              }
              href={nav.href}
              key={nav.href}
            >
              {nav.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
