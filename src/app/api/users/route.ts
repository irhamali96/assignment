import { NextResponse } from 'next/server';

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
  { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com' },
  { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com' },
  { id: 6, name: 'Diana Prince', email: 'diana.prince@example.com' },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const pageSize = 3;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedUsers = users.slice(startIndex, endIndex);

  const hasMore = endIndex < users.length;

  return NextResponse.json({
    users: paginatedUsers,
    total: users.length,
    page,
    pageSize,
    hasMore,
  });
}
