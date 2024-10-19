import React from "react";
import { useCredential } from "../../../hooks/use-credential";
import { useRealm } from "../../../hooks/use-realm";
import { Wallet } from "../../../store/auth.schema";
import DefaultFlatList from "../../../components/common/flat-list";
import WalletDetail from "./wallet-detail";
import SectionWrapper from "./section-wrapper";

export default function MutationSection() {
  const realm = useRealm();
  const { credential } = useCredential();
  const [wallets, setWallets] = React.useState<Wallet[]>([]);

  React.useEffect(() => {
    if (realm.wallet) {
      const walletData = realm.wallet
        ?.objects("Wallet")
        .filtered(`userId == $0`, `${credential?.user?._id}`);

      const _wallets = (walletData || []) as unknown as Wallet[];
      setWallets([..._wallets]);

      const listener = () => setWallets([..._wallets]);

      walletData.addListener(listener);
      return () => walletData.removeListener(listener);
    }
  }, [realm.wallet]);

  return (
    <SectionWrapper title="Latest Summary">
      <DefaultFlatList
        data={wallets}
        contentContainerStyle={{
          gap: 20,
        }}
        renderItem={({ item }) => (
          <WalletDetail wallet={item} key={`${item._id}`} />
        )}
        keyExtractor={(item) => item}
      />
    </SectionWrapper>
  );
}
