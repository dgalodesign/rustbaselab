# Data Fetching Configuration

## Overview

This Next.js application uses **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)** for optimal performance and SEO. All data fetching is configured to use the `published_bases` view in Supabase exclusively.

## Published Bases View

### Purpose
The `published_bases` view filters the `bases` table to include only records with `status = 'published'`. This ensures:
- Only published content is visible to users
- Better query performance through view optimization
- Simplified query logic (no need to filter by status in every query)

### Schema
The view includes all columns from the `bases` table, including:
- `youtube_clicks` - Counter for YouTube video link clicks
- `created_at` - Publication date (used for "Meta Bases")
- All other base metadata and relationships

## Query Functions

### Core Principles
1. **Exclusive use of `published_bases` view** - Never query the `bases` table directly
2. **Graceful error handling** - All queries wrapped in try-catch blocks
3. **Fallback strategies** - If `youtube_clicks` column doesn't exist, fall back to `created_at` ordering
4. **Debug logging** - All errors logged with `[v0]` prefix for easy debugging

### Key Functions

#### `getMetaBases(limit = 6)`
Fetches the most recently published bases.
- **Sorting**: `created_at DESC`
- **Use case**: "Meta Bases" section on homepage
- **SSR/SSG**: Compatible with both

#### `getPopularBases(limit = 6)`
Fetches bases sorted by YouTube clicks.
- **Sorting**: `youtube_clicks DESC` (with fallback to `created_at DESC`)
- **Use case**: "Most Popular Bases" section on homepage
- **Error handling**: Automatically falls back if `youtube_clicks` column doesn't exist
- **SSR/SSG**: Compatible with both

#### `getFilteredBases(filters)`
Fetches bases with optional filters.
- **Filters**: `typeId`, `teamSizeId`, `footprintId`, `search`
- **Use case**: "All Bases" page with filter bar
- **SSR/SSG**: Compatible with both (filters passed as query params)

#### `incrementYoutubeClicks(baseId)`
Increments the click counter for a base's YouTube link.
- **Method**: Uses Supabase RPC function `increment_youtube_clicks`
- **Use case**: Called when user clicks YouTube video link
- **Client-side only**: This is a mutation, not a query

## Error Handling

### Column Not Found (42703)
If the `youtube_clicks` column doesn't exist in the `published_bases` view:
1. Error is caught and logged
2. Query automatically falls back to `created_at` ordering
3. User experience is not affected

### Network Errors
All network errors are caught and logged with the `[v0]` prefix. Empty arrays or null values are returned to prevent application crashes.

## Setup Instructions

### 1. Update the Published Bases View
Run the SQL script to ensure the view includes the `youtube_clicks` column:

\`\`\`bash
# Execute scripts/003-update-published-bases-view.sql in Supabase SQL Editor
\`\`\`

### 2. Verify RPC Function
Ensure the `increment_youtube_clicks` RPC function exists:

\`\`\`sql
-- Should already exist from scripts/002-create-increment-function.sql
SELECT * FROM pg_proc WHERE proname = 'increment_youtube_clicks';
\`\`\`

### 3. Test Queries
All queries are designed to work with both SSR and SSG:
- **SSR**: Data fetched on each request (always fresh)
- **SSG**: Data fetched at build time (can be revalidated with ISR)

## Performance Considerations

### View Benefits
- Pre-filtered data (only published bases)
- Indexed columns for faster sorting
- Reduced query complexity

### Caching Strategy
- Use Next.js `revalidate` option for ISR
- Consider implementing SWR for client-side data fetching
- Cache frequently accessed data (types, footprints, team sizes)

## Troubleshooting

### "Column does not exist" Error
1. Check if the view includes the column: `SELECT * FROM published_bases LIMIT 1;`
2. Run the update script: `scripts/003-update-published-bases-view.sql`
3. Verify the view was recreated: `\d+ published_bases`

### Empty Results
1. Check if bases exist with `status = 'published'`
2. Verify the view is returning data: `SELECT COUNT(*) FROM published_bases;`
3. Check console logs for `[v0]` error messages

### RPC Function Not Found
1. Run the script: `scripts/002-create-increment-function.sql`
2. Verify function exists: `SELECT * FROM pg_proc WHERE proname = 'increment_youtube_clicks';`
