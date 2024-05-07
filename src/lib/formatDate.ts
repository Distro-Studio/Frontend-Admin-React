const formatDate = (dateString: string, options?: any) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(
    "id-ID",
    options || {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return formattedDate;
};

export default formatDate;
