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
  DateTime: any;
};

export type AssignOrRevokeToGameInput = {
  activity: Scalars['String'];
  game: Scalars['String'];
  genres?: InputMaybe<Array<Scalars['String']>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  message?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  statusCode?: Maybe<Scalars['Int']>;
};

export type CreateGameInput = {
  basicPrice?: InputMaybe<Scalars['Float']>;
  description: Scalars['String'];
  developers: Array<Scalars['String']>;
  genres: Array<Scalars['String']>;
  name: Scalars['String'];
  publishers: Array<Scalars['String']>;
  releasedAt: Scalars['DateTime'];
  status: Scalars['String'];
  tags: Array<Scalars['String']>;
  type: Scalars['String'];
};

export type CreateGenreInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateStudioInput = {
  makeOwner?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  type?: InputMaybe<Scalars['String']>;
};

export type CreateTagInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
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

export type Game = {
  __typename?: 'Game';
  adultOnly: Scalars['Boolean'];
  allRating: Scalars['Float'];
  allReviews: Scalars['Int'];
  basicPrice: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  genres?: Maybe<Array<Genre>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  recentRating: Scalars['Float'];
  recentReviews: Scalars['Int'];
  releasedAt: Scalars['DateTime'];
  status: Scalars['String'];
  studios?: Maybe<Array<GameStudio>>;
  tags?: Maybe<Array<Tag>>;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type GameStudio = {
  __typename?: 'GameStudio';
  contribution: Scalars['String'];
  game?: Maybe<Game>;
  gameId: Scalars['String'];
  studio?: Maybe<Studio>;
  studioId: Scalars['String'];
};

export type Genre = {
  __typename?: 'Genre';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  games?: Maybe<Array<Game>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assign: Game;
  createGame: Game;
  createGenre: Genre;
  createStudio: Studio;
  createTag: Tag;
  createUser: User;
  login: AuthResult;
  logout: AuthResult;
  register: AuthResult;
};


export type MutationAssignArgs = {
  assignToGameInput: AssignOrRevokeToGameInput;
};


export type MutationCreateGameArgs = {
  createGameInput: CreateGameInput;
};


export type MutationCreateGenreArgs = {
  createGenreInput: CreateGenreInput;
};


export type MutationCreateStudioArgs = {
  createStudioInput: CreateStudioInput;
};


export type MutationCreateTagArgs = {
  createTagInput: CreateTagInput;
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

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  currentPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type OffsetPaginationOptions = {
  field: Scalars['String'];
  skip: Scalars['Float'];
  take: Scalars['Float'];
  type: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNext: Scalars['Boolean'];
  hasPrevious: Scalars['Boolean'];
  nextCursor: Scalars['String'];
  previousCursor: Scalars['String'];
};

export type PaginatedGames = {
  __typename?: 'PaginatedGames';
  edges?: Maybe<Array<Game>>;
  pageInfo: PageInfo;
};

export type PaginatedGenres = {
  __typename?: 'PaginatedGenres';
  edges?: Maybe<Array<Genre>>;
  pageInfo?: Maybe<OffsetPageInfo>;
};

export type PaginatedStudios = {
  __typename?: 'PaginatedStudios';
  edges?: Maybe<Array<Studio>>;
  pageInfo: PageInfo;
};

export type PaginatedTags = {
  __typename?: 'PaginatedTags';
  edges?: Maybe<Array<Tag>>;
  pageInfo?: Maybe<OffsetPageInfo>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  edges?: Maybe<Array<User>>;
  pageInfo: PageInfo;
};

export type PaginationOptions = {
  cursor: Scalars['String'];
  field: Scalars['String'];
  take: Scalars['Float'];
  type: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  employments?: Maybe<Array<StudioEmployee>>;
  fullName: Scalars['String'];
  games?: Maybe<Array<Game>>;
  id: Scalars['ID'];
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  games: PaginatedGames;
  genres: PaginatedGenres;
  me: AuthResult;
  studios: PaginatedStudios;
  tags: PaginatedTags;
  updateUser: User;
  user: User;
  users: PaginatedUsers;
};


export type QueryGamesArgs = {
  paginationOptions: PaginationOptions;
};


export type QueryGenresArgs = {
  paginationOptions: OffsetPaginationOptions;
};


export type QueryStudiosArgs = {
  paginationOptions: PaginationOptions;
};


export type QueryTagsArgs = {
  paginationOptions: OffsetPaginationOptions;
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

export type Studio = {
  __typename?: 'Studio';
  createdAt: Scalars['DateTime'];
  employees?: Maybe<Array<StudioEmployee>>;
  games?: Maybe<Array<GameStudio>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type StudioEmployee = {
  __typename?: 'StudioEmployee';
  assignedAt: Scalars['DateTime'];
  assignedBy: Scalars['String'];
  employee?: Maybe<User>;
  employeeId: Scalars['String'];
  employmentType: Scalars['String'];
  studio?: Maybe<Studio>;
  studioId: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  games?: Maybe<Array<Game>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UpdateUserInput = {
  displayName?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  employments?: Maybe<Array<StudioEmployee>>;
  fullName: Scalars['String'];
  games?: Maybe<Array<Game>>;
  id: Scalars['ID'];
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserFragment = { __typename: 'User', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any };

export type ProfileFragment = { __typename: 'Profile', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type RegisterMutationVariables = Exact<{
  fullName: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type GetAllGamesQueryVariables = Exact<{
  pagination: PaginationOptions;
}>;


export type GetAllGamesQuery = { __typename?: 'Query', games: { __typename?: 'PaginatedGames', edges?: Array<{ __typename?: 'Game', id: string, adultOnly: boolean, basicPrice: number, price: number, status: string, type: string, releasedAt: any, createdAt: any, updatedAt: any, name: string, description: string, tags?: Array<{ __typename?: 'Tag', name: string }> | null, genres?: Array<{ __typename?: 'Genre', name: string }> | null, studios?: Array<{ __typename?: 'GameStudio', contribution: string, studio?: { __typename?: 'Studio', id: string, name: string } | null }> | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean, previousCursor: string, nextCursor: string } } };

export type GetAllUsersQueryVariables = Exact<{
  pagination: PaginationOptions;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', edges?: Array<{ __typename: 'User', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any }> | null, pageInfo: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean, previousCursor: string, nextCursor: string } } };

export type GetUserQueryVariables = Exact<{
  field: Scalars['String'];
  value: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename: 'User', id: string, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } };

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
export const ProfileFragmentDoc = gql`
    fragment Profile on Profile {
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
    profile {
      ...Profile
    }
  }
}
    ${ProfileFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    __typename
    statusCode
    message
    profile {
      ...Profile
    }
  }
}
    ${ProfileFragmentDoc}`;

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
    profile {
      ...Profile
    }
  }
}
    ${ProfileFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    __typename
    statusCode
    message
    profile {
      ...Profile
    }
  }
}
    ${ProfileFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const GetAllGamesDocument = gql`
    query GetAllGames($pagination: PaginationOptions!) {
  games(paginationOptions: $pagination) {
    edges {
      id
      adultOnly
      tags {
        name
      }
      genres {
        name
      }
      basicPrice
      price
      status
      type
      releasedAt
      createdAt
      updatedAt
      name
      description
      type
      studios {
        contribution
        studio {
          id
          name
        }
      }
    }
    pageInfo {
      hasNext
      hasPrevious
      previousCursor
      nextCursor
    }
  }
}
    `;

export function useGetAllGamesQuery(options: Omit<Urql.UseQueryArgs<GetAllGamesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllGamesQuery, GetAllGamesQueryVariables>({ query: GetAllGamesDocument, ...options });
};
export const GetAllUsersDocument = gql`
    query GetAllUsers($pagination: PaginationOptions!) {
  users(paginationOptions: $pagination) {
    edges {
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