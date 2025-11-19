const sanitizeGrapheme = (value: string) =>
  value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();

export const getGraphemeKey = (languageId: string, grapheme: string) => {
  const sanitized = sanitizeGrapheme(grapheme);
  return `${languageId}-${sanitized || 'unknown'}`;
};

export const getGraphemeAnchorId = (languageId: string, grapheme: string) =>
  `grapheme-${getGraphemeKey(languageId, grapheme)}`;
