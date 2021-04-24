import timeCount, { TimeCountingOption } from "time-counting";

export const getTimeCount = (date: Date) => {
  const option: TimeCountingOption = {
    lang: "ko",
    calculate: {
      justNow: 3601,
    },
  };

  return timeCount(date, option);
};
