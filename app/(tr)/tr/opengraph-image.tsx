import { messages } from "@/content/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = messages.tr.meta.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    kicker: "Portfolyo",
    title: "Fatih Genç",
    subtitle: messages.tr.meta.ogDescription,
  });
}
