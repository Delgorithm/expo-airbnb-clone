type formatDateFrProps = {
  dateString: string;
};

export default function formatDateFr({ dateString }: formatDateFrProps) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
