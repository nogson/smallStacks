import styles from "./styles.module.scss";
import { getDatesInMonth } from "../../utils/calender.ts";
import CalenderCell from "../CalenderCell";
import { useEffect, useState } from "react";

type Props = {
  date: Date;
};

const CalenderItem: React.FC<Props> = ({ date }) => {
  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    const year = Number(date.getFullYear());
    const month = Number(date.getMonth());
    setDates(getDatesInMonth(year, month));
  }, [date]);

  return (
    <>
      <div className={styles.calender}>
        <div className="calenderBody">
          <ul className="week">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <div className="days">
            {dates.map((d) => (
              <CalenderCell
                key={d.toISOString()}
                month={Number(date.getMonth())}
                date={d}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CalenderItem;
