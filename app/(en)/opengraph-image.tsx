import { messages } from "@/content/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = messages.en.meta.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({
    kicker: "Portfolio",
    title: "Fatih Genç",
    subtitle: messages.en.meta.ogDescription,
  });
}
