import React, { useEffect, useState } from "react";
import usePrevious from "hooks/util/usePrevious";

type DelayUnmountProps = {
  component: React.FC;
  isMount: boolean;
  delay: number;
  mountHandler: () => void;
};

const DelayUnmount: React.FC<DelayUnmountProps> = ({
  component: Component,
  delay,
  ...props
}) => {
  const { isMount } = props;

  const [shouldRender, setShouldRender] = useState<boolean>(false);

  const prevIsMount = usePrevious<boolean>(isMount);

  useEffect(() => {
    if (prevIsMount && !isMount) {
      setTimeout(() => {
        setShouldRender(false);
      }, delay);
    } else if (!prevIsMount && isMount) {
      setShouldRender(true);
    }
  }, [prevIsMount, isMount, delay, setShouldRender]);

  return shouldRender ? <Component {...props} /> : null;
};

export default DelayUnmount;
