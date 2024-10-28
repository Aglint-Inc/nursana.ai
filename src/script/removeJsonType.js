"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable security/detect-non-literal-regexp */
var fs_1 = require("fs");
var path = require("path");
var filePath = path.join('src/supabase-types/database.types.ts');
(0, fs_1.readFile)(filePath, 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var result = data
        .toString()
        .replace(/export type/g, 'export') // Replaces 'export type' with 'export'
        .replace(/export\s+/g, 'export type ') // Ensures 'export' becomes 'export type'
        .replace(/export\s+type\s+Json\s*=\s*([\s\S]*?\n\n)/g, 'export type Json = any;\n\n')
        .replace(/Args:\s*Record<PropertyKey,\s*never>/g, 'Args: {}'); // Replaces 'Args: Record<PropertyKey, never>' with 'Args: {}'
    (0, fs_1.writeFile)(filePath, result, 'utf8', function (err) {
        if (err)
            return console.error(err);
    });
});
