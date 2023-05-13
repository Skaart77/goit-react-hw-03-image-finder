import { ThreeCircles } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="Loader-wrapper">
      <ThreeCircles
        height="100"
        width="100"
        color="#439bde"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}

export default Loader;
