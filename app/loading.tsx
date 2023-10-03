import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <Spinner color="default" size="lg" />
    </div>
  );
}
