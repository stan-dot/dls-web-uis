
# Monorepo demo todo

## target tree structure

- apps
  - davidia-client-example
  - pato-frontend-example - with custom dockerfile
  - dedi app
  - xas standards client

- packages
  - davidia with storybook inside <https://medium.com/@Seb_L/compose-your-turborepos-storybooks-and-deploy-them-to-vercel-94befbb78a56>
  - <https://turbo.build/repo/docs/handbook/tools/storybook>
  - diamondlightsource ui components
  - pato components
  - ray class (from dedi), Plotter class, svg eclipse
  - scientific unit logic (extracted from dedi)
  - layouts - from frameworks comparison
  - utils download file
  - citation form from xas-standards client

## acceptance tests

- deploy UI libraries to NPM with turbo
- deploy into kubernetes easily
- have a working dev mode
- applicable to the list of libraries from /migrate directory
  - pato
  - davidia
  - dedi
  - xas-standards app
- and those from frameworks-comparison
  - periodic table
  - b18-csv-generator-
  - package comparator
  - bootstrap popout windows

## order of works

- dedi is the simplest case, start with that
- once that is fully done with splitting of some code logic into the packages

- move one thing fully

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
