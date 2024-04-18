// vite.config.ts
import { config } from "file:///scratch/xma12127/projects/migrate/dls-web-uis/packages/vite-config/shared-config.js";
import path from "path";
import { defineConfig } from "file:///scratch/xma12127/projects/migrate/dls-web-uis/node_modules/.pnpm/vite@5.2.9/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/scratch/xma12127/projects/migrate/dls-web-uis/apps/TEMPLATE-vite-app";
var vite_config_default = defineConfig({
  ...config,
  // NOTE - here you can override the shared config
  // plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvc2NyYXRjaC94bWExMjEyNy9wcm9qZWN0cy9taWdyYXRlL2Rscy13ZWItdWlzL2FwcHMvVEVNUExBVEUtdml0ZS1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9zY3JhdGNoL3htYTEyMTI3L3Byb2plY3RzL21pZ3JhdGUvZGxzLXdlYi11aXMvYXBwcy9URU1QTEFURS12aXRlLWFwcC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vc2NyYXRjaC94bWExMjEyNy9wcm9qZWN0cy9taWdyYXRlL2Rscy13ZWItdWlzL2FwcHMvVEVNUExBVEUtdml0ZS1hcHAvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdAcmVwby92aXRlLWNvbmZpZydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoeyAuLi5jb25maWcsIFxuICAvLyBOT1RFIC0gaGVyZSB5b3UgY2FuIG92ZXJyaWRlIHRoZSBzaGFyZWQgY29uZmlnXG4gIC8vIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgJ0Bjb21wb25lbnRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbXBvbmVudHMnKSxcbiAgICB9LFxuICB9LFxufSlcblxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsY0FBYztBQUN2QixPQUFPLFVBQVU7QUFDakIsU0FBUyxvQkFBb0I7QUFIN0IsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFBRSxHQUFHO0FBQUE7QUFBQTtBQUFBLEVBRy9CLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxlQUFlLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxJQUMzRDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=