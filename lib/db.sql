--! ALL THE BELOW TABLES AND TRIGGERS ARE IN SUPABASE'S threads_clone SCHEMA

--
-- Name: threads_clone; Type: SCHEMA;
--
CREATE SCHEMA threads_clone;
 
GRANT USAGE ON SCHEMA threads_clone TO service_role;
GRANT ALL ON SCHEMA threads_clone TO postgres;
 
--
-- Create users table
--
CREATE TABLE IF NOT EXISTS threads_clone.users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text,
    email text,
    "emailVerified" timestamp with time zone,
    image text,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
);
 
GRANT ALL ON TABLE threads_clone.users TO postgres;
GRANT ALL ON TABLE threads_clone.users TO service_role;
 
--- uid() function to be used in RLS policies
CREATE FUNCTION threads_clone.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select
  	coalesce(
		nullif(current_setting('request.jwt.claim.sub', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
	)::uuid
$$;
 
--
-- Create sessions table
--
CREATE TABLE IF NOT EXISTS threads_clone.sessions
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    expires timestamp with time zone NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" uuid,
    CONSTRAINT sessions_pkey PRIMARY KEY (id),
    CONSTRAINT sessionToken_unique UNIQUE ("sessionToken"),
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES  threads_clone.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
 
GRANT ALL ON TABLE threads_clone.sessions TO postgres;
GRANT ALL ON TABLE threads_clone.sessions TO service_role;
 
--
-- Create accounts table
--
CREATE TABLE IF NOT EXISTS threads_clone.accounts
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    oauth_token_secret text,
    oauth_token text,
    "userId" uuid,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT provider_unique UNIQUE (provider, "providerAccountId"),
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES  threads_clone.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
 
GRANT ALL ON TABLE threads_clone.accounts TO postgres;
GRANT ALL ON TABLE threads_clone.accounts TO service_role;
 
--
-- Create verification_tokens table
--
CREATE TABLE IF NOT EXISTS threads_clone.verification_tokens
(
    identifier text,
    token text,
    expires timestamp with time zone NOT NULL,
    CONSTRAINT verification_tokens_pkey PRIMARY KEY (token),
    CONSTRAINT token_unique UNIQUE (token),
    CONSTRAINT token_identifier_unique UNIQUE (token, identifier)
);
 
GRANT ALL ON TABLE threads_clone.verification_tokens TO postgres;
GRANT ALL ON TABLE threads_clone.verification_tokens TO service_role;

--
-- Altering the users table to contain additional info
--
ALTER TABLE threads_clone.users 
ADD COLUMN username TEXT UNIQUE, 
ADD COLUMN bio TEXT;

--
-- Create Posts table (Tweets and Comments)
--
CREATE TABLE IF NOT EXISTS threads_clone.posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES threads_clone.users(id),
  content text,
  parent_id uuid REFERENCES threads_clone.posts(id) ON DELETE CASCADE,
  likes_count integer DEFAULT 0,
  retweets_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

--
-- Index for quickly fetching comments
--
CREATE INDEX idx_posts_parent_id ON threads_clone.posts(parent_id);

--
-- Create Likes table
--
CREATE TABLE IF NOT EXISTS threads_clone.likes (
  user_id uuid NOT NULL REFERENCES threads_clone.users(id),
  post_id uuid NOT NULL REFERENCES threads_clone.posts(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);

--
-- Create Retweets table
--
CREATE TABLE IF NOT EXISTS threads_clone.retweets (
  user_id uuid NOT NULL REFERENCES threads_clone.users(id),
  post_id uuid NOT NULL REFERENCES threads_clone.posts(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (user_id, post_id)
);

--
-- Create Follows table
--
CREATE TABLE IF NOT EXISTS threads_clone.follows (
  follower_id uuid NOT NULL REFERENCES threads_clone.users(id),
  following_id uuid NOT NULL REFERENCES threads_clone.users(id),
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (follower_id, following_id)
);

--
-- Trigger to update post's likes count
--
CREATE OR REPLACE FUNCTION threads_clone.update_likes_count() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE threads_clone.posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE threads_clone.posts 
    SET likes_count = GREATEST(0, likes_count - 1) 
    WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_likes_count
AFTER INSERT OR DELETE ON threads_clone.likes
FOR EACH ROW EXECUTE FUNCTION threads_clone.update_likes_count();

--
-- Trigger to update post's retweets count
--
CREATE OR REPLACE FUNCTION threads_clone.update_retweets_count() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE threads_clone.posts SET retweets_count = retweets_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE threads_clone.posts 
    SET retweets_count = GREATEST(0, retweets_count - 1) 
    WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_retweets_count
AFTER INSERT OR DELETE ON threads_clone.retweets
FOR EACH ROW EXECUTE FUNCTION threads_clone.update_retweets_count();

--
-- Trigger to update comments count
--
CREATE OR REPLACE FUNCTION threads_clone.update_comments_count() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.parent_id IS NOT NULL THEN
    UPDATE threads_clone.posts SET comments_count = comments_count + 1 WHERE id = NEW.parent_id;
  ELSIF TG_OP = 'DELETE' AND OLD.parent_id IS NOT NULL THEN
    UPDATE threads_clone.posts 
    SET comments_count = GREATEST(0, comments_count - 1) 
    WHERE id = OLD.parent_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_comments_count
AFTER INSERT OR DELETE ON threads_clone.posts
FOR EACH ROW EXECUTE FUNCTION threads_clone.update_comments_count();

--
-- Alter Users Table to Add Follower/Following Count
--
ALTER TABLE threads_clone.users
ADD COLUMN IF NOT EXISTS follower_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS following_count integer DEFAULT 0;

--
-- Trigger to update follower/following count
--
CREATE OR REPLACE FUNCTION threads_clone.update_follow_counts() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE threads_clone.users SET follower_count = follower_count + 1 WHERE id = NEW.following_id;
    UPDATE threads_clone.users SET following_count = following_count + 1 WHERE id = NEW.follower_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE threads_clone.users 
    SET follower_count = GREATEST(0, follower_count - 1) 
    WHERE id = OLD.following_id;
    UPDATE threads_clone.users 
    SET following_count = GREATEST(0, following_count - 1) 
    WHERE id = OLD.follower_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_follow_counts
AFTER INSERT OR DELETE ON threads_clone.follows
FOR EACH ROW EXECUTE FUNCTION threads_clone.update_follow_counts();
