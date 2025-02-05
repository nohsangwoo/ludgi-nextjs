import { GraphQLClient, RequestOptions } from 'graphql-request';
import { DocumentNode } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type DogAttribute = {
  __typename?: 'DogAttribute';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type DogResult = {
  __typename?: 'DogResult';
  ageInWeeks: Scalars['Int']['output'];
  attributes: Array<DogAttribute>;
  availableDate: Scalars['String']['output'];
  breed: Scalars['String']['output'];
  color: Scalars['String']['output'];
  description: Array<Scalars['String']['output']>;
  fee: Scalars['Float']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  sex: Scalars['String']['output'];
  weight: Scalars['Float']['output'];
};

export type GetDogsResult = {
  __typename?: 'GetDogsResult';
  ageInWeeks: Scalars['Int']['output'];
  attributes: Array<DogAttribute>;
  availableDate: Scalars['String']['output'];
  breed: Scalars['String']['output'];
  color: Scalars['String']['output'];
  description: Array<Scalars['String']['output']>;
  fee: Scalars['Float']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  sex: Scalars['String']['output'];
  weight: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQueueMessageForRabbitMq: CreateQueueMessageForRabbitMqResult;
  createUser: CreateUserResult;
  deleteUser: DeleteUserResult;
  publishTest: PublishTestResult;
  sendToSubscriptionTest: SendToSubscriptionTestResult;
  testMutation: TestMutationResult;
  updateUser: UpdateUserResult;
  updateUserForOptimisticUpdate: UpdateUserForOptimisticUpdateResult;
  zxTest: ZxTestResult;
};


export type MutationCreateQueueMessageForRabbitMqArgs = {
  content: Scalars['String']['input'];
  queue: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationPublishTestArgs = {
  amount: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
};


export type MutationTestMutationArgs = {
  amount: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
};


export type MutationUpdateUserArgs = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserForOptimisticUpdateArgs = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type OnSubscriptionTestPayload = {
  __typename?: 'OnSubscriptionTestPayload';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Int']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  dogByName?: Maybe<DogResult>;
  getDogs: Array<GetDogsResult>;
  getTest: GetTestResult;
  getUserWithRedis: GetUserWithRedisResult;
  getUsersWithPosts: GetUsersWithPostsResult;
};


export type QueryDogByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetTestArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  OnSubscriptionTest: OnSubscriptionTestPayload;
  userSubscription?: Maybe<UserSubscriptionPayload>;
};


export type SubscriptionOnSubscriptionTestArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type SubscriptionUserSubscriptionArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']['output']>;
  profile?: Maybe<Profile>;
};

export type UserSubscriptionPayload = {
  __typename?: 'UserSubscriptionPayload';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ChildType = {
  __typename?: 'childType';
  childText?: Maybe<Scalars['String']['output']>;
};

export type CreateQueueMessageForRabbitMqResult = {
  __typename?: 'createQueueMessageForRabbitMqResult';
  error?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateUserResult = {
  __typename?: 'createUserResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type DeleteUserResult = {
  __typename?: 'deleteUserResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type GetTestResult = {
  __typename?: 'getTestResult';
  child?: Maybe<Array<ChildType>>;
  ok: Scalars['Boolean']['output'];
  text: Scalars['String']['output'];
};

export type GetUserWithRedisResult = {
  __typename?: 'getUserWithRedisResult';
  ok: Scalars['Boolean']['output'];
  users: Array<User>;
};

export type GetUsersWithPostsResult = {
  __typename?: 'getUsersWithPostsResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  users?: Maybe<Array<User>>;
};

export type PublishTestResult = {
  __typename?: 'publishTestResult';
  isAvailable: Scalars['Boolean']['output'];
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type Result = {
  __typename?: 'result';
  duration?: Maybe<Scalars['Int']['output']>;
  stderr?: Maybe<Scalars['String']['output']>;
  stdout?: Maybe<Scalars['String']['output']>;
};

export type SendToSubscriptionTestResult = {
  __typename?: 'sendToSubscriptionTestResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  userSubscriptionPayload: User;
};

export type TestMutationResult = {
  __typename?: 'testMutationResult';
  isAvailable: Scalars['Boolean']['output'];
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type UpdateUserForOptimisticUpdateResult = {
  __typename?: 'updateUserForOptimisticUpdateResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type UpdateUserResult = {
  __typename?: 'updateUserResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type ZxTestResult = {
  __typename?: 'zxTestResult';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  result?: Maybe<Result>;
};

export type OnSubscriptionTestSubscriptionVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OnSubscriptionTestSubscription = { __typename?: 'Subscription', OnSubscriptionTest: { __typename?: 'OnSubscriptionTestPayload', id: number, email: string, name: string } };

export type CreateQueueMessageForRabbitMqMutationVariables = Exact<{
  queue: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateQueueMessageForRabbitMqMutation = { __typename?: 'Mutation', createQueueMessageForRabbitMq: { __typename?: 'createQueueMessageForRabbitMqResult', ok: boolean, error?: string | null, message?: string | null } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'createUserResult', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: number, email: string, name?: string | null } | null } };

export type DeleteUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'deleteUserResult', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: number, email: string, name?: string | null } | null } };

export type DogByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type DogByNameQuery = { __typename?: 'Query', dogByName?: { __typename?: 'DogResult', name: string, breed: string, ageInWeeks: number, image: string, sex: string, description: Array<string>, color: string, attributes: Array<{ __typename?: 'DogAttribute', key: string, value: string }> } | null };

export type GetDogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDogsQuery = { __typename?: 'Query', getDogs: Array<{ __typename?: 'GetDogsResult', name: string, breed: string, ageInWeeks: number, image: string, sex: string, weight: number, fee: number }> };

export type GetTestQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTestQuery = { __typename?: 'Query', getTest: { __typename?: 'getTestResult', ok: boolean, text: string, child?: Array<{ __typename?: 'childType', childText?: string | null }> | null } };

export type GetUserWithRedisQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserWithRedisQuery = { __typename?: 'Query', getUserWithRedis: { __typename?: 'getUserWithRedisResult', ok: boolean, users: Array<{ __typename?: 'User', id: number, name?: string | null, email: string, postsCount?: number | null, posts?: Array<{ __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean }> | null }> } };

export type GetUsersWithPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersWithPostsQuery = { __typename?: 'Query', getUsersWithPosts: { __typename?: 'getUsersWithPostsResult', ok: boolean, error?: string | null, users?: Array<{ __typename?: 'User', id: number, name?: string | null, email: string }> | null } };

export type PublishTestMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
  description: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
}>;


export type PublishTestMutation = { __typename?: 'Mutation', publishTest: { __typename?: 'publishTestResult', title: string, price: number, isAvailable: boolean } };

export type SendToSubscriptionTestMutationVariables = Exact<{ [key: string]: never; }>;


export type SendToSubscriptionTestMutation = { __typename?: 'Mutation', sendToSubscriptionTest: { __typename?: 'sendToSubscriptionTestResult', ok: boolean, error?: string | null, userSubscriptionPayload: { __typename?: 'User', id: number, email: string, name?: string | null } } };

export type TestMutationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
  description: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
}>;


export type TestMutationMutation = { __typename?: 'Mutation', testMutation: { __typename?: 'testMutationResult', title: string, price: number, isAvailable: boolean } };

export type UpdateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'updateUserResult', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: number, email: string, name?: string | null } | null } };

export type UpdateUserForOptimisticUpdateMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserForOptimisticUpdateMutation = { __typename?: 'Mutation', updateUserForOptimisticUpdate: { __typename?: 'updateUserForOptimisticUpdateResult', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: number, email: string, name?: string | null } | null } };

export type UserSubscriptionSubscriptionVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserSubscriptionSubscription = { __typename?: 'Subscription', userSubscription?: { __typename?: 'UserSubscriptionPayload', id?: number | null, email?: string | null, name?: string | null } | null };

export type ZxTestMutationVariables = Exact<{ [key: string]: never; }>;


export type ZxTestMutation = { __typename?: 'Mutation', zxTest: { __typename?: 'zxTestResult', ok: boolean, error?: string | null, result?: { __typename?: 'result', stdout?: string | null, stderr?: string | null, duration?: number | null } | null } };


export const OnSubscriptionTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnSubscriptionTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnSubscriptionTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const CreateQueueMessageForRabbitMqDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createQueueMessageForRabbitMq"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queue"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createQueueMessageForRabbitMq"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queue"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode;
export const DogByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"dogByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dogByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"breed"}},{"kind":"Field","name":{"kind":"Name","value":"ageInWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetDogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"breed"}},{"kind":"Field","name":{"kind":"Name","value":"ageInWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"sex"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}}]}}]}}]} as unknown as DocumentNode;
export const GetTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"child"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"childText"}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetUserWithRedisDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserWithRedis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserWithRedis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"postsCount"}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"published"}}]}}]}}]}}]}}]} as unknown as DocumentNode;
export const GetUsersWithPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsersWithPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsersWithPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode;
export const PublishTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"publishTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}}]}}]}}]} as unknown as DocumentNode;
export const SendToSubscriptionTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendToSubscriptionTest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendToSubscriptionTest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"userSubscriptionPayload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode;
export const TestMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"testMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"isAvailable"}}]}}]}}]} as unknown as DocumentNode;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode;
export const UpdateUserForOptimisticUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserForOptimisticUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserForOptimisticUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode;
export const UserSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"userSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode;
export const ZxTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"zxTest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zxTest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stdout"}},{"kind":"Field","name":{"kind":"Name","value":"stderr"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]}}]} as unknown as DocumentNode;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    OnSubscriptionTest(variables?: OnSubscriptionTestSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<OnSubscriptionTestSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<OnSubscriptionTestSubscription>(OnSubscriptionTestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'OnSubscriptionTest', 'subscription', variables);
    },
    createQueueMessageForRabbitMq(variables: CreateQueueMessageForRabbitMqMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateQueueMessageForRabbitMqMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateQueueMessageForRabbitMqMutation>(CreateQueueMessageForRabbitMqDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createQueueMessageForRabbitMq', 'mutation', variables);
    },
    createUser(variables: CreateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation', variables);
    },
    deleteUser(variables: DeleteUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>(DeleteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteUser', 'mutation', variables);
    },
    dogByName(variables: DogByNameQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DogByNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DogByNameQuery>(DogByNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'dogByName', 'query', variables);
    },
    getDogs(variables?: GetDogsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetDogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDogsQuery>(GetDogsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDogs', 'query', variables);
    },
    getTest(variables: GetTestQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTestQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTestQuery>(GetTestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTest', 'query', variables);
    },
    getUserWithRedis(variables?: GetUserWithRedisQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserWithRedisQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserWithRedisQuery>(GetUserWithRedisDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserWithRedis', 'query', variables);
    },
    getUsersWithPosts(variables?: GetUsersWithPostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUsersWithPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersWithPostsQuery>(GetUsersWithPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUsersWithPosts', 'query', variables);
    },
    publishTest(variables: PublishTestMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PublishTestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PublishTestMutation>(PublishTestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'publishTest', 'mutation', variables);
    },
    sendToSubscriptionTest(variables?: SendToSubscriptionTestMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SendToSubscriptionTestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SendToSubscriptionTestMutation>(SendToSubscriptionTestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sendToSubscriptionTest', 'mutation', variables);
    },
    testMutation(variables: TestMutationMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TestMutationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestMutationMutation>(TestMutationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'testMutation', 'mutation', variables);
    },
    updateUser(variables: UpdateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserMutation>(UpdateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateUser', 'mutation', variables);
    },
    updateUserForOptimisticUpdate(variables: UpdateUserForOptimisticUpdateMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateUserForOptimisticUpdateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserForOptimisticUpdateMutation>(UpdateUserForOptimisticUpdateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateUserForOptimisticUpdate', 'mutation', variables);
    },
    userSubscription(variables?: UserSubscriptionSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserSubscriptionSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserSubscriptionSubscription>(UserSubscriptionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userSubscription', 'subscription', variables);
    },
    zxTest(variables?: ZxTestMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ZxTestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ZxTestMutation>(ZxTestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'zxTest', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;