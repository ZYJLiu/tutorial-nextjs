import type { MDXComponents } from "mdx/types";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import CustomCard from "./components/CustomCard";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "10px" }}>{children}</h1>,
    // h1: H1,
    ...components,
    CustomCard,
  };
}

// function H1({
//   children,
// }: React.DetailedHTMLProps<
//   React.HTMLAttributes<HTMLHeadingElement>,
//   HTMLHeadingElement
// >) {
//   return (
//     <h1 style={{ fontSize: "10px" }}>
//       <Card>
//         <CardBody>
//           <p>{children}</p>
//         </CardBody>
//       </Card>
//     </h1>
//   );
// }
