import { neon } from '@neondatabase/serverless';
import nextConfig from '../../../next.config';

async function getData() {
  const url = nextConfig?.env?.DATABASE_URL;
  if (!url) return 'No database url found';
  const sql = neon(nextConfig?.env?.DATABASE_URL as string);
  const response = await sql`SELECT version()`;
  return response[0].version;
}

export default async function Page() {
  const data = await getData();
  return <div>
    <span>Neon version: {data}</span>
    <br />
    <br />
    <h2>Next.js config</h2>
    <ul>{Object.entries(nextConfig?.env ?? {}).map(([key, value]) => <li key={key}>{key}: {value}</li>)}</ul>
    <br />
    <br />
    <h2>Process env</h2>
    <ul>
      {
        Object.entries(process?.env ?? {}).map(([key, value]) => <li key={key}>{key}: {value}</li>)
      }
    </ul>
  </div>;
}