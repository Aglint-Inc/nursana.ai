/* eslint-disable security/detect-non-literal-regexp */
import { readFile, writeFile } from 'fs';
import * as path from 'path';

const filePath = path.join('src/supabase-types/database.types.ts');

readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const result = data
    .toString()
    .replace(/export type/g, 'export') // Replaces 'export type' with 'export'
    .replace(/export\s+/g, 'export type ') // Ensures 'export' becomes 'export type'
    .replace(
      /export\s+type\s+Json\s*=\s*([\s\S]*?\n\n)/g,
      'export type Json = any;\n\n', // Changes Json type definition
    )
    .replace(/Args:\s*Record<PropertyKey,\s*never>/g, 'Args: {}'); // Replaces 'Args: Record<PropertyKey, never>' with 'Args: {}'

  writeFile(filePath, result, 'utf8', function (err) {
    if (err) return console.error(err);
  });
});
