import CalenderItem from "../../components/CalenderItem";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { getDateInNextMonth } from "../../utils/calender";
import Result from "../../components/Result";

const Calender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(11); // 現在のスライドのインデックス
  const [headerTitle, setHeaderTitle] = useState("");
  const [displayDates, setDisplayDates] = useState<Date[]>([]);
  const maxIndex = 11; // スライドの最大インデックス

  const getHeaderTitle = () => {
    const displayDate = displayDates[currentIndex];
    if (!displayDate) return "";
    const month = displayDate.toLocaleString("en-US", { month: "long" });
    const year = displayDate.getFullYear();
    return `${month} ${year}`;
  };

  const getCalenderItem = (date: Date) => {
    const items = [];
    for (let i = -maxIndex; i <= 0; i++) {
      items.push(getDateInNextMonth(date, i));
    }
    return items;
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => (prevIndex -= 1));
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => (prevIndex += 1));
    }
  };

  useEffect(() => {
    setDisplayDates(getCalenderItem(currentDate));
  }, [currentIndex]);

  useEffect(() => {
    if (displayDates.length === 0) return;
    setHeaderTitle(getHeaderTitle());
  }, [displayDates]);

  return (
    <>
      <div className={styles.calenderContainer}>
        <div className={styles.result}>
          <Result />
        </div>
        <div className={styles.calenderHeader}>
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            <LuChevronLeft />
          </button>
          <div>{headerTitle}</div>
          <button onClick={handleNext} disabled={currentIndex === maxIndex}>
            <LuChevronRight />
          </button>
        </div>
        <div className={styles.calender}>
          <div
            className={styles.sliderContent}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`, // スライドを切り替える
            }}
          >
            {displayDates.map((item, index) => (
              <div key={index} className={styles.slide}>
                {<CalenderItem date={item} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
