import React, { useMemo, useRef } from "react";
import Drawer, { DrawerHandler } from "../components/common/drawer";

const DrawerContext = React.createContext<DrawerHandler | undefined>(undefined);

export function DrawerProvider(props: React.PropsWithChildren) {
  const DrawerRef = useRef<DrawerHandler>(null);
  const action = useMemo(
    () => ({
      showCustom(customOption: any) {
        if (DrawerRef.current) {
          DrawerRef.current.showCustom(customOption);
        }
      },
    }),
    [],
  );
  return (
    <>
      <DrawerContext.Provider value={action}>
        {props.children}
      </DrawerContext.Provider>
      <Drawer ref={DrawerRef} />
    </>
  );
}

export default function useDrawer() {
  const context = React.useContext(DrawerContext);
  return context;
}
