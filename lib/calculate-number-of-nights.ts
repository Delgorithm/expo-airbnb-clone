type calculateNumberOfNightsProps = {
  start: string;
  end: string;
};

export function calculateNumberOfNights({
  start,
  end,
}: calculateNumberOfNightsProps) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
