export const getDatesInMonth = (year: number, month: number): Date[] => {
  const dates: Date[] = [];
  const firstDay = new Date(year, month, 1); // 月の初日
  const lastDay = new Date(year, month + 1, 0); // 月の最終日
  const firstDayOfWeek = firstDay.getDay(); // 月の初日の曜日
  for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
    dates.push(new Date(day)); // 日付を配列に追加
  }

  dates.unshift(
    ...Array.from({ length: firstDayOfWeek }, (_, i) => {
      const date = new Date(year, month, -(firstDayOfWeek - i - 1));
      return date;
    })
  ); // 月の初日までの空白を追加

  return dates;
};

export const getDateInNextMonth = (date: Date, month: number): Date => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + month);

  return d;
};
