import Realm from "realm";

//enum
export enum UserTypeEnum {
  User = "user",
  Admin = "admin",
}

export enum CategoryType {
  Global = "global",
  Personal = "personal",
}

//input
export type UserCreateInput = {
  password: string;
  email: string;
  type: UserTypeEnum;
  defaultBaseRate: string;
};

export type CategoryCreateInput = {
  user: User;
  type: CategoryType;
  label: string;
  //   mungkin ada tambah color
  color: string;
  icon: string;
};

//schema
export class User extends Realm.Object {
  _id = new Realm.BSON.ObjectId();
  type!: string;
  createdAt = new Date();
  password!: string;
  email!: string;
  defaultBaseRate!: string;

  static primaryKey = "_id";
  constructor(realm: Realm, params: UserCreateInput) {
    super(realm, {
      _id: new Realm.BSON.ObjectId(),
      ...params,
    });
  }
}

export class Category extends Realm.Object {
  _id = new Realm.BSON.ObjectId();
  type!: string;
  label!: string;
  user!: User;
  color!: string;
  icon!: string;

  static primaryKey = "_id";
  constructor(realm: Realm, params: CategoryCreateInput) {
    super(realm, { _id: new Realm.BSON.ObjectId(), ...params });
  }
}

export const userConfig = {
  schema: [User, Category],
  schemaVersion: 1,
  path: "user.realm",
};

export const categoryConfig = {
  schema: [Category],
  schemaVersion: 1,
  path: "category.realm",
};
