import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get path of current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { __dirname, __filename };
