import ClockLoader from "react-spinners/ClockLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#919",
};

function Spinner() {
  return (
    <div className="sweet-loading">
      <ClockLoader
        color={"#919"}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;