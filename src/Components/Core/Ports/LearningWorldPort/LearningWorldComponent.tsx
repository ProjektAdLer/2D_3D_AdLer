import React from "react";
export default function LearningWorldComponent(props: any) {
  return (
    <React.Fragment>
      <div>
        {props.worldNameLoading ? "Weltname wird geladen ..." : props.worldName}
      </div>
    </React.Fragment>
  );
}
