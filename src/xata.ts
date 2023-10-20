// Generated by Xata Codegen 0.26.3. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "Users",
    columns: [{ name: "email", type: "email", unique: true }],
    revLinks: [
      { column: "owner", table: "Passwords" },
      { column: "owner", table: "Expenses" },
    ],
  },
  {
    name: "Passwords",
    columns: [
      { name: "password", type: "string" },
      { name: "passwordFor", type: "string" },
      { name: "owner", type: "link", link: { table: "Users" } },
    ],
  },
  {
    name: "Expenses",
    columns: [
      { name: "owner", type: "link", link: { table: "Users" } },
      { name: "details", type: "json" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["Users"];
export type UsersRecord = Users & XataRecord;

export type Passwords = InferredTypes["Passwords"];
export type PasswordsRecord = Passwords & XataRecord;

export type Expenses = InferredTypes["Expenses"];
export type ExpensesRecord = Expenses & XataRecord;

export type DatabaseSchema = {
  Users: UsersRecord;
  Passwords: PasswordsRecord;
  Expenses: ExpensesRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Ralph-Codes-s-workspace-uglabh.us-east-1.xata.sh/db/Hanko-Auth",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};