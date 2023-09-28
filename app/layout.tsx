import "@/styles/globals.css";
import type { Metadata } from "next";
import { Provider } from "./provider";
import { Nav } from "@/components/Navbar";
import Loading from "./loading";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      {/* <body className="flex flex-col h-screen overflow-hidden"> */}
      <body suppressHydrationWarning={true}>
        <Provider>
          <Nav />
          {/* loading not working as expected */}
          <Suspense fallback={<Loading />}>
            <div className="flex-1 overflow-hidden">{children}</div>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
