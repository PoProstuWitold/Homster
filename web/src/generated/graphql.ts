import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: File; output: File; }
};

export type AssignOrRevokeToGameInput = {
  activity: Scalars['String']['input'];
  game: Scalars['String']['input'];
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AuthResult = {
  __typename?: 'AuthResult';
  message?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type Count = {
  __typename?: 'Count';
  employees?: Maybe<Scalars['Int']['output']>;
  games?: Maybe<Scalars['Int']['output']>;
};

export type CreateGameInput = {
  basicPrice?: InputMaybe<Scalars['Float']['input']>;
  description: Scalars['String']['input'];
  developers: Array<Scalars['String']['input']>;
  genres: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  publishers: Array<Scalars['String']['input']>;
  releaseDate?: InputMaybe<Scalars['DateTime']['input']>;
  status: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type CreateGenreInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateStudioInput = {
  makeOwner?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateUploadInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CredentialsInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CursorPageInfo = {
  __typename?: 'CursorPageInfo';
  hasNext: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  nextCursor: Scalars['String']['output'];
  previousCursor: Scalars['String']['output'];
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
  cursor: Scalars['String']['input'];
  field: Scalars['String']['input'];
  take: Scalars['Float']['input'];
  type: Scalars['String']['input'];
};

export type FindGameArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Game = {
  __typename?: 'Game';
  adultOnly: Scalars['Boolean']['output'];
  allRating: Scalars['Float']['output'];
  allReviews: Scalars['Int']['output'];
  basicPrice: Scalars['Float']['output'];
  coverImage?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  genres?: Maybe<Array<Genre>>;
  id: Scalars['ID']['output'];
  media?: Maybe<Array<GameMedia>>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  recentRating: Scalars['Float']['output'];
  recentReviews: Scalars['Int']['output'];
  releaseDate?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  studios?: Maybe<Array<GameStudio>>;
  tags?: Maybe<Array<Tag>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  users?: Maybe<Array<User>>;
};

export type GameMedia = {
  __typename?: 'GameMedia';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type GameStudio = {
  __typename?: 'GameStudio';
  contribution: Scalars['String']['output'];
  game?: Maybe<Game>;
  gameId: Scalars['String']['output'];
  studio?: Maybe<Studio>;
  studioId: Scalars['String']['output'];
};

export type Genre = {
  __typename?: 'Genre';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  games?: Maybe<Array<Game>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GetStudioArgs = {
  name: Scalars['String']['input'];
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
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  cover?: InputMaybe<Scalars['Upload']['input']>;
  values: UpdateUserInput;
};


export type MutationUploadFileArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  values: CreateUploadInput;
};

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  currentPage: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
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
  field: Scalars['String']['input'];
  skip: Scalars['Float']['input'];
  take: Scalars['Float']['input'];
  type: Scalars['String']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  employments?: Maybe<Array<StudioEmployee>>;
  fullName: Scalars['String']['output'];
  games?: Maybe<Array<Game>>;
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  game: Game;
  games: CursorPaginatedGames;
  genres: OffsetPaginatedGenres;
  me: AuthResult;
  recommendations: Array<Game>;
  specialOffers: Array<Game>;
  studio: Studio;
  studios: CursorPaginatedStudios;
  tags: OffsetPaginatedTags;
  user: User;
  users: CursorPaginatedUsers;
};


export type QueryGameArgs = {
  data: FindGameArgs;
};


export type QueryGamesArgs = {
  paginationOptions: CursorPaginationOptions;
};


export type QueryGenresArgs = {
  paginationOptions: OffsetPaginationOptions;
};


export type QueryRecommendationsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
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
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  paginationOptions: CursorPaginationOptions;
};

export type Studio = {
  __typename?: 'Studio';
  _count?: Maybe<Count>;
  avatar?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  employees?: Maybe<Array<StudioEmployee>>;
  games?: Maybe<Array<GameStudio>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type StudioEmployee = {
  __typename?: 'StudioEmployee';
  assignedAt: Scalars['DateTime']['output'];
  assignedBy: Scalars['String']['output'];
  employee?: Maybe<User>;
  employeeId: Scalars['String']['output'];
  employmentType: Scalars['String']['output'];
  studio?: Maybe<Studio>;
  studioId: Scalars['String']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  games?: Maybe<Array<Game>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
};

export type UploadResult = {
  __typename?: 'UploadResult';
  description?: Maybe<Scalars['String']['output']>;
  imageFormatted?: Maybe<Scalars['String']['output']>;
  imageRaw?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  employments?: Maybe<Array<StudioEmployee>>;
  fullName: Scalars['String']['output'];
  games?: Maybe<Array<Game>>;
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CursorPageFragment = { __typename?: 'CursorPageInfo', hasNext: boolean, hasPrevious: boolean, previousCursor: string, nextCursor: string };

export type EmployeeFragment = { __typename?: 'StudioEmployee', employee?: { __typename: 'User', fullName: string, id: string, displayName: string } | null };

export type GameFragment = { __typename: 'Game', id: string, createdAt: any, updatedAt: any, adultOnly: boolean, basicPrice: number, coverImage?: string | null, price: number, status: string, type: string, releaseDate?: any | null, name: string, description: string, tags?: Array<{ __typename: 'Tag', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, genres?: Array<{ __typename: 'Genre', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, studios?: Array<{ __typename?: 'GameStudio', contribution: string, studio?: { __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null, employees?: Array<{ __typename?: 'StudioEmployee', employee?: { __typename: 'User', fullName: string, id: string, displayName: string } | null }> | null } | null }> | null, media?: Array<{ __typename: 'GameMedia', id: string, name?: string | null, description?: string | null, type?: string | null, url?: string | null }> | null };

export type GenreFragment = { __typename: 'Genre', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null };

export type StudioFragment = { __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null, employees?: Array<{ __typename?: 'StudioEmployee', employee?: { __typename: 'User', fullName: string, id: string, displayName: string } | null }> | null };

export type TagFragment = { __typename: 'Tag', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null };

export type UserFragment = { __typename: 'User', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any };

export type ProfileFragment = { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type RegisterMutationVariables = Exact<{
  fullName: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type UpdateUserMutationVariables = Exact<{
  values: UpdateUserInput;
  avatar?: InputMaybe<Scalars['Upload']['input']>;
  cover?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'AuthResult', statusCode?: number | null, message?: string | null, profile?: { __typename: 'Profile', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } | null } };

export type GetAllGamesQueryVariables = Exact<{
  pagination: CursorPaginationOptions;
}>;


export type GetAllGamesQuery = { __typename?: 'Query', games: { __typename?: 'CursorPaginatedGames', edges?: Array<{ __typename: 'Game', id: string, createdAt: any, updatedAt: any, adultOnly: boolean, basicPrice: number, coverImage?: string | null, price: number, status: string, type: string, releaseDate?: any | null, name: string, description: string, tags?: Array<{ __typename: 'Tag', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, genres?: Array<{ __typename: 'Genre', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, studios?: Array<{ __typename?: 'GameStudio', contribution: string, studio?: { __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null, employees?: Array<{ __typename?: 'StudioEmployee', employee?: { __typename: 'User', fullName: string, id: string, displayName: string } | null }> | null } | null }> | null, media?: Array<{ __typename: 'GameMedia', id: string, name?: string | null, description?: string | null, type?: string | null, url?: string | null }> | null }> | null, pageInfo: { __typename?: 'CursorPageInfo', hasNext: boolean, hasPrevious: boolean, previousCursor: string, nextCursor: string } } };

export type GetAllStudiosQueryVariables = Exact<{
  pagination: CursorPaginationOptions;
}>;


export type GetAllStudiosQuery = { __typename?: 'Query', studios: { __typename?: 'CursorPaginatedStudios', edges?: Array<{ __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null, employees?: Array<{ __typename?: 'StudioEmployee', employee?: { __typename: 'User', fullName: string, id: string, displayName: string } | null }> | null }> | null, pageInfo: { __typename?: 'CursorPageInfo', hasNext: boolean, hasPrevious: boolean, previousCursor: string, nextCursor: string } } };

export type GetAllUsersQueryVariables = Exact<{
  pagination: CursorPaginationOptions;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', users: { __typename?: 'CursorPaginatedUsers', edges?: Array<{ __typename: 'User', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any }> | null, pageInfo: { __typename?: 'CursorPageInfo', hasNext: boolean, hasPrevious: boolean, previousCursor: string, nextCursor: string } } };

export type GetOneGameQueryVariables = Exact<{
  data: FindGameArgs;
}>;


export type GetOneGameQuery = { __typename?: 'Query', game: { __typename: 'Game', id: string, createdAt: any, updatedAt: any, adultOnly: boolean, basicPrice: number, coverImage?: string | null, price: number, status: string, type: string, releaseDate?: any | null, name: string, description: string, tags?: Array<{ __typename: 'Tag', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, genres?: Array<{ __typename: 'Genre', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, studios?: Array<{ __typename?: 'GameStudio', contribution: string, studio?: { __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null, employees?: Array<{ __typename?: 'StudioEmployee', employee?: { __typename: 'User', fullName: string, id: string, displayName: string } | null }> | null } | null }> | null, media?: Array<{ __typename: 'GameMedia', id: string, name?: string | null, description?: string | null, type?: string | null, url?: string | null }> | null } };

export type GetRecommendationsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetRecommendationsQuery = { __typename?: 'Query', recommendations: Array<{ __typename: 'Game', id: string, createdAt: any, updatedAt: any, adultOnly: boolean, basicPrice: number, coverImage?: string | null, price: number, status: string, type: string, releaseDate?: any | null, name: string, description: string, tags?: Array<{ __typename: 'Tag', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, genres?: Array<{ __typename: 'Genre', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, studios?: Array<{ __typename?: 'GameStudio', contribution: string, studio?: { __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null, employees?: Array<{ __typename?: 'StudioEmployee', employee?: { __typename: 'User', fullName: string, id: string, displayName: string } | null }> | null } | null }> | null, media?: Array<{ __typename: 'GameMedia', id: string, name?: string | null, description?: string | null, type?: string | null, url?: string | null }> | null }> };

export type GetSpecialOffersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpecialOffersQuery = { __typename?: 'Query', specialOffers: Array<{ __typename: 'Game', id: string, createdAt: any, updatedAt: any, adultOnly: boolean, basicPrice: number, coverImage?: string | null, price: number, status: string, type: string, releaseDate?: any | null, name: string, description: string, tags?: Array<{ __typename: 'Tag', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, genres?: Array<{ __typename: 'Genre', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null }> | null, studios?: Array<{ __typename?: 'GameStudio', contribution: string, studio?: { __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null, employees?: Array<{ __typename?: 'StudioEmployee', employee?: { __typename: 'User', fullName: string, id: string, displayName: string } | null }> | null } | null }> | null, media?: Array<{ __typename: 'GameMedia', id: string, name?: string | null, description?: string | null, type?: string | null, url?: string | null }> | null }> };

export type GetStudioQueryVariables = Exact<{
  studio: GetStudioArgs;
}>;


export type GetStudioQuery = { __typename?: 'Query', studio: { __typename: 'Studio', id: string, createdAt: any, updatedAt: any, name: string, description?: string | null, cover?: string | null, avatar?: string | null, type: string, employees?: Array<{ __typename?: 'StudioEmployee', employee?: { __typename: 'User', fullName: string, id: string, displayName: string } | null }> | null, games?: Array<{ __typename?: 'GameStudio', game?: { __typename?: 'Game', id: string, name: string, description: string } | null }> | null, _count?: { __typename?: 'Count', games?: number | null, employees?: number | null } | null } };

export type GetUserByFieldQueryVariables = Exact<{
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
}>;


export type GetUserByFieldQuery = { __typename?: 'Query', user: { __typename: 'User', id: string, avatar?: string | null, cover?: string | null, bio?: string | null, displayName: string, fullName: string, email: string, role: string, createdAt: any, updatedAt: any } };

export type GetUserQueryVariables = Exact<{
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
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
export const EmployeeFragmentDoc = gql`
    fragment Employee on StudioEmployee {
  employee {
    __typename
    fullName
    id
    displayName
  }
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
  employees {
    ...Employee
  }
}
    ${EmployeeFragmentDoc}`;
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
  media {
    __typename
    id
    name
    description
    type
    url
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
    mutation UpdateUser($values: UpdateUserInput!, $avatar: Upload, $cover: Upload) {
  updateUser(values: $values, avatar: $avatar, cover: $cover) {
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
export const GetOneGameDocument = gql`
    query GetOneGame($data: FindGameArgs!) {
  game(data: $data) {
    ...Game
  }
}
    ${GameFragmentDoc}`;

export function useGetOneGameQuery(options: Omit<Urql.UseQueryArgs<GetOneGameQueryVariables>, 'query'>) {
  return Urql.useQuery<GetOneGameQuery, GetOneGameQueryVariables>({ query: GetOneGameDocument, ...options });
};
export const GetRecommendationsDocument = gql`
    query GetRecommendations($userId: String) {
  recommendations(userId: $userId) {
    ...Game
  }
}
    ${GameFragmentDoc}`;

export function useGetRecommendationsQuery(options?: Omit<Urql.UseQueryArgs<GetRecommendationsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetRecommendationsQuery, GetRecommendationsQueryVariables>({ query: GetRecommendationsDocument, ...options });
};
export const GetSpecialOffersDocument = gql`
    query GetSpecialOffers {
  specialOffers {
    ...Game
  }
}
    ${GameFragmentDoc}`;

export function useGetSpecialOffersQuery(options?: Omit<Urql.UseQueryArgs<GetSpecialOffersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSpecialOffersQuery, GetSpecialOffersQueryVariables>({ query: GetSpecialOffersDocument, ...options });
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
export const GetUserByFieldDocument = gql`
    query GetUserByField($field: String!, $value: String!) {
  user(field: $field, value: $value) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useGetUserByFieldQuery(options: Omit<Urql.UseQueryArgs<GetUserByFieldQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserByFieldQuery, GetUserByFieldQueryVariables>({ query: GetUserByFieldDocument, ...options });
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