import React, { useState } from "react";
import styled from "styled-components";
import { toggleSidebar } from "../../../../lib/features/generalSlice";

import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
  coin,
  MsgDelegateEncodeObject,
  SigningStargateClient,
  calculateFee,
  assertIsDeliverTxSuccess,
  GasPrice,
} from "@cosmjs/stargate";

async function ConnectWallet(props) {
  const { asset62, asset72, outlineMediaShuffle, className } = props;
  const [open, setOpen] = useState(false)

  // Wallet
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
  "enlist hip relief stomach skate base shallow young switch frequent cry park",
);
const [{ address: signerAddress }] = await wallet.getAccounts();
console.log("Signer address:", signerAddress);

// Network config
const rpcEndpoint = "ws://localhost:26658";
const gasPrice = GasPrice.fromString("0.025ucosm");

// Setup client
const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

// Send delegate transaction
const msg: MsgDelegateEncodeObject = {
  typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
  value: {
    delegatorAddress: signerAddress,
    // To get the proper validator address, start the demo chain (./scripts/simapp44/start.sh), then run:
    //   curl http://localhost:1318/staking/validators | jq '.result[0].operator_address'
    validatorAddress: "cosmosvaloper1urk9gy7cfws0ak9x5nu7lx4un9n6gqkrp230jk",
    amount: coin(300000, "ustake"),
  },
};
const fee = calculateFee(180_000, gasPrice);
const memo = "Use your power wisely";

const chainId = await client.getChainId();
console.log("Connected to chain:", chainId);

const result = await client.signAndBroadcast(signerAddress, [msg], fee, memo);
console.log("Broadcast result:", result);

assertIsDeliverTxSuccess(result);
console.log("Successfully broadcasted:", result);

client.disconnect();


  return (
    <ConnectWallet1 onClick={() => props.toggle(true)} className={`connect-wallet ${className || ""}`}>
      <Flex>
        <Asset62 className="asset-6-2" src={asset62} />
        <Asset72 className="asset-7-2" src={asset72} />
      </Flex>
      <OutlineMediaShuffle className="outline-media-shuffle" src={outlineMediaShuffle} />
    </ConnectWallet1>
  );
}

const Flex = styled.div`
  display: flex;
  align-items:center;
`;

const ConnectWallet1 = styled.div`
  height: 50px;
  display: flex;
  padding: 5px 19px;
  justify-content: space-between;
  background-color: var(--white);
  align-items: center;
  border-radius: 59px;
  box-shadow: 0px 7px 30px #0015da29;
  width: 200px;
    @media screen and (max-width: 775px){
    display: none;
  }

  &.connect-wallet.connect-wallet-1 {
    padding: unset;
    justify-content: unset;
    align-items: unset;
  }
  &.mobile{
     @media screen and (max-width: 775px){
      display: none;
    }
  }
`;

const Asset62 = styled.img`
  width: 30px;
  margin-bottom: 1px;
  object-fit: cover;
`;

const Asset72 = styled.img`
  width: 45px;
  margin-bottom: 1px;
  object-fit: cover;
`;

const OutlineMediaShuffle = styled.img`
  width: 40px;
  align-self: flex-start;
`;

const Asset621 = styled.img`
  .connect-wallet.connect-wallet-1 & {
    margin-top: 14px;
    width: 36.5625px;
    margin-bottom: unset;
  }
`;

const Asset721 = styled.img`
  .connect-wallet.connect-wallet-1 & {
    margin-top: 19px;
    width: 56.1044921875px;
    margin-left: 14.5px;
    margin-bottom: unset;
  }
`;

const OutlineMediaShuffle1 = styled.img`
  .connect-wallet.connect-wallet-1 & {
    margin-top: 5px;
    align-self: unset;
  }
`;

export default ConnectWallet;
