export const formatDate = (date: Date) => {
  try {
    return date.toLocaleDateString("en-gb", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return date.toString();
  }
};
