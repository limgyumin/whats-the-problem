import { useCallback, useEffect, useState } from "react";

const useModal = () => {
  const [isModalMount, setIsModalMount] = useState<boolean>(false);

  const modalMountHandler = useCallback((): void => {
    setIsModalMount(!isModalMount);
  }, [isModalMount, setIsModalMount]);

  useEffect(() => {
    isModalMount
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalMount]);

  useEffect(() => {
    return () => setIsModalMount(false);
  }, [setIsModalMount]);

  return {
    isModalMount,
    modalMountHandler,
  };
};

export default useModal;
