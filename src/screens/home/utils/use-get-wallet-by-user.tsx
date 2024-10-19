import React from "react";
import { useCredential } from "../../../hooks/use-credential";
import { useRealm } from "../../../hooks/use-realm";
import { Wallet } from "../../../store/auth.schema";

export default function useGetWalletByUser() {
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
  return { wallets };
}
