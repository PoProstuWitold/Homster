import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  message?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
};

export type CreateUserInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
};

export type CredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  login: AuthResult;
  logout: AuthResult;
  register: AuthResult;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  credentialsInput: CredentialsInput;
};


export type MutationRegisterArgs = {
  createUserInput: CreateUserInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNext: Scalars['Boolean'];
  hasPrevious: Scalars['Boolean'];
  nextCursor: Scalars['String'];
  previousCursor: Scalars['String'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  pageInfo: PageInfo;
  users?: Maybe<Array<User>>;
};

export type PaginationOptions = {
  cursor: Scalars['String'];
  field: Scalars['String'];
  take: Scalars['Float'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: AuthResult;
  updateUser: User;
  user: User;
  users: PaginatedUsers;
};


export type QueryUpdateUserArgs = {
  values: UpdateUserInput;
};


export type QueryUserArgs = {
  field: Scalars['String'];
  value: Scalars['String'];
};


export type QueryUsersArgs = {
  paginationOptions: PaginationOptions;
};

export type UpdateUserInput = {
  displayName: Scalars['String'];
  fullName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  role: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserFragment = { __typename: 'User', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: string, updatedAt: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, user?: { __typename: 'User', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: string, updatedAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, user?: { __typename: 'User', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: string, updatedAt: string } | null } };

export type RegisterMutationVariables = Exact<{
  fullName: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, user?: { __typename: 'User', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: string, updatedAt: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, user?: { __typename: 'User', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: string, updatedAt: string } | null } };

export type GetAllUsersQueryVariables = Exact<{
  pagination: PaginationOptions;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', users?: Array<{ __typename: 'User', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: string, updatedAt: string }> | null, pageInfo: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean, previousCursor: string, nextCursor: string } } };

export type GetUserQueryVariables = Exact<{
  field: Scalars['String'];
  value: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename: 'User', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: string, updatedAt: string } };

export const UserFragmentDoc = gql`
    fragment User on User {
  __typename
  id
  displayName
  fullName
  email
  role
  createdAt
  updatedAt
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(credentialsInput: {email: $email, password: $password}) {
    __typename
    statusCode
    message
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    __typename
    statusCode
    message
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($fullName: String!, $displayName: String!, $email: String!, $password: String!) {
  register(
    createUserInput: {fullName: $fullName, displayName: $displayName, email: $email, password: $password}
  ) {
    __typename
    statusCode
    message
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    __typename
    statusCode
    message
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const GetAllUsersDocument = gql`
    query GetAllUsers($pagination: PaginationOptions!) {
  users(paginationOptions: $pagination) {
    users {
      ...User
    }
    pageInfo {
      hasNext
      hasPrevious
      previousCursor
      nextCursor
    }
  }
}
    ${UserFragmentDoc}`;

export function useGetAllUsersQuery(options: Omit<Urql.UseQueryArgs<GetAllUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>({ query: GetAllUsersDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($field: String!, $value: String!) {
  user(field: $field, value: $value) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
};