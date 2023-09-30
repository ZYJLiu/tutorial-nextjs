import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Spinner color="default" size="lg" />
    </div>
  );
}
