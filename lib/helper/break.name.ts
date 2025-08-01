export function breakName(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/) // split by any number of spaces
    .map(word => word[0].toUpperCase()) // take first letter and capitalize
    .join("");
}
