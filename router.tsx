import {
  CompositeNavigationProp,
  NavigationContainer,
  RouteProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import {
  CATEGORY_SCREEN_CREATE_PARAMS,
  CATEGORY_SCREEN_CREATE_ROUTE,
  CATEGORY_SCREEN_PARAMS,
  CATEGORY_SCREEN_ROUTE,
  CATEGORY_SCREEN_VIEW_PARAMS,
  CATEGORY_SCREEN_VIEW_ROUTE,
  HOME_SCREEN_PARAMS,
  HOME_SCREEN_ROUTE,
  MUTATION_CREATE_SCREEN_PARAMS,
  MUTATION_CREATE_SCREEN_ROUTE,
  MUTATION_SCREEN_GROUP_PARAMS,
  MUTATION_SCREEN_GROUP_ROUTE,
  MUTATION_VIEW_SCREEN_PARAMS,
  MUTATION_VIEW_SCREEN_ROUTE,
  PROFILE_SCREEN_PARAMS,
  PROFILE_SCREEN_ROUTE,
  SIGN_IN_SCREEN_PARAMS,
  SIGN_IN_SCREEN_ROUTE,
  SIGN_UP_SCREEN_PARAMS,
  SIGN_UP_SCREEN_ROUTE,
} from "./router-type";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Home from "./src/screens/home";
import MutationScreen from "./src/screens/mutation";
import { HomeIcon, UserIcon } from "./src/assets";
import ProfileScreen from "./src/screens/profile";
import { Dimensions, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BaseButton } from "./src/components/elements/button";
import { StyledText } from "./src/components/common";
import { useCredential } from "./src/hooks/use-credential";
import SignIn from "./src/screens/sign-in";
import SignUp from "./src/screens/sign-up";
import CategoryCreate from "./src/screens/category/create";
import CategoryView from "./src/screens/category/view";
import MutationCreate from "./src/screens/mutation/create";
import CategoryScreen from "./src/screens/category";
import MutationView from "./src/screens/mutation/view";
import { isEmpty } from "./src/utils/object";
import React from "react";

export type ParamsList = {
  [SIGN_IN_SCREEN_ROUTE]: SIGN_IN_SCREEN_PARAMS;
  [SIGN_UP_SCREEN_ROUTE]: SIGN_UP_SCREEN_PARAMS;

  Main: undefined;
  [HOME_SCREEN_ROUTE]: HOME_SCREEN_PARAMS;
  [CATEGORY_SCREEN_ROUTE]: CATEGORY_SCREEN_PARAMS;
  [PROFILE_SCREEN_ROUTE]: PROFILE_SCREEN_PARAMS;

  [MUTATION_SCREEN_GROUP_ROUTE]: MUTATION_SCREEN_GROUP_PARAMS;
  [MUTATION_CREATE_SCREEN_ROUTE]: MUTATION_CREATE_SCREEN_PARAMS;
  [MUTATION_VIEW_SCREEN_ROUTE]: MUTATION_VIEW_SCREEN_PARAMS;
  [CATEGORY_SCREEN_VIEW_ROUTE]: CATEGORY_SCREEN_VIEW_PARAMS;
  [CATEGORY_SCREEN_CREATE_ROUTE]: CATEGORY_SCREEN_CREATE_PARAMS;
};

const Stack = createNativeStackNavigator<ParamsList>();
const Tabs = createBottomTabNavigator<ParamsList>();

export type StackNavigationType<T extends keyof ParamsList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<ParamsList, T>,
    // BottomTabNavigationProp<TabsParamList>
    any
  >;

export interface StackNavigationScreenProps<T extends keyof ParamsList> {
  navigation: StackNavigationType<T>;
  route: RouteProp<ParamsList, T>;
}

type Tab = {
  name: keyof ParamsList;
  component: React.FC;
  label: string;
  icon: React.FC<{
    weight: "fill" | "bold";
    size: number;
  }>;
};

const TABS: Tab[] = [
  {
    name: HOME_SCREEN_ROUTE,
    component: Home,
    label: "Home",
    icon: HomeIcon,
  },
  {
    name: PROFILE_SCREEN_ROUTE,
    component: ProfileScreen,
    label: "Profile",
    icon: UserIcon,
  },
];

function Main() {
  const { height } = Dimensions.get("window");
  const NAVBAR_HEIGHT =
    Platform.OS === "android" ? height * 0.08 : height * 0.12;
  const TAB_ITEM_HEIGHT =
    Platform.OS === "android" ? NAVBAR_HEIGHT * 0.6 : NAVBAR_HEIGHT * 0.4;
  const TAB_ICON_HEIGHT = TAB_ITEM_HEIGHT * 0.5;
  const { navigate } = useNavigation();

  return (
    <Tabs.Navigator
      backBehavior="none"
      initialRouteName={HOME_SCREEN_ROUTE}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          height: NAVBAR_HEIGHT,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        },
        tabBarItemStyle: {
          display: "flex",
          height: TAB_ITEM_HEIGHT,
          alignSelf: "center",
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarButton: (props) => {
              const isFocused = !!props?.accessibilityState?.selected;

              return (
                <BaseButton
                  onPress={() => navigate(tab.name as unknown as never)}
                  className="flex-1 flex items-center justify-center"
                >
                  {tab.icon({
                    size: TAB_ICON_HEIGHT,
                    weight: isFocused ? "fill" : "bold",
                  })}
                  <StyledText
                    className={`text-base ${
                      isFocused
                        ? "font-semibold text-black"
                        : "font-medium text-neutral-600"
                    }`}
                  >
                    {tab.label}
                  </StyledText>
                </BaseButton>
              );
            },
            headerShown: false,
          }}
        />
      ))}
    </Tabs.Navigator>
  );
}
export default function Route() {
  const { credential } = useCredential();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Main"}
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isEmpty(credential?.user || ({} as any)) ? (
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen
              name={CATEGORY_SCREEN_ROUTE}
              component={CategoryScreen}
            />
            <Stack.Screen
              name={CATEGORY_SCREEN_CREATE_ROUTE}
              component={CategoryCreate}
            />
            <Stack.Screen
              name={CATEGORY_SCREEN_VIEW_ROUTE}
              component={CategoryView}
            />
            <Stack.Screen
              name={MUTATION_CREATE_SCREEN_ROUTE}
              component={MutationCreate}
            />
            <Stack.Screen
              name={MUTATION_VIEW_SCREEN_ROUTE}
              component={MutationView}
            />
            <Stack.Screen
              name={MUTATION_SCREEN_GROUP_ROUTE}
              component={MutationScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={SIGN_IN_SCREEN_ROUTE} component={SignIn} />
            <Stack.Screen name={SIGN_UP_SCREEN_ROUTE} component={SignUp} />
          </>
        )}
        {/* <Stack.Screen name={HOME_SCREEN_ROUTE} component={Home}></Stack.Screen>

        <Stack.Screen
          name={MUTATION_SCREEN_ROUTE}
          component={MutationScreen}
        ></Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
