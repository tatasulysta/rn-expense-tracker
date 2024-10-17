import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  CATEGORY_SCREEN_PARAMS,
  CATEGORY_SCREEN_ROUTE,
  HOME_SCREEN_PARAMS,
  HOME_SCREEN_ROUTE,
  MUTATION_SCREEN_PARAMS,
  MUTATION_SCREEN_ROUTE,
  PROFILE_SCREEN_PARAMS,
  PROFILE_SCREEN_ROUTE,
} from "./router-type";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/home";
import MutationScreen from "./src/screens/add-spend";
import { HomeIcon, MutationIcon, UserIcon } from "./src/assets";
import ProfileScreen from "./src/screens/profile";
import { Dimensions, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BaseButton } from "./src/components/elements/button";
import { StyledText } from "./src/components/common";
export type ParamsList = {
  Main: undefined;

  [HOME_SCREEN_ROUTE]: HOME_SCREEN_PARAMS;
  [CATEGORY_SCREEN_ROUTE]: CATEGORY_SCREEN_PARAMS;
  [MUTATION_SCREEN_ROUTE]: MUTATION_SCREEN_PARAMS;
  [PROFILE_SCREEN_ROUTE]: PROFILE_SCREEN_PARAMS;
};

const Stack = createNativeStackNavigator<ParamsList>();
const Tabs = createBottomTabNavigator<ParamsList>();

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
    name: MUTATION_SCREEN_ROUTE,
    component: MutationScreen,
    label: "Mutation",
    icon: MutationIcon,
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
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Main"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={Main} />
        {/* <Stack.Screen name={HOME_SCREEN_ROUTE} component={Home}></Stack.Screen>

        <Stack.Screen
          name={MUTATION_SCREEN_ROUTE}
          component={MutationScreen}
        ></Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
