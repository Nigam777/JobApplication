const validDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const formatDate = (dateString) => {
  const now = new Date();
  const postDate = new Date(dateString);
  const diff = now.getTime() - postDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  return `${months} month${months !== 1 ? "s" : ""} ago`;
};
function openBase64PDFInNewTab(base64String) {
  try {
    const base64Data = base64String.split(",")[1]; // Strip prefix if present
    const byteCharacters = atob(base64Data);
    const byteArray = new Uint8Array([...byteCharacters].map(c => c.charCodeAt(0)));
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const blobURL = URL.createObjectURL(blob);
    window.open(blobURL, "_blank");
  } catch (error) {
    console.error("Failed to open PDF:", error);
  }
}

export { validDate, getBase64, formatDate , openBase64PDFInNewTab};
