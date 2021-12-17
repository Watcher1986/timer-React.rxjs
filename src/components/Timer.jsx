const Timer = ({ hours, minutes, seconds }) => {
  return (
    <>
      <span>{hours}: </span>
      <span>{minutes}: </span>
      <span>{seconds}</span>
    </>
  );
};

export default Timer;
