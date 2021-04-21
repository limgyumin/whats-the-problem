import { showMenuState } from "atom/header.atom";
import { useRecoilState } from "recoil";

const useHeader = () => {
  const [show, setShow] = useRecoilState<boolean>(showMenuState);

  const showMenuHandler = (state: boolean) => {
    setShow(state);
  };

  return {
    show,
    showMenuHandler,
  };
};

export default useHeader;
