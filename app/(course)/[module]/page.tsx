import LessonSelect from "@/components/LessonSelect";

// placeholder
export function generateStaticParams() {
  return [{ module: "1" }, { module: "2" }, { module: "3" }];
}

interface ModuleProps {
  params: {
    module: string;
  };
}

// Dynamic route to display the module page, with list of links to lesson page
export default function Module({ params }: ModuleProps) {
  return <LessonSelect module={params.module} />;
}
