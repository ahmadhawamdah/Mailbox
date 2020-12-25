DROP TABLE IF EXISTS mail;

CREATE TABLE mail(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), mailbox VARCHAR(32), mail jsonb, starred BOOLEAN);
