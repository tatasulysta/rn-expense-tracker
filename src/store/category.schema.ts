import Realm from "realm";

export enum CategoryType {
  Global = "global",
  Personal = "personal",
}

export type CategoryCreateInput = {
  userId: Realm.BSON.ObjectId;
  type: CategoryType;
  label: string;
  //   mungkin ada tambah color
  color: string;
  icon: string;
};

export class Category extends Realm.Object {
  _id = new Realm.BSON.ObjectId();
  type!: string;
  label!: string;
  userId!: string;
  color!: string;
  icon!: string;

  static primaryKey = "_id";
  constructor(realm: Realm, params: CategoryCreateInput) {
    super(realm, { _id: new Realm.BSON.ObjectId(), ...params });
  }
}
