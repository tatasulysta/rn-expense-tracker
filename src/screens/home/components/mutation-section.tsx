import React from "react";
import { useCredential } from "../../../hooks/use-credential";
import { useRealm } from "../../../hooks/use-realm";
import { UserTypeEnum, Wallet } from "../../../store/auth.schema";
import DefaultFlatList from "../../../components/common/flat-list";
import WalletDetail from "./wallet-detail";
import SectionWrapper from "./section-wrapper";
import UserSelectInput from "../../components/user-state-select-input";
import { StyledText, StyledView } from "../../../components/common";

export default function MutationSection() {
  const realm = useRealm();
  const { credential } = useCredential();

  const isAdmin = credential?.user?.type === UserTypeEnum.Admin;
  const uid = `${credential?.user?._id}`;

  const [wallets, setWallets] = React.useState<Wallet[]>([]);
  const [userId, setUserId] = React.useState<string>(isAdmin ? "" : uid);

  React.useEffect(() => {
    if (realm.wallet) {
      const walletData = realm.wallet
        ?.objects("Wallet")
        .filtered(`userId == $0`, userId);

      const _wallets = (walletData || []) as unknown as Wallet[];
      setWallets([..._wallets]);

      const listener = () => setWallets([..._wallets]);

      walletData.addListener(listener);
      return () => walletData.removeListener(listener);
    }
  }, [realm.wallet, userId]);

  return (
    <SectionWrapper title="Latest Summary">
      {isAdmin && (
        <UserSelectInput
          value={userId}
          onChange={(value) => setUserId(value)}
          excludeAdmin
        />
      )}
      {!wallets.length && (
        <StyledText className="text-base text-center"> No Data</StyledText>
      )}

      {wallets.map((wallet) => (
        <StyledView key={wallet._id.toString()} className="mt-3">
          <WalletDetail wallet={wallet} userId={userId} />
        </StyledView>
      ))}
    </SectionWrapper>
  );
}
