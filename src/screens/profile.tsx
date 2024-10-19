import React from "react";
import { StyledText, StyledView } from "../components/common";
import { useRealm } from "../hooks/use-realm";
import { useCredential } from "../hooks/use-credential";
import Button from "../components/elements/button";
import { useNavigation } from "../hooks/use-navigation";
import { SIGN_IN_SCREEN_ROUTE } from "../../router-type";
import DefaultLayout from "../components/layout/default-layout";

export default function ProfileScreen() {
  const { user } = useRealm();
  const { credential, setCredential } = useCredential();
  const { navigate } = useNavigation();

  const deleteUserById = () => {
    user?.write(() => {
      const userToDelete = user.objectForPrimaryKey(
        "User",
        credential?.user?._id,
      );

      if (userToDelete) {
        user.delete(userToDelete);
        setCredential({ user: undefined });
        navigate(SIGN_IN_SCREEN_ROUTE);

        console.log("User deleted successfully.");
      } else {
        console.log("User not found.");
      }
    });
  };
  return (
    <DefaultLayout className=" gap-2 ">
      <Button onPress={() => deleteUserById()}>Delete Me</Button>
      <Button onPress={() => setCredential({ user: undefined })}>
        Sign Out
      </Button>
    </DefaultLayout>
  );
}
