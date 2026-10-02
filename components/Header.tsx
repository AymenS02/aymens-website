// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const Header = () => {
//   const router = useRouter();

//   const handleClick = () => {
//     if (window.location.pathname === "/") {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     } else {
//       router.push("/");
//     }
//   };

//   return (
//     <header className="bg-transparent p-10 fixed top-0 z-50">
//       <Image
//         src="/1.png"
//         alt="Logo"
//         width={100}
//         height={100}
//         onClick={handleClick}
//         className="cursor-pointer hover:scale-110 transition duration-300"
//       />
//     </header>
//   );
// };

// export default Header;



// "use client"

// import React from "react";
// import Image from "next/image";

// const Header = () => {
//   return (
//     <header className="bg-transparent p-10 fixed top-0 z-50">
//       <Image
//         src="/1.png"
//         alt="Logo"
//         width={100}
//         height={100}
//         onClick={() => (window.location.href = "/")}
//         className="cursor-pointer hover:scale-110 transition duration-300"
//       />
//     </header>
//   );
// };

// export default Header;