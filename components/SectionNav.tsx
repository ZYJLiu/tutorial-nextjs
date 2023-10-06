import { Button } from "@nextui-org/button";

interface SectionNavProps {
  currentSection: number;
  totalSections: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function SectionNav({
  currentSection,
  totalSections,
  onNext,
  onPrev,
}: SectionNavProps) {
  return (
    <div className="flex space-x-2">
      <Button isDisabled={currentSection == 1} onClick={onPrev}>
        Previous
      </Button>
      <Button isDisabled={currentSection == totalSections} onClick={onNext}>
        Next
      </Button>
    </div>
  );
}
