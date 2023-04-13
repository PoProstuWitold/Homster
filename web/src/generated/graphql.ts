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
  Upload: any;
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

export type Count = {
  __typename?: 'Count';
  employees?: Maybe<Scalars['Int']>;
  games?: Maybe<Scalars['Int']>;
};

export type CreateGameInput = {
  basicPrice?: InputMaybe<Scalars['Float']>;
  description: Scalars['String'];
  developers: Array<Scalars['String']>;
  genres: Array<Scalars['String']>;
  name: Scalars['String'];
  publishers: Array<Scalars['String']>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
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

export type CreateUploadInput = {
  description: Scalars['String'];
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

export type CursorPageInfo = {
  __typename?: 'CursorPageInfo';
  hasNext: Scalars['Boolean'];
  hasPrevious: Scalars['Boolean'];
  nextCursor: Scalars['String'];
  previousCursor: Scalars['String'];
};

export type CursorPaginatedGames = {
  __typename?: 'CursorPaginatedGames';
  edges?: Maybe<Array<Game>>;
  pageInfo: CursorPageInfo;
};

export type CursorPaginatedStudios = {
  __typename?: 'CursorPaginatedStudios';
  edges?: Maybe<Array<Studio>>;
  pageInfo: CursorPageInfo;
};

export type CursorPaginatedUsers = {
  __typename?: 'CursorPaginatedUsers';
  edges?: Maybe<Array<User>>;
  pageInfo: CursorPageInfo;
};

export type CursorPaginationOptions = {
  cursor: Scalars['String'];
  field: Scalars['String'];
  take: Scalars['Float'];
  type: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  adultOnly: Scalars['Boolean'];
  allRating: Scalars['Float'];
  allReviews: Scalars['Int'];
  basicPrice: Scalars['Float'];
  coverImage?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  genres?: Maybe<Array<Genre>>;
  id: Scalars['ID'];
  media?: Maybe<Array<GameMedia>>;
  name: Scalars['String'];
  price: Scalars['Float'];
  recentRating: Scalars['Float'];
  recentReviews: Scalars['Int'];
  releaseDate?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
  studios?: Maybe<Array<GameStudio>>;
  tags?: Maybe<Array<Tag>>;
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type GameMedia = {
  __typename?: 'GameMedia';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
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

export type GetStudioArgs = {
  name: Scalars['String'];
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
  updateUser: Profile;
  uploadFile: UploadResult;
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


export type MutationUpdateUserArgs = {
  values: UpdateUserInput;
};


export type MutationUploadFileArgs = {
  file?: InputMaybe<Scalars['Upload']>;
  values: CreateUploadInput;
};

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  currentPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type OffsetPaginatedGenres = {
  __typename?: 'OffsetPaginatedGenres';
  edges?: Maybe<Array<Genre>>;
  pageInfo?: Maybe<OffsetPageInfo>;
};

export type OffsetPaginatedTags = {
  __typename?: 'OffsetPaginatedTags';
  edges?: Maybe<Array<Tag>>;
  pageInfo?: Maybe<OffsetPageInfo>;
};

export type OffsetPaginationOptions = {
  field: Scalars['String'];
  skip: Scalars['Float'];
  take: Scalars['Float'];
  type: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
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
  games: CursorPaginatedGames;
  genres: OffsetPaginatedGenres;
  me: AuthResult;
  studio: Studio;
  studios: CursorPaginatedStudios;
  tags: OffsetPaginatedTags;
  user: User;
  users: CursorPaginatedUsers;
};


export type QueryGamesArgs = {
  paginationOptions: CursorPaginationOptions;
};


export type QueryGenresArgs = {
  paginationOptions: OffsetPaginationOptions;
};


export type QueryStudioArgs = {
  getStudioArgs: GetStudioArgs;
};


export type QueryStudiosArgs = {
  paginationOptions: CursorPaginationOptions;
};


export type QueryTagsArgs = {
  paginationOptions: OffsetPaginationOptions;
};


export type QueryUserArgs = {
  field: Scalars['String'];
  value: Scalars['String'];
};


export type QueryUsersArgs = {
  paginationOptions: CursorPaginationOptions;
};

export type Studio = {
  __typename?: 'Studio';
  _count?: Maybe<Count>;
  avatar?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
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

export type UploadResult = {
  __typename?: 'UploadResult';
  description?: Maybe<Scalars['String']>;
  imageFormatted?: Maybe<Scalars['String']>;
  imageRaw?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
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

export type CursorPageFragment = { __typename?: 'CursorPageInfo', hasNext: boolean, hasPrevious: boolean, previousCursor: string, nextCursor: string };

export type GameFragment = { __typename: 'Game', id: string, createdAt: any, updatedAt: any, adultOnly: boolean, basicPrice: number, coverImage?: string | null, price: number, status: string, type: string, releaseDate?: any | null, name: string, description: string, tags?: Array<{ __typename: 'Tag', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, genres?: Array<{ __typename: 'Genre', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, studios?: Array<{ __typename?: 'GameStudio', contribution: string, studio?: { __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null } | null }> | null };

export type GenreFragment = { __typename: 'Genre', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null };

export type StudioFragment = { __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null };

export type TagFragment = { __typename: 'Tag', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null };

export type UserFragment = { __typename: 'User', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any };

export type ProfileFragment = { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type RegisterMutationVariables = Exact<{
  fullName: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type UpdateUserMutationVariables = Exact<{
  values: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type GetAllGamesQueryVariables = Exact<{
  pagination: CursorPaginationOptions;
}>;


export type GetAllGamesQuery = { __typename?: 'Query', games: { __typename?: 'CursorPaginatedGames', edges?: Array<{ __typename: 'Game', id: string, createdAt: any, updatedAt: any, adultOnly: boolean, basicPrice: number, coverImage?: string | null, price: number, status: string, type: string, releaseDate?: any | null, name: string, description: string, tags?: Array<{ __typename: 'Tag', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, genres?: Array<{ __typename: 'Genre', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, studios?: Array<{ __typename?: 'GameStudio', contribution: string, studio?: { __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null } | null }> | null }> | null, pageInfo: { __typename?: 'CursorPageInfo', hasNext: boolean, hasPrevious: boolean, previousCursor: string, nextCursor: string } } };

export type GetAllStudiosQueryVariables = Exact<{
  pagination: CursorPaginationOptions;
}>;


export type GetAllStudiosQuery = { __typename?: 'Query', studios: { __typename?: 'CursorPaginatedStudios', edges?: Array<{ __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null }> | null, pageInfo: { __typename?: 'CursorPageInfo', hasNext: boolean, hasPrevious: boolean, previousCursor: string, nextCursor: string } } };

export type GetAllUsersQueryVariables = Exact<{
  pagination: CursorPaginationOptions;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', users: { __typename?: 'CursorPaginatedUsers', edges?: Array<{ __typename: 'User', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any }> | null, pageInfo: { __typename?: 'CursorPageInfo', hasNext: boolean, hasPrevious: boolean, previousCursor: string, nextCursor: string } } };

export type GetStudioQueryVariables = Exact<{
  studio: GetStudioArgs;
}>;


export type GetStudioQuery = { __typename?: 'Query', studio: { __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, employees?: Array<{ __typename?: 'StudioEmployee', employee?: { __typename?: 'User', fullName: string, id: string, displayName: string } | null }> | null, games?: Array<{ __typename?: 'GameStudio', game?: { __typename?: 'Game', id: string, name: string, description: string } | null }> | null, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null } };

export type GetUserQueryVariables = Exact<{
  field: Scalars['String'];
  value: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename: 'User', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } };

export const CursorPageFragmentDoc = gql`
    fragment CursorPage on CursorPageInfo {
  hasNext
  hasPrevious
  previousCursor
  nextCursor
}
    `;
export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  __typename
  id
  createdAt
  updatedAt
  name
  description
}
    `;
export const GenreFragmentDoc = gql`
    fragment Genre on Genre {
  __typename
  id
  createdAt
  updatedAt
  name
  description
}
    `;
export const StudioFragmentDoc = gql`
    fragment Studio on Studio {
  __typename
  id
  createdAt
  updatedAt
  name
  description
  cover
  avatar
  type
  _count {
    games
    employees
  }
}
    `;
export const GameFragmentDoc = gql`
    fragment Game on Game {
  __typename
  id
  createdAt
  updatedAt
  adultOnly
  basicPrice
  coverImage
  price
  status
  type
  releaseDate
  name
  description
  type
  tags {
    ...Tag
  }
  genres {
    ...Genre
  }
  studios {
    contribution
    studio {
      ...Studio
    }
  }
}
    ${TagFragmentDoc}
${GenreFragmentDoc}
${StudioFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  __typename
  id
  avatar
  cover
  bio
  displayName
  fullName
  avatar
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
  avatar
  cover
  bio
  displayName
  fullName
  avatar
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
export const UpdateUserDocument = gql`
    mutation UpdateUser($values: UpdateUserInput!) {
  updateUser(values: $values) {
    ...Profile
  }
}
    ${ProfileFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
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
    query GetAllGames($pagination: CursorPaginationOptions!) {
  games(paginationOptions: $pagination) {
    edges {
      ...Game
    }
    pageInfo {
      ...CursorPage
    }
  }
}
    ${GameFragmentDoc}
${CursorPageFragmentDoc}`;

export function useGetAllGamesQuery(options: Omit<Urql.UseQueryArgs<GetAllGamesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllGamesQuery, GetAllGamesQueryVariables>({ query: GetAllGamesDocument, ...options });
};
export const GetAllStudiosDocument = gql`
    query GetAllStudios($pagination: CursorPaginationOptions!) {
  studios(paginationOptions: $pagination) {
    edges {
      ...Studio
    }
    pageInfo {
      ...CursorPage
    }
  }
}
    ${StudioFragmentDoc}
${CursorPageFragmentDoc}`;

export function useGetAllStudiosQuery(options: Omit<Urql.UseQueryArgs<GetAllStudiosQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllStudiosQuery, GetAllStudiosQueryVariables>({ query: GetAllStudiosDocument, ...options });
};
export const GetAllUsersDocument = gql`
    query GetAllUsers($pagination: CursorPaginationOptions!) {
  users(paginationOptions: $pagination) {
    edges {
      ...User
    }
    pageInfo {
      ...CursorPage
    }
  }
}
    ${UserFragmentDoc}
${CursorPageFragmentDoc}`;

export function useGetAllUsersQuery(options: Omit<Urql.UseQueryArgs<GetAllUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>({ query: GetAllUsersDocument, ...options });
};
export const GetStudioDocument = gql`
    query GetStudio($studio: GetStudioArgs!) {
  studio(getStudioArgs: $studio) {
    ...Studio
    employees {
      employee {
        fullName
        id
        displayName
      }
    }
    games {
      game {
        id
        name
        description
      }
    }
  }
}
    ${StudioFragmentDoc}`;

export function useGetStudioQuery(options: Omit<Urql.UseQueryArgs<GetStudioQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStudioQuery, GetStudioQueryVariables>({ query: GetStudioDocument, ...options });
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