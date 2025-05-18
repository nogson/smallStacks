import sytles from "./styles.module.scss";

type Props = {
  date: Date;
  month: number;
};

const CalenderCell: React.FC<Props> = ({ date, month }) => {
  const setClassName = (date: Date, month: number) => {
    const isCurrentMonth = date.getMonth() === month;

    return isCurrentMonth ? "active" : "inactive";
  };

  return (
    <>
      <span
        className={`${sytles.calenderCell} ${sytles[setClassName(date, month)]}`}
        onClick={() => {
          console.log("Clicked date:", date);
        }}
      >
        {date.getDate()}
      </span>
    </>
  );
};

export default CalenderCell;
