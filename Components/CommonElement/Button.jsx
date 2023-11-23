import React from "react";
import { Button } from "reactstrap";

const Btn = (props) => {
  const { children = "" } = props;
  return <Button {...props.attrBtn} style={props.style}>{children}</Button>;
};

export default Btn;
