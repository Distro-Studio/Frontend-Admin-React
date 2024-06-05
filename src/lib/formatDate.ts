const formatDate = (dateString: string, options?: any) => {
  const shortFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(
    "id-ID",
    options === "short"
      ? shortFormat
      : options || {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }
  );

  if (dateString) {
    return formattedDate;
  } else {
    return "-";
  }
};

export default formatDate;
