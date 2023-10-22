export const copyToClipboard = (text: string): Promise<void> => {
  if (navigator?.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  return Promise.reject(new Error("Clipboard API not supported"));
};
