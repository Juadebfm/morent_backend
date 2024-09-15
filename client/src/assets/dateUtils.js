export function getCurrentDate() {
  const now = new Date();
  const options = { year: "numeric" };
  return now.toLocaleDateString("en-US", options);
}
