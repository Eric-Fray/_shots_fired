// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Genders = {
  "MALE": "MALE",
  "FEMALE": "FEMALE"
};

const { Match, User, MatchUser } = initSchema(schema);

export {
  Match,
  User,
  MatchUser,
  Genders
};