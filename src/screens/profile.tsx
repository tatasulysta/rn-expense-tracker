import React from "react";
import { StyledText, StyledView } from "../components/common";
import { useRealm } from "../hooks/use-realm";
import { useCredential } from "../hooks/use-credential";
import Button from "../components/elements/button";
import { useNavigation } from "../hooks/use-navigation";
import { SIGN_IN_SCREEN_ROUTE } from "../../router-type";
import DefaultLayout from "../components/layout/default-layout";
import TextInfo from "../components/common/text-info";
import { toast } from "../utils/notification";
import Header from "../components/widgets/header";

export default function ProfileScreen() {
  const { user, category, wallet, mutation } = useRealm();
  const { credential, setCredential } = useCredential();
  const { navigate } = useNavigation();

  const deleteUserById = () => {
    user?.write(() => {
      const uid = credential?.user?._id;
      const userToDelete = user.objectForPrimaryKey("User", uid);

      if (userToDelete) {
        user.delete(userToDelete);
        setCredential(undefined);
        navigate(SIGN_IN_SCREEN_ROUTE);
        category?.write(() => {
          category?.delete(
            category
              ?.objects("Category")
              .filtered(`userId == $0`, uid?.toString()),
          );
        });
        wallet?.write(() => {
          wallet?.delete(
            wallet?.objects("Wallet").filtered(`userId == $0`, uid?.toString()),
          );
        });
        mutation?.write(() => {
          mutation?.delete(
            mutation
              ?.objects("Mutation")
              .filtered(`userId == $0`, uid?.toString()),
          );
        });
        toast.success("User deleted successfully.");
      } else {
        toast.error("User not found");
      }
    });
  };
  return (
    <DefaultLayout
      className=" gap-2 "
      header={<Header back={false} title="Profile" />}
    >
      <StyledView className="mb-5 flex-1">
        <StyledText className="text-xl text-center">
          You currently logged in as
        </StyledText>
        <StyledText className="text-lg text-center">
          {credential?.user?.email}
        </StyledText>
      </StyledView>
      <StyledView className="gap-y-4">
        <Button onPress={() => setCredential(undefined)}>Sign Out</Button>
        <StyledView>
          <Button variant="outlined" onPress={() => deleteUserById()}>
            Delete My Account
          </Button>
          <TextInfo>
            Deleting your account will wipe all the mutation data
          </TextInfo>
        </StyledView>
      </StyledView>
    </DefaultLayout>
  );
}
