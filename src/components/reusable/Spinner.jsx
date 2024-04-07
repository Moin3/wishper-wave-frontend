import ClockLoader from "react-spinners/ClockLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#5d809c",
};

function Spinner() {
  return (
    <div className="sweet-loading">
      <ClockLoader
        color={"#5d809c"}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;