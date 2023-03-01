import React, { ReactElement } from "react";
function Separator(props: any) {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        transform: `rotate(${props.turns}turn)`,
      }}
    >
      <div style={props.style} />
    </div>
  );
}
function RadialSeparators(props: any) {
  const turns = 1 / props.count;
  const rangeArray = [...Array(props.count).keys()];
  return (
    <>
      {rangeArray.map((index: any) => (
        <Separator turns={index * turns} style={props.style} key={index} />
      ))}
    </>
  );
}

export default RadialSeparators;
