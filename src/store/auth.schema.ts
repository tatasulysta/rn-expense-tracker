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

export enum MutationType {
  Income = "Income",
  Expense = "Expense",
}

//input
export type UserCreateInput = {
  password: string;
  email: string;
  type: UserTypeEnum;
  defaultBaseRate: string;
};

export type WalletCreateInput = {
  date: Date;
  balance: number;
  userId: string;
};

export type CategoryCreateInput = {
  type: CategoryType;
  label: string;
  userId: string;
  color: string;
  icon: string;
};

export type MutationCreateInput = {
  type: MutationType;
  transactionAt: Date;
  userId: string;
  categoryId: string;
  description?: string;
  rate: number;
  rateFrom: string;
  rateTo: string;
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

export class Wallet extends Realm.Object {
  _id = new Realm.BSON.ObjectId();
  balance!: number;
  createdAt = new Date();
  userId!: string;

  static primaryKey = "_id";
  constructor(realm: Realm, params: WalletCreateInput) {
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
  color!: string;
  icon!: string;
  userId!: string;

  static primaryKey = "_id";
  constructor(realm: Realm, params: CategoryCreateInput) {
    super(realm, { _id: new Realm.BSON.ObjectId(), ...params });
  }
}

export class Mutation extends Realm.Object {
  _id = new Realm.BSON.ObjectId();
  type!: string;
  transactionAt!: Date;
  userId!: string;
  categoryId!: string;
  description?: string;
  rate!: number;
  rateFrom!: string;
  rateTo!: string;

  static primaryKey = "_id";
  constructor(realm: Realm, params: MutationCreateInput) {
    super(realm, { _id: new Realm.BSON.ObjectId(), ...params });
  }
}

export const userConfig = {
  schema: [User],
  schemaVersion: 1,
  path: "user.realm",
};

export const walletConfig = {
  schema: [Wallet],
  schemaVersion: 1,
  path: "wallet.realm",
};

export const categoryConfig = {
  schema: [Category],
  schemaVersion: 1,
  path: "category.realm",
};

export const mutationConfig = {
  schema: [Mutation],
  schemaVersion: 2,
  path: "mutation.realm",
};
