import React from "react";
import { StyledText, StyledView } from "../components/common";
import { useRealm } from "../hooks/use-realm";
import { useCredential } from "../hooks/use-credential";
import Button from "../components/elements/button";
import { useNavigation } from "../hooks/use-navigation";
import { SIGN_IN_SCREEN_ROUTE } from "../../router-type";

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
    <StyledView>
      <StyledText>hehe</StyledText>
      <Button onPress={() => deleteUserById()} className="text-white">
        Delete sMe
      </Button>
    </StyledView>
  );
}
