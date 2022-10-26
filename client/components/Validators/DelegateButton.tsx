import { useRouter } from "next/router";
import styled from "styled-components";
import { useAppSelector } from "../../lib/hooks";

function DelegateButton({ className }) {
  const darkMode = useAppSelector((state) => state.general.darkMode);
  const router = useRouter();

  return (
    <Deleagtion
      className={`${className} ${darkMode ? "dark-mode" : ""} connect-wallet`}
      onClick={() => router.push("https://wallet.keplr.app/")}
    >
      Delegate
    </Deleagtion>
  );
}

const Deleagtion = styled.button`
  width: 100px;
  height: 30px;
  border: 1px solid #37458d;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  color: #37458d;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  background: none;
  &:hover {
    background: #37458d;
    color: white;
  }
  &.dark-mode {
    border-color: #fff !important;
    box-shadow: 0px -1px 20px 0px #23232329 !important;
    color: white;
  }
`;

export default DelegateButton;
