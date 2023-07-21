export function getAfterLastSlash(inputString: string) {
  const lastSlashIndex = inputString.lastIndexOf("/");
  return inputString.substring(lastSlashIndex + 1);
}
