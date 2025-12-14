-- Fix the revenue column to use bigint instead of integer
-- Run this in your Neon SQL Editor BEFORE running the seed script

-- Drop and recreate the revenue column as bigint
ALTER TABLE companies DROP COLUMN revenue;
ALTER TABLE companies ADD COLUMN revenue bigint;

-- Verify the column was changed
\d companies;
