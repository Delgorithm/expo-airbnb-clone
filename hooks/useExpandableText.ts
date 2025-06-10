import { useState } from "react";

export function useExpandableText(fullText: string, limit = 160) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedText = isExpanded
    ? fullText
    : fullText.length > limit
      ? fullText.substring(0, limit).trim() + "..."
      : fullText;

  return {
    isExpanded,
    toggleExpanded: () => setIsExpanded((prev) => !prev),
    displayedText,
  };
}
