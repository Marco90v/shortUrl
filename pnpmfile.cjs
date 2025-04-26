// pnpmfile.cjs
/** @type {import('pnpm').Hooks} */
module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies) {
        // Forzar Chakra y Zod a usar la versión mínima necesaria
        if (pkg.dependencies['@chakra-ui/react']) {
          pkg.dependencies['@chakra-ui/react'] = '^3.16.1';
        }
        if (pkg.dependencies['zod']) {
          pkg.dependencies['zod'] = '^3.24.3';
        }
      }
      return pkg;
    },
  },
};
