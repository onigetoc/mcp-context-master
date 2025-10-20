// Liste des librairies à exclure du setup automatique Context Master
// Ces librairies sont trop communes, déjà bien documentées, ou génèrent trop de contexte inutile

export interface ExclusionResult {
  exclude: boolean;
  reason?: string;
  matchedPattern?: string;
}

export const MCP_EXCLUSION_LIST = {
  // UI Libraries - Trop communes et bien documentées
  radix: ["@radix-ui", "@radix", "radix-ui"],
  
  // Node.js Built-ins - Déjà inclus dans Node.js
  nodeBuiltins: [
    "fs", "path", "http", "https", "os", "crypto", "util", "events",
    "stream", "buffer", "url", "querystring", "zlib", "child_process",
    "cluster", "dgram", "dns", "net", "readline", "repl", "tls", "tty",
    "v8", "vm", "worker_threads", "assert", "async_hooks", "perf_hooks",
    "inspector", "timers", "console", "process", "global"
  ],

  // Frameworks très communs - Déjà bien connus des LLM
  commonFrameworks: [
    "react", "vue", "angular", "svelte", "jquery",
    "express", "koa", "fastify", "hapi",
    "lodash", "underscore", "ramda",
    "axios", "fetch", "request",
    "moment", "date-fns", "dayjs"
  ],

  // Testing Libraries - Bien documentées
  testing: [
    "jest", "mocha", "chai", "jasmine", "karma", "cypress", "playwright",
    "testing-library", "@testing-library", "enzyme", "sinon"
  ],

  // Build Tools - Configuration plutôt que code
  buildTools: [
    "webpack", "rollup", "parcel", "vite", "esbuild",
    "babel", "@babel", "typescript", "eslint", "prettier",
    "postcss", "autoprefixer", "sass", "less", "stylus"
  ],

  // Type definitions - Pas besoin de documentation
  typeDefinitions: [
    "@types/"
  ],

  // CSS Frameworks - Trop de contenu CSS inutile
  cssFrameworks: [
    "bootstrap", "bulma", "foundation", "semantic-ui",
    "material-ui", "@mui", "ant-design", "antd",
    "chakra-ui", "@chakra-ui", "tailwindcss", "@tailwindcss"
  ],

  // Utility Libraries - Simples et bien documentées
  utilities: [
    "classnames", "clsx", "prop-types", "validator",
    "uuid", "nanoid", "shortid", "ms", "debug",
    "chalk", "colors", "commander", "yargs", "inquirer"
  ],

  // Database Drivers - Basiques
  databaseDrivers: [
    "mysql", "mysql2", "pg", "sqlite3", "mongodb",
    "redis", "ioredis", "mongoose"
  ],

  // Polyfills et Shims
  polyfills: [
    "core-js", "regenerator-runtime", "whatwg-fetch",
    "es6-promise", "es6-shim", "babel-polyfill"
  ],

  // State Management - Bien documentés (sauf zustand qui est spécialisé)
  stateManagement: [
    "redux", "mobx", "recoil"
  ],

  // Animation Libraries - Basiques
  animations: [
    "framer-motion", "react-spring", "lottie-react"
  ],

  // Validation Libraries - Communes
  validation: [
    "joi", "yup", "ajv", "class-validator"
  ],

  // Logging Libraries - Basiques
  logging: [
    "winston", "bunyan", "pino", "log4js"
  ],

  // Python Built-ins et packages très communs
  pythonCommon: [
    "pip", "setuptools", "wheel", "requests", "urllib3", "certifi",
    "numpy", "pandas", "matplotlib", "scipy", "scikit-learn",
    "pytest", "black", "flake8", "mypy", "isort", "autopep8",
    "django", "flask", "fastapi", "sqlalchemy", "alembic",
    "pydantic", "click", "typer", "rich", "colorama",
    "python-dotenv", "pyyaml", "toml", "configparser"
  ]
} as const;

// Fonction pour vérifier si une librairie doit être exclue
export function shouldExcludeLibrary(libraryName: string): ExclusionResult {
  const name = libraryName.toLowerCase();
  
  // Vérifier chaque catégorie
  for (const [category, libraries] of Object.entries(MCP_EXCLUSION_LIST)) {
    for (const lib of libraries) {
      const libLower = lib.toLowerCase();
      
      // Vérification exacte ou par préfixe pour les scoped packages
      if (name === libLower || 
          name.startsWith(libLower + '/') || 
          name.startsWith(libLower + '-') ||
          (libLower.startsWith('@') && name.startsWith(libLower)) ||
          (libLower.endsWith('/') && name.startsWith(libLower))) { // Pour @types/
        return { 
          exclude: true, 
          reason: category, 
          matchedPattern: lib 
        };
      }
    }
  }
  
  return { exclude: false };
}

// Librairies spécialisées à GARDER (override la liste d'exclusion si nécessaire)
export const SPECIALIZED_LIBRARIES = [
  "fs-extra", "path-extra", // Extensions Node.js utiles
  "prisma", "@prisma/client", // ORM spécialisé
  "trpc", "@trpc/server", "@trpc/client", // Framework API spécialisé
  "remotion", "@remotion/renderer", // Librairie vidéo spécialisée
  "clerk", "@clerk/nextjs", // Auth spécialisé
  "stripe", "@stripe/stripe-js", // Paiement spécialisé
  "supabase", "@supabase/supabase-js", // Backend spécialisé
  "firebase", "firebase-admin", // Backend spécialisé
  "graphql", "@apollo/client", // GraphQL spécialisé
  "socket.io", "socket.io-client", // WebSocket spécialisé
  "three", "three.js", "@react-three/fiber", // 3D spécialisé
  "d3", "d3-selection", // Visualisation spécialisée
  "electron", // Desktop app spécialisé
  "puppeteer", "playwright", // Automation spécialisée
  "sharp", "jimp", // Image processing spécialisé
  "pdf-lib", "jspdf", // PDF spécialisé
  "nodemailer", "@sendgrid/mail", // Email spécialisé
  "bcrypt", "bcryptjs", "argon2", // Crypto spécialisé
  "jsonwebtoken", "jose", // JWT spécialisé
  "multer", "formidable", // File upload spécialisé
  "cheerio", "jsdom", // HTML parsing spécialisé
  "xml2js", "fast-xml-parser", // XML parsing spécialisé
  "csv-parser", "papaparse", // CSV parsing spécialisé
  "compression", "helmet", // Security spécialisé
  "rate-limiter-flexible", "express-rate-limit", // Rate limiting spécialisé
  "bull", "agenda", // Job queue spécialisé
  "passport", "passport-local", // Auth strategy spécialisé
  "swagger-ui-express", "swagger-jsdoc", // API doc spécialisé
  "helmet", "cors", // Security middleware spécialisé
  "zustand", // State management spécialisé
  "next", "nextjs", "@next/", // Framework spécialisé
];

// Fonction pour vérifier si une librairie est spécialisée (à garder même si dans la liste d'exclusion)
export function isSpecializedLibrary(libraryName: string): boolean {
  const name = libraryName.toLowerCase();
  return SPECIALIZED_LIBRARIES.some(lib => 
    name === lib.toLowerCase() || 
    name.startsWith(lib.toLowerCase() + '/') ||
    name.startsWith(lib.toLowerCase() + '-')
  );
}

// Fonction principale pour déterminer si on doit télécharger la documentation
export function shouldDownloadDocumentation(libraryName: string): ExclusionResult {
  // D'abord vérifier si c'est une librairie spécialisée
  if (isSpecializedLibrary(libraryName)) {
    return { exclude: false };
  }
  
  // Ensuite vérifier la liste d'exclusion
  return shouldExcludeLibrary(libraryName);
}