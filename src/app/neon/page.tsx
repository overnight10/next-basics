import { neon } from '@neondatabase/serverless';
import nextConfig from '../../../next.config';

async function getData() {
  const sql = neon(nextConfig?.env?.DATABASE_URL as string);
  const response = await sql`SELECT version()`;
  return response[0].version;
}

export default async function Page() {
  const data = await getData();
  return <>{data}</>;
}