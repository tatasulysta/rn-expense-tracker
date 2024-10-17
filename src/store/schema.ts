import Realm, { BSON, index } from "realm";

export class Task extends Realm.Object {
  _id = new Realm.BSON.ObjectId();
  description!: string;
  isComplete = false;
  createdAt?: Date;

  static primaryKey = "_id";

  constructor(realm: Realm, description: string) {
    console.log("in constructor");
    super(realm, {
      _id: new BSON.ObjectId(),
      description,
    });
  }
}
