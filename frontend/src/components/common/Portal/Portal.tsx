import React from "react";
import ReactDOM from "react-dom";

type PortalProps = {
  children: React.ReactNode;
};

const Portal: React.FC<PortalProps> = ({ children }) => {
  const element = document.getElementById("modal");
  return ReactDOM.createPortal(children, element);
};

export default Portal;
