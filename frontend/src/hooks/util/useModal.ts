import { useCallback, useEffect, useState } from "react";

const useModal = () => {
  const [isModalMount, setIsModalMount] = useState<boolean>(false);

  const modalMountHandler = useCallback((): void => {
    setIsModalMount(!isModalMount);
  }, [isModalMount, setIsModalMount]);

  useEffect(() => {
    return () => setIsModalMount(false);
  }, [setIsModalMount]);

  return {
    isModalMount,
    modalMountHandler,
  };
};

export default useModal;
