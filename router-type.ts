export const HOME_SCREEN_ROUTE = "HomeScreen";
export type HOME_SCREEN_PARAMS = undefined;

export const MUTATION_SCREEN_GROUP_ROUTE = "MutationGroupScreen";
export type MUTATION_SCREEN_GROUP_PARAMS = {
  startAt: Date;
  endAt: Date;
  userId: string;
};

export const MUTATION_CREATE_SCREEN_ROUTE = "MutationCreateScreen";
export type MUTATION_CREATE_SCREEN_PARAMS = undefined;

export const MUTATION_VIEW_SCREEN_ROUTE = "MutationViewScreen";
export type MUTATION_VIEW_SCREEN_PARAMS = {
  id: string;
};

export const CATEGORY_SCREEN_ROUTE = "CategoryScreen";
export type CATEGORY_SCREEN_PARAMS = undefined;

export const PROFILE_SCREEN_ROUTE = "ProfileScreen";
export type PROFILE_SCREEN_PARAMS = undefined;

export const SIGN_UP_SCREEN_ROUTE = "SignUpScreen";
export type SIGN_UP_SCREEN_PARAMS = undefined;

export const SIGN_IN_SCREEN_ROUTE = "SignInScreen";
export type SIGN_IN_SCREEN_PARAMS = undefined;

export const CATEGORY_SCREEN_CREATE_ROUTE = "CategoryScreenCreate";
export type CATEGORY_SCREEN_CREATE_PARAMS =
  | {
      userId: string;
    }
  | undefined;

export const CATEGORY_SCREEN_VIEW_ROUTE = "CategoryScreenView";
export type CATEGORY_SCREEN_VIEW_PARAMS = {
  id: string;
};
