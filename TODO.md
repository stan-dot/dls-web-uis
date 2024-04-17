
# Monorepo demo todo

propaganda
<https://vercel.com/blog/how-supabase-elevated-their-developer-experience-with-turborepo>

## target tree structure

- apps
  - TEMPLATE-vite-app
    - davidia-client-example
    - dedi app
  - TEMPLATE-nextjs-14 app
    - xas standards app
  
odd and possibly reject this

- pato-frontend-example - with custom dockerfile

- supabase workspace
  - <https://philipp.steinroetter.com/posts/supabase-turborepo>
  - <https://github.com/psteinroe/supasample>

- packages 
  - (old)
    - davidia with storybook inside 
    - diamondlightsource ui components
    - pato components
  - (new)
    - science
      - ray class (from dedi)
      - scientific unit logic (extracted from dedi)
    - graphs
      - plotting Plotter class
      - svg eclipse
    - layouts
      - from frameworks comparison
    - utils 
      - download file
    - citation form from xas-standards client
    - top level storybook for all the components
      - <https://medium.com/@Seb_L/compose-your-turborepos-storybooks-and-deploy-them-to-vercel-94befbb78a56>
      - <https://turbo.build/repo/docs/handbook/tools/storybook>

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

- [ ] add all the necessary configs into the packages
  - [x] tsconfig
  - [x] eslint
  - [ ] vite config

- [ ] once that is fully done with splitting of some code logic into the packages  https://turbo.build/repo/docs/handbook/sharing-code/internal-packages
  - [ ] science 
    - [ ] unit logic
    - [ ] ray class
  - [ ] graph
    - [ ] Plotter class
    - [ ] SVG eclipse

- [ ] configure auto github pages deployment too https://turbo.build/repo/docs/ci/github-actions

- [ ] will have got one thing moved fully

### other packages and apps

- move the packages
- move the apps
- test deployment
- think of one workspace with python as well?

## maybe doing

migrate xas standards to a supabase backend, independent of the frontend? just a next js app?
<https://chat.openai.com/c/cb512553-a543-4b0e-9e6e-bb43feeb308a>

to validate types arktype - better than JOI
<https://arktype.io/>

## not doing
- [ ] chakra config (?) in the template - not decided yet
