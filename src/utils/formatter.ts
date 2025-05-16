export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatNumberThousand = (count: number): string => {
  if (count >= 1000000) {
    const millions = count / 1000000;
    return (
      (Number.isInteger(millions)
        ? millions.toString()
        : millions.toFixed(1)) + "m"
    );
  } else if (count >= 1000) {
    const thousands = count / 1000;
    return (
      (Number.isInteger(thousands)
        ? thousands.toString()
        : thousands.toFixed(1)) + "k"
    );
  } else {
    return count.toString();
  }
};

export const formatRuntime = (minutes: number | null) => {
  if (!minutes) return "Unknown";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};
