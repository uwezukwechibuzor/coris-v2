import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import {
  setChain,
  toggleConnectWalletModal,
} from "../../../../lib/features/generalSlice";
import { useAppSelector } from "../../../../lib/hooks";

const Chain = ({ chainName, chainImage, chain_id }) => {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(
      setChain({
        name: chainName,
        image: chainImage,
        id: chain_id,
      })
    );
    dispatch(toggleConnectWalletModal(false));
    router.push(`/${chain_id}/`);
  };
  return (
    <GridItem
      className={darkMode ? "dark-mode" : ""}
      onClick={() => handleClick()}
    >
      <img src={chainImage} alt="" width={45} />
      <a className="ml-3">{chainName}</a>
    </GridItem>
  );
};

const GridItem = styled.div`
  border-radius: 10px;
  background: #f5f5f5;
  padding: 5px;
  &.dark-mode {
    background: #100f1e;
  }
`;

export default Chain;
