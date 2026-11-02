import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const required = ['index.html', 'privacy/index.html', 'terms/index.html', 'assets/style.css', 'CNAME'];
for (const file of required) {
  if (!existsSync(resolve(root, file))) throw new Error(`Missing ${file}`);
}

const home = readFileSync(resolve(root, 'index.html'), 'utf8');
const privacy = readFileSync(resolve(root, 'privacy/index.html'), 'utf8');
const terms = readFileSync(resolve(root, 'terms/index.html'), 'utf8');
const cname = readFileSync(resolve(root, 'CNAME'), 'utf8').trim();

if (!home.includes('<title>iBlue — Automatisation personnelle</title>')) throw new Error('Homepage title missing');
if (!home.includes('href="privacy/"')) throw new Error('Homepage privacy link missing');
if (!privacy.includes('<title>Politique de confidentialité — iBlue</title>')) throw new Error('Privacy title missing');
if (!privacy.includes('Google API Services User Data Policy')) throw new Error('Google policy disclosure missing');
if (!terms.includes('<title>Conditions d’utilisation — iBlue</title>')) throw new Error('Terms title missing');
if (!home.includes('href="terms/"')) throw new Error('Homepage terms link missing');
if (cname !== 'oauth.guillaumerossi.com') throw new Error('Unexpected CNAME');

console.log('Site checks passed: homepage, privacy policy, assets and CNAME are present.');
