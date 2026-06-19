import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
return (
     <div className="min-h-screen bg-slate-950 text-white">
         <Navbar />


  <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
    {children}
  </main>
</div>


);
}

export default Layout;
