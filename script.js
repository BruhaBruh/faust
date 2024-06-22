window.addEventListener("DOMContentLoaded", () => {
  const comeback = document.querySelector("#comeback");
  const time = document.querySelector("#time");

  const leaveTime = 1688785200000;
  const returnTime = 1729051200000;

  const rtf = new Intl.RelativeTimeFormat("ru", { style: "long" });

  const handleTime = ({ days, hours, minutes, seconds }) => {
    const day = rtf.formatToParts(days, "day");
    const hour = rtf.formatToParts(hours, "hour");
    const minute = rtf.formatToParts(minutes, "minute");
    const second = rtf.formatToParts(seconds, "second");

    let result = "";
    if (days > 0) {
      result = `${day[1].value}${day[2].value} `;
    }

    result += hour[1].value.padStart(2, "0") + ":";
    result += minute[1].value.padStart(2, "0") + ":";
    result += second[1].value.padStart(2, "0");

    time.textContent = result;
  };

  const handleReturned = () => {
    comeback.classList.add("highlight");
    comeback.textContent = "уже вернулся";
    time.remove();
  };

  const i = setInterval(() => {
    const currentTime = Date.now();
    if (currentTime < leaveTime) {
      const timeLeft = leaveTime - currentTime;
      comeback.textContent = "уедет через";
      handleTime({
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
      });
    } else if (currentTime < returnTime) {
      const timeLeft = returnTime - currentTime;
      comeback.textContent = "вернется через";
      handleTime({
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
      });
    } else {
      handleReturned();
      clearInterval(i);
    }
  }, 1000);
});
