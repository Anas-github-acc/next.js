export function generateRouteTypesFile(_routesManifest: object): string {
  return `// Import the routes manifest from JSON
import routesManifest from '../routes.json'

// -----------------------------------------------
// Route aliases
// -----------------------------------------------

type PageRoutes = keyof (typeof routesManifest)['pages']
type LayoutRoutes = keyof (typeof routesManifest)['layouts']
export type Routes = PageRoutes | LayoutRoutes
  
// -----------------------------------------------
// helpers
// -----------------------------------------------

type Merge<T> = { [K in keyof T]: T[K] }

// extract path params
// -----------------------------------------------

type Grab<Path extends string> =
  Path extends \`\${string}[[...\${infer Key}]]\${infer Rest}\`
    ? Merge<{ [K in Key]: undefined | string[] } & Grab<Rest>>
  : Path extends \`\${string}[...\${infer Key}]\${infer Rest}\`
    ? Merge<{ [K in Key]: [string, ...string[]] } & Grab<Rest>>
  : Path extends \`\${string}[\${infer Key}]\${infer Rest}\`
    ? Merge<{ [K in Key]: string } & Grab<Rest>>
  : {}

type ParamMap = { [P in Routes]: Grab<P> }
export type ParamsOf<P extends Routes> = ParamMap[P]

// -----------------------------------------------
// layout slots
// -----------------------------------------------

type SlotMap = {
  [P in LayoutRoutes]:
    (typeof routesManifest)['layouts'][P] extends { slots: readonly string[] }
      ? (typeof routesManifest)['layouts'][P]['slots'][number]
      : never
}

type LayoutChildrenMap = {
  [P in LayoutRoutes]: Merge<{ children: React.ReactNode } &
    { [K in SlotMap[P]]: React.ReactNode }>
}

type LayoutChildren<P extends LayoutRoutes> = LayoutChildrenMap[P]

// -----------------------------------------------
// public props
// -----------------------------------------------

type DefaultSearchParams = Record<string, string | string[] | undefined>

export type PageProps<P extends PageRoutes> = {
  params: Promise<ParamsOf<P>>
  searchParams: Promise<DefaultSearchParams>
}

export type LayoutProps<P extends LayoutRoutes> = {
  params: Promise<ParamsOf<P>>
} & LayoutChildren<P>`
}
