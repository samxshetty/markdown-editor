import dotenv from 'dotenv';
import path from 'path';

console.log('Testing env loading...');
console.log('Current dir:', __dirname);

// Mimic the logic in pool.ts
dotenv.config();
if (!process.env.DATABASE_URL) {
    console.log('Default load failed, trying root...');
    const rootEnvPath = path.resolve(__dirname, '../../.env');
    console.log('Root env path:', rootEnvPath);
    dotenv.config({ path: rootEnvPath });
}

if (process.env.DATABASE_URL) {
    console.log('SUCCESS: DATABASE_URL loaded.');
} else {
    console.error('FAILURE: DATABASE_URL not loaded.');
}
