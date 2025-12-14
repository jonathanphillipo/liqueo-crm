-- Fix revenue column type issue in Neon DB
-- Run this in your Neon SQL Editor to fix the integer overflow error

-- Option 1: If you want to modify the existing table
-- (This will drop the revenue column and recreate it as bigint)
ALTER TABLE companies DROP COLUMN revenue;
ALTER TABLE companies ADD COLUMN revenue bigint;

-- Option 2: If you want to recreate the table (run this instead of Option 1)
-- DROP TABLE IF EXISTS companies CASCADE;
-- (Then run the table creation SQL from migrations/0000_productive_puck.sql)

-- Now run the seed script again
-- The revenue values are in USD (not millions), so:
-- BlackRock: $17.8 billion
-- UBS: $34.5 billion
-- Vanguard: $7.5 billion
-- etc.

-- After running this, execute db/seed.sql again
