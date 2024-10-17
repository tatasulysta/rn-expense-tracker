import Realm from "realm";

export enum UserType {
  User = "user",
  Admin = "admin",
}

export type UserCreateInput = {
  password: string;
  email: string;
  type: UserType;
  defaultBaseRate: string;
};

export class User extends Realm.Object {
  _id = new Realm.BSON.ObjectId();
  type!: UserType;
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
