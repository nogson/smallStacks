import sytles from "./styles.module.scss";
import { CellEventContext } from "../../pages/Calender";
import { useContext } from "react";
import { DailyActivity } from "../../types/DatabaseTypes";

type Props = {
  data: { date: Date; data: DailyActivity[] };
  month: number;
};

const CalenderCell: React.FC<Props> = ({ data, month }) => {
  const cellEvent = useContext(CellEventContext);
  const setClassName = (date: Date, month: number) => {
    const isCurrentMonth = date.getMonth() === month;
    return isCurrentMonth ? "active" : "inactive";
  };

  console.log("CalenderCell data:", data.data);

  return (
    <>
      <div
        className={`${sytles.calenderCell} ${sytles[setClassName(data.date, month)]}`}
        onClick={() => cellEvent(data.date)}
      >
        <span className={sytles.date}> {data.date.getDate()}</span>
        {data.data.map(() => (
          <>
            <span className={sytles.stack}></span>
          </>
        ))}
      </div>
    </>
  );
};

export default CalenderCell;
