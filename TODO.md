# TODO: Fix Supabase Errors

## Tasks
- [x] Refactor src/lib/likes-comments-operations.ts to reuse existing Supabase client
- [x] Update likes operations to handle userId properly
- [x] Test likes functionality and verify no errors

## Details
- Remove duplicate Supabase client creation in likes-comments-operations.ts
- Import and use the typed Supabase client from src/integrations/supabase/client.ts
- Ensure userId is handled correctly in likes queries to avoid 406 errors
