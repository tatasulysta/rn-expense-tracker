import Realm from "realm";

export enum MutationType {
  Income = "Income",
  Expense = "Expense",
}

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

export class Mutation extends Realm.Object {
  _id = new Realm.BSON.ObjectId();
  type!: MutationType;
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
