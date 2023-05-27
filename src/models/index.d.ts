import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum Genders {
  MALE = "MALE",
  FEMALE = "FEMALE"
}



type EagerMatch = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Match, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly User?: (MatchUser | null)[] | null;
  readonly User1?: User | null;
  readonly User2?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchUser1Id?: string | null;
  readonly matchUser2Id?: string | null;
}

type LazyMatch = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Match, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly User: AsyncCollection<MatchUser>;
  readonly User1: AsyncItem<User | undefined>;
  readonly User2: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchUser1Id?: string | null;
  readonly matchUser2Id?: string | null;
}

export declare type Match = LazyLoading extends LazyLoadingDisabled ? EagerMatch : LazyMatch

export declare const Match: (new (init: ModelInit<Match>) => Match) & {
  copyOf(source: Match, mutator: (draft: MutableModel<Match>) => MutableModel<Match> | void): Match;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio?: string | null;
  readonly gender: Genders | keyof typeof Genders;
  readonly lookingFor: Genders | keyof typeof Genders;
  readonly UserMatches?: (MatchUser | null)[] | null;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio?: string | null;
  readonly gender: Genders | keyof typeof Genders;
  readonly lookingFor: Genders | keyof typeof Genders;
  readonly UserMatches: AsyncCollection<MatchUser>;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerMatchUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MatchUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly matchId?: string | null;
  readonly userId?: string | null;
  readonly match: Match;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMatchUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MatchUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly matchId?: string | null;
  readonly userId?: string | null;
  readonly match: AsyncItem<Match>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MatchUser = LazyLoading extends LazyLoadingDisabled ? EagerMatchUser : LazyMatchUser

export declare const MatchUser: (new (init: ModelInit<MatchUser>) => MatchUser) & {
  copyOf(source: MatchUser, mutator: (draft: MutableModel<MatchUser>) => MutableModel<MatchUser> | void): MatchUser;
}