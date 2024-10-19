import React from "react";
import { useRealm } from "../../hooks/use-realm";
import { useCredential } from "../../hooks/use-credential";
import { Wallet } from "../../store/auth.schema";
import { StyledText, StyledView } from "../../components/common";
import DefaultLayout from "../../components/layout/default-layout";
import DefaultScrollView from "../../components/common/scroll-view";
import WalletDetail from "./components/wallet-detail";
import { BaseButton } from "../../components/elements/button";
import { AddIcon, PencilIcon } from "../../assets";
import { useNavigation } from "../../hooks/use-navigation";
import { MUTATION_CREATE_SCREEN_ROUTE } from "../../../router-type";
import Header from "../../components/widgets/header";

export default function Home() {
  const realm = useRealm();
  const { credential } = useCredential();
  const { navigate } = useNavigation();
  const wallets =
    (realm.wallet
      ?.objects("Wallet")
      .filtered(
        `userId == $0`,
        `${credential?.user?._id}`,
      ) as unknown as Wallet[]) || [];

  return (
    <DefaultLayout className="relative">
      <BaseButton
        onPress={() => navigate(MUTATION_CREATE_SCREEN_ROUTE)}
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "center",
          width: 70,
          position: "absolute",
          bottom: 10,
          height: 70,
          backgroundColor: "black",
          borderRadius: 100,
          right: 10,
        }}
      >
        <PencilIcon size={40} color="white" />
      </BaseButton>
      <DefaultScrollView className="flex-grow-0">
        {wallets?.map((wallet, index) => (
          <WalletDetail wallet={wallet} key={index} />
        ))}
      </DefaultScrollView>
    </DefaultLayout>
  );
}
