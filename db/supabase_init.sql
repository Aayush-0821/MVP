-- Supabase initialization SQL for MVP project
-- Run this in your Supabase SQL editor to create the minimal tables used by the app

-- results: stores quiz/game outcomes
create table if not exists results (
  id bigserial primary key,
  user_id uuid null,
  user_email text null,
  quiz text not null,
  score int not null,
  max_score int null,
  metadata jsonb null,
  created_at timestamptz default now()
);

-- optional: a small quizzes table to store quiz definitions (title, slug, meta)
create table if not exists quizzes (
  id bigserial primary key,
  slug text unique not null,
  title text not null,
  metadata jsonb null,
  created_at timestamptz default now()
);

-- Example seed data
insert into quizzes (slug, title, metadata) values
('encryption-quiz', 'Encryption Basics Quiz', '{"questions_count":5}')
on conflict (slug) do nothing;

-- Questions table: store questions and answers as JSONB
create table if not exists questions (
  id bigserial primary key,
  quiz_id bigint references quizzes(id) on delete cascade,
  question_text text not null,
  answers jsonb not null,
  metadata jsonb null,
  created_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_results_created_at on results(created_at);
create index if not exists idx_results_user_id on results(user_id);
create index if not exists idx_questions_quiz_id on questions(quiz_id);

-- Profiles table: optional user profile data (display name, avatar)
create table if not exists profiles (
  user_id uuid primary key,
  email text unique,
  display_name text,
  avatar text,
  metadata jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_profiles_email on profiles(email);

-- Leaderboard view: best score per user
create or replace view leaderboard as
select
  results.user_id,
  results.user_email,
  profiles.username,
  profiles.display_name,
  coalesce(profiles.username, profiles.display_name, profiles.full_name, profiles.email, results.user_email, results.user_id::text, 'Anonymous User') as display_name,
  max(results.score) as best_score,
  max(results.created_at) as latest_at
from results
left join profiles on results.user_id = profiles.user_id
group by results.user_id, results.user_email, profiles.username, profiles.display_name, profiles.full_name, profiles.email
order by best_score desc;

-- Seed questions for the encryption quiz (matches client fallback)
insert into questions (quiz_id, question_text, answers) values
((select id from quizzes where slug='encryption-quiz' limit 1),
 'What does ''encryption'' mean in cybersecurity?',
 '[{"text":"Converting data into a secret code","correct":true},{"text":"Deleting all data","correct":false},{"text":"Backing up data","correct":false},{"text":"Sharing files publicly","correct":false}]'::jsonb
),
((select id from quizzes where slug='encryption-quiz' limit 1),
 'Which of the following is a strong password?',
 '[{"text":"password123","correct":false},{"text":"qwerty","correct":false},{"text":"H@ckMe2025!","correct":true},{"text":"myname123","correct":false}]'::jsonb
),
((select id from quizzes where slug='encryption-quiz' limit 1),
 'What does ''HTTPS'' mean in a website URL?',
 '[{"text":"HyperText Transfer Protocol Secure","correct":true},{"text":"High Transfer Text Protocol","correct":false},{"text":"HyperText Transmission Path","correct":false},{"text":"Home Transfer Protocol Service","correct":false}]'::jsonb
),
((select id from quizzes where slug='encryption-quiz' limit 1),
 'What is phishing?',
 '[{"text":"Catching real fish","correct":false},{"text":"Sending fake emails to steal information","correct":true},{"text":"Encrypting your messages","correct":false},{"text":"Updating your antivirus","correct":false}]'::jsonb
),
((select id from quizzes where slug='encryption-quiz' limit 1),
 'Which of the following helps protect your computer?',
 '[{"text":"Firewall","correct":true},{"text":"Malware","correct":false},{"text":"Spyware","correct":false},{"text":"Phishing link","correct":false}]'::jsonb
)
on conflict do nothing;

-- Row-Level Security (RLS) policy examples (apply in Supabase SQL editor as needed)
-- Note: enabling RLS requires careful testing; these are suggested safe defaults.
-- alter table results enable row level security;
-- create policy "public_select_results" on results for select using (true);
-- create policy "insert_results_authenticated" on results for insert using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- PROFILES TABLE (EXTENDED)
create table if not exists profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  username text unique,
  display_name text,
  avatar_url text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_profiles_email on profiles(email);
create index if not exists idx_profiles_username on profiles(username);
