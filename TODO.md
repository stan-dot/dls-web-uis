# Monorepo demo todo



## target tree structure

- apps

  - [x] TEMPLATE-vite-app
    - [x] davidia-client-example
    - [x] dedi app
  - [x] TEMPLATE-nextjs-14 app
    - xas standards app - NOPE - for now (?)

  - [ ] form my small projects
    - [ ] b18 
    - [ ] package comparator
    - [ ] bootstrap example

also IMPORTANT - cs-web-lib - only 190 files

- packages
  - (new)
    - utils
      - [x] download file
    - [x] citation form from xas-standards client - that is in UI
    - science
      - [x] ray class (from dedi)
      - [x] scientific unit logic (extracted from dedi)
    - graphs
      - plotting Plotter class
      - [x] svg eclipse
    - layouts
      - [ ] from frameworks comparison

- [ ] IMPORTANT - pato-frontend only 117 files


## acceptance tests

- [ ] deploy UI libraries to NPM with turbo
- [ ] deploy into kubernetes easily
- [ ] have a working dev mode
- [ ] tree structure from above

- [ ] from a template - for non-web-specialists users
  - [ ] test to showcase making a new thing there - from a template
  - [ ] always import as much config as possible
  - [ ] have an arkit for the whole thing and in each template with arkit config too?

## order of works

### for dedi - the first thing

- [x] dedi is the simplest case, start with that
- [x] add a template for vite and chakra with arkit
- [x] copy readme

- [x] double check files

  - [x] move the favicon
  - [x] double check .eslintj/cjs - not that needed

- [x] add all the necessary configs into the packages

  - [x] tsconfig
  - [x] eslint
  - [x] vite config

- [x] once that is fully done with splitting of some code logic into the packages https://turbo.build/repo/docs/handbook/sharing-code/internal-packages

for pnpm need to export from index.ts

  - [ ] science
    - [x] unit logic
    - [x] ray class
  - [ ] graph
    - [ ] Plotter class
    - [x] SVG eclipse

- [ ] regular components and files

  - [x] presets
  - [x] utils
  - [ ] calculations - partially done, need qrange and qspace
  - [ ] data entry - moved over stuffs
  - [ ] stores - moved, need arreglamiento

- [ ] just plain components (?)

  - [ ] dialogs
  - [ ] plot
  - [ ] results

- [ ] configure auto github pages deployment too https://turbo.build/repo/docs/ci/github-actions

- [ ] will have got one thing moved fully - too complicated at the moment, refactoring the dedi one

### other packages and apps

- move the packages
- move the apps
- test deployment
- think of one workspace with python as well?

## maybe doing

- packages (old)
  - davidia with storybook inside
  - diamondlightsource ui components
  - pato components

migrate xas standards to a supabase backend, independent of the frontend? just a next js app?
<https://chat.openai.com/c/cb512553-a543-4b0e-9e6e-bb43feeb308a>

to validate types arktype - better than JOI
<https://arktype.io/>

## not doing

- top level storybook for all the components - not doing now

  - <https://medium.com/@Seb_L/compose-your-turborepos-storybooks-and-deploy-them-to-vercel-94befbb78a56>
  - <https://turbo.build/repo/docs/handbook/tools/storybook>

- [ ] chakra config (?) in the template - yeah, best not to lock in right now

odd and possibly reject this

- pato-frontend-example - with custom dockerfile

- supabase workspace
  - <https://philipp.steinroetter.com/posts/supabase-turborepo>
  - <https://github.com/psteinroe/supasample>

## old dependencies

https://github.com/scijs/ndarray-concat-rows
