import { Badge } from "@/components/ui/badge";
import { stackList } from "@/content/site";

/** "A, B, C." -> list of badges */
export default function TechBadges({ list, label }: { list: string; label?: string }) {
  return (
    <ul className="tech-list" aria-label={label}>
      {stackList(list).map((item) => (
        <li key={item}>
          <Badge variant="outline" className="tech-badge">
            {item}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
