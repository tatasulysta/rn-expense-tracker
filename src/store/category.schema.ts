import Realm from "realm";

export enum CategoryType {
  Global = "global",
  Personal = "personal",
}

export type CategoryCreateInput = {
  userId: string;
  type: CategoryType;
  label: string;
  //   mungkin ada tambah color
};

export class Category extends Realm.Object {
  _id = new Realm.BSON.ObjectId();
  type!: CategoryType;
  label!: string;
  userId!: string;
  static primaryKey = "_id";
  constructor(realm: Realm, params: CategoryCreateInput) {
    super(realm, { _id: new Realm.BSON.ObjectId(), ...params });
  }
}
