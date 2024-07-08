// vite.config.ts
import { config } from "file:///scratch/xma12127/projects/frontends/dls-web-uis/packages/vite-config/shared-config.js";
import react from "file:///scratch/xma12127/projects/frontends/dls-web-uis/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { defineConfig } from "file:///scratch/xma12127/projects/frontends/dls-web-uis/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/scratch/xma12127/projects/frontends/dls-web-uis/apps/bluegui";
var vite_config_default = defineConfig({
  ...config,
  // NOTE - here you can override the shared config
  plugins: [react()],
  define: {
    global: {}
    // needed for the floater for the joyride
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      alias: {
        "@mui": path.resolve(__vite_injected_original_dirname, "node_modules/@mui")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvc2NyYXRjaC94bWExMjEyNy9wcm9qZWN0cy9mcm9udGVuZHMvZGxzLXdlYi11aXMvYXBwcy9ibHVlZ3VpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvc2NyYXRjaC94bWExMjEyNy9wcm9qZWN0cy9mcm9udGVuZHMvZGxzLXdlYi11aXMvYXBwcy9ibHVlZ3VpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9zY3JhdGNoL3htYTEyMTI3L3Byb2plY3RzL2Zyb250ZW5kcy9kbHMtd2ViLXVpcy9hcHBzL2JsdWVndWkvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiQHJlcG8vdml0ZS1jb25maWdcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLi4uY29uZmlnLFxuICAvLyBOT1RFIC0gaGVyZSB5b3UgY2FuIG92ZXJyaWRlIHRoZSBzaGFyZWQgY29uZmlnXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgZGVmaW5lOiB7XG4gICAgZ2xvYmFsOiB7fSwgLy8gbmVlZGVkIGZvciB0aGUgZmxvYXRlciBmb3IgdGhlIGpveXJpZGVcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgIFwiQGNvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb21wb25lbnRzXCIpLFxuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0BtdWknOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnbm9kZV9tb2R1bGVzL0BtdWknKVxuICAgICAgICB9XG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsY0FBYztBQUN2QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBSjdCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLEdBQUc7QUFBQTtBQUFBLEVBRUgsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLFFBQVEsQ0FBQztBQUFBO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLGVBQWUsS0FBSyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQ3ZELE9BQU87QUFBQSxRQUNILFFBQVEsS0FBSyxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLE1BQ3ZEO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=