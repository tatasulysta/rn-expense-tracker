import React from "react";
import Button from "../../../../components/elements/button";
import { useRealm } from "../../../../hooks/use-realm";
import { useCredential } from "../../../../hooks/use-credential";
import { Wallet } from "../../../../store/auth.schema";

import SectionWrapper from "../section-wrapper";
import GraphMonth from "./pie-chart";
import SpendingChart from "./spending-chart";

export default function GraphSection() {
  const realm = useRealm();
  const { credential } = useCredential();
  const [wallets, setWallets] = React.useState<Wallet[]>([]);
  const uid = `${credential?.user?._id}`;

  React.useEffect(() => {
    if (realm.wallet) {
      const walletData = realm.wallet
        ?.objects("Wallet")
        .filtered(`userId == $0`, uid);

      const _wallets = (walletData || []) as unknown as Wallet[];
      setWallets([..._wallets]);

      const listener = () => setWallets([..._wallets]);

      walletData.addListener(listener);
      return () => walletData.removeListener(listener);
    }
  }, [realm.wallet]);

  return (
    <>
      <SectionWrapper title="Expense Analytics">
        <SpendingChart />
      </SectionWrapper>
      <SectionWrapper title="Category Analytics">
        <GraphMonth />
      </SectionWrapper>
    </>
  );
}
