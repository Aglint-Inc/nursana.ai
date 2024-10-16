export const capitalize = (str: string) => {
  return (
    (str ?? "").trim().charAt(0).toUpperCase() + str.substring(1)
  ).replaceAll("_", " ");
};
