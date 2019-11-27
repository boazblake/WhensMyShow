// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  show: (where?: ShowWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  show: (where: ShowWhereUniqueInput) => ShowNullablePromise;
  shows: (args?: {
    where?: ShowWhereInput;
    orderBy?: ShowOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Show>;
  showsConnection: (args?: {
    where?: ShowWhereInput;
    orderBy?: ShowOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => ShowConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserNullablePromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createShow: (data: ShowCreateInput) => ShowPromise;
  updateShow: (args: {
    data: ShowUpdateInput;
    where: ShowWhereUniqueInput;
  }) => ShowPromise;
  updateManyShows: (args: {
    data: ShowUpdateManyMutationInput;
    where?: ShowWhereInput;
  }) => BatchPayloadPromise;
  upsertShow: (args: {
    where: ShowWhereUniqueInput;
    create: ShowCreateInput;
    update: ShowUpdateInput;
  }) => ShowPromise;
  deleteShow: (where: ShowWhereUniqueInput) => ShowPromise;
  deleteManyShows: (where?: ShowWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  show: (
    where?: ShowSubscriptionWhereInput
  ) => ShowSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type ShowOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "orderId_ASC"
  | "orderId_DESC"
  | "image_ASC"
  | "image_DESC"
  | "listStatus_ASC"
  | "listStatus_DESC"
  | "name_ASC"
  | "name_DESC"
  | "notes_ASC"
  | "notes_DESC"
  | "tvmazeId_ASC"
  | "tvmazeId_DESC";

export type UserOrderByInput = "id_ASC" | "id_DESC" | "name_ASC" | "name_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface UserCreateInput {
  id?: Maybe<ID_Input>;
  name: String;
}

export type ShowWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface ShowUpdateInput {
  orderId?: Maybe<Int>;
  image?: Maybe<String>;
  listStatus?: Maybe<String>;
  name?: Maybe<String>;
  notes?: Maybe<String>;
  tvmazeId?: Maybe<Int>;
}

export interface ShowWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  orderId?: Maybe<Int>;
  orderId_not?: Maybe<Int>;
  orderId_in?: Maybe<Int[] | Int>;
  orderId_not_in?: Maybe<Int[] | Int>;
  orderId_lt?: Maybe<Int>;
  orderId_lte?: Maybe<Int>;
  orderId_gt?: Maybe<Int>;
  orderId_gte?: Maybe<Int>;
  image?: Maybe<String>;
  image_not?: Maybe<String>;
  image_in?: Maybe<String[] | String>;
  image_not_in?: Maybe<String[] | String>;
  image_lt?: Maybe<String>;
  image_lte?: Maybe<String>;
  image_gt?: Maybe<String>;
  image_gte?: Maybe<String>;
  image_contains?: Maybe<String>;
  image_not_contains?: Maybe<String>;
  image_starts_with?: Maybe<String>;
  image_not_starts_with?: Maybe<String>;
  image_ends_with?: Maybe<String>;
  image_not_ends_with?: Maybe<String>;
  listStatus?: Maybe<String>;
  listStatus_not?: Maybe<String>;
  listStatus_in?: Maybe<String[] | String>;
  listStatus_not_in?: Maybe<String[] | String>;
  listStatus_lt?: Maybe<String>;
  listStatus_lte?: Maybe<String>;
  listStatus_gt?: Maybe<String>;
  listStatus_gte?: Maybe<String>;
  listStatus_contains?: Maybe<String>;
  listStatus_not_contains?: Maybe<String>;
  listStatus_starts_with?: Maybe<String>;
  listStatus_not_starts_with?: Maybe<String>;
  listStatus_ends_with?: Maybe<String>;
  listStatus_not_ends_with?: Maybe<String>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  notes?: Maybe<String>;
  notes_not?: Maybe<String>;
  notes_in?: Maybe<String[] | String>;
  notes_not_in?: Maybe<String[] | String>;
  notes_lt?: Maybe<String>;
  notes_lte?: Maybe<String>;
  notes_gt?: Maybe<String>;
  notes_gte?: Maybe<String>;
  notes_contains?: Maybe<String>;
  notes_not_contains?: Maybe<String>;
  notes_starts_with?: Maybe<String>;
  notes_not_starts_with?: Maybe<String>;
  notes_ends_with?: Maybe<String>;
  notes_not_ends_with?: Maybe<String>;
  tvmazeId?: Maybe<Int>;
  tvmazeId_not?: Maybe<Int>;
  tvmazeId_in?: Maybe<Int[] | Int>;
  tvmazeId_not_in?: Maybe<Int[] | Int>;
  tvmazeId_lt?: Maybe<Int>;
  tvmazeId_lte?: Maybe<Int>;
  tvmazeId_gt?: Maybe<Int>;
  tvmazeId_gte?: Maybe<Int>;
  AND?: Maybe<ShowWhereInput[] | ShowWhereInput>;
  OR?: Maybe<ShowWhereInput[] | ShowWhereInput>;
  NOT?: Maybe<ShowWhereInput[] | ShowWhereInput>;
}

export interface ShowSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<ShowWhereInput>;
  AND?: Maybe<ShowSubscriptionWhereInput[] | ShowSubscriptionWhereInput>;
  OR?: Maybe<ShowSubscriptionWhereInput[] | ShowSubscriptionWhereInput>;
  NOT?: Maybe<ShowSubscriptionWhereInput[] | ShowSubscriptionWhereInput>;
}

export interface UserWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  AND?: Maybe<UserWhereInput[] | UserWhereInput>;
  OR?: Maybe<UserWhereInput[] | UserWhereInput>;
  NOT?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export interface ShowCreateInput {
  id?: Maybe<ID_Input>;
  orderId?: Maybe<Int>;
  image?: Maybe<String>;
  listStatus?: Maybe<String>;
  name?: Maybe<String>;
  notes: String;
  tvmazeId?: Maybe<Int>;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface UserUpdateManyMutationInput {
  name?: Maybe<String>;
}

export interface ShowUpdateManyMutationInput {
  orderId?: Maybe<Int>;
  image?: Maybe<String>;
  listStatus?: Maybe<String>;
  name?: Maybe<String>;
  notes?: Maybe<String>;
  tvmazeId?: Maybe<Int>;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<UserWhereInput>;
  AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
  OR?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
  NOT?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface UserUpdateInput {
  name?: Maybe<String>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface UserPreviousValues {
  id: ID_Output;
  name: String;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
}

export interface ShowConnection {
  pageInfo: PageInfo;
  edges: ShowEdge[];
}

export interface ShowConnectionPromise
  extends Promise<ShowConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<ShowEdge>>() => T;
  aggregate: <T = AggregateShowPromise>() => T;
}

export interface ShowConnectionSubscription
  extends Promise<AsyncIterator<ShowConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<ShowEdgeSubscription>>>() => T;
  aggregate: <T = AggregateShowSubscription>() => T;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface ShowSubscriptionPayload {
  mutation: MutationType;
  node: Show;
  updatedFields: String[];
  previousValues: ShowPreviousValues;
}

export interface ShowSubscriptionPayloadPromise
  extends Promise<ShowSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = ShowPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = ShowPreviousValuesPromise>() => T;
}

export interface ShowSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<ShowSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = ShowSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = ShowPreviousValuesSubscription>() => T;
}

export interface ShowPreviousValues {
  id: ID_Output;
  orderId?: Int;
  image?: String;
  listStatus?: String;
  name?: String;
  notes: String;
  tvmazeId?: Int;
}

export interface ShowPreviousValuesPromise
  extends Promise<ShowPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  orderId: () => Promise<Int>;
  image: () => Promise<String>;
  listStatus: () => Promise<String>;
  name: () => Promise<String>;
  notes: () => Promise<String>;
  tvmazeId: () => Promise<Int>;
}

export interface ShowPreviousValuesSubscription
  extends Promise<AsyncIterator<ShowPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  orderId: () => Promise<AsyncIterator<Int>>;
  image: () => Promise<AsyncIterator<String>>;
  listStatus: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  notes: () => Promise<AsyncIterator<String>>;
  tvmazeId: () => Promise<AsyncIterator<Int>>;
}

export interface ShowEdge {
  node: Show;
  cursor: String;
}

export interface ShowEdgePromise extends Promise<ShowEdge>, Fragmentable {
  node: <T = ShowPromise>() => T;
  cursor: () => Promise<String>;
}

export interface ShowEdgeSubscription
  extends Promise<AsyncIterator<ShowEdge>>,
    Fragmentable {
  node: <T = ShowSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface User {
  id: ID_Output;
  name: String;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
}

export interface UserNullablePromise
  extends Promise<User | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface Show {
  id: ID_Output;
  orderId?: Int;
  image?: String;
  listStatus?: String;
  name?: String;
  notes: String;
  tvmazeId?: Int;
}

export interface ShowPromise extends Promise<Show>, Fragmentable {
  id: () => Promise<ID_Output>;
  orderId: () => Promise<Int>;
  image: () => Promise<String>;
  listStatus: () => Promise<String>;
  name: () => Promise<String>;
  notes: () => Promise<String>;
  tvmazeId: () => Promise<Int>;
}

export interface ShowSubscription
  extends Promise<AsyncIterator<Show>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  orderId: () => Promise<AsyncIterator<Int>>;
  image: () => Promise<AsyncIterator<String>>;
  listStatus: () => Promise<AsyncIterator<String>>;
  name: () => Promise<AsyncIterator<String>>;
  notes: () => Promise<AsyncIterator<String>>;
  tvmazeId: () => Promise<AsyncIterator<Int>>;
}

export interface ShowNullablePromise
  extends Promise<Show | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  orderId: () => Promise<Int>;
  image: () => Promise<String>;
  listStatus: () => Promise<String>;
  name: () => Promise<String>;
  notes: () => Promise<String>;
  tvmazeId: () => Promise<Int>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface AggregateShow {
  count: Int;
}

export interface AggregateShowPromise
  extends Promise<AggregateShow>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateShowSubscription
  extends Promise<AsyncIterator<AggregateShow>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

export type Long = string;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Show",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/boaz-blake-8951e1/whensMyShow/dev`
});
export const prisma = new Prisma();