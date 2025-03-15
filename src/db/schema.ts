import {
  boolean,
  inet,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export const accessLimitType = pgEnum('access_limit_type', [
  'NONE',
  'DATETIME',
  'VISITS',
]);

export const shortlinks = pgTable('shortlinks', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).unique().notNull(),
  destinationUrl: text('destination_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  isActive: boolean('is_active').notNull().default(true),
  accessLimit: accessLimitType().notNull().default('NONE'),
  maxAccessDatetime: timestamp('max_access_datetime'),
  maxAccessVisits: integer('max_access_visits'),
});

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).unique().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const shortlinksTags = pgTable('shortlinks_tags', {
  shortlinksId: integer('shortlinks_id')
    .notNull()
    .references(() => shortlinks.id, { onDelete: 'cascade' }),
  tagsId: integer('tags_id')
    .notNull()
    .references(() => tags.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const analytics = pgTable('analytics', {
  id: serial('id').primaryKey(),
  shortlinksId: integer('shortlinks_id')
    .notNull()
    .references(() => shortlinks.id, { onDelete: 'cascade' }),
  visitedAt: timestamp('visited_at').notNull().defaultNow(),
  userAgent: text('user_agent'),
  ipAddress: inet('ip_address'),
});

export const orphanVisitType = pgEnum('orphan_visit_type', [
  'BASE_URL',
  'INVALID_SHORTLINK',
  'REGULAR_404',
]);

export const orphanVisits = pgTable('orphan_visits', {
  id: serial('id').primaryKey(),
  type: orphanVisitType().notNull(),
  visitedAt: timestamp('visited_at').notNull().defaultNow(),
  userAgent: text('user_agent'),
  ipAddress: inet('ip_address'),
});
