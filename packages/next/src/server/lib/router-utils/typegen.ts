export function generateRouteTypesFile(routesManifest: object): string {
  return `export const routesManifest = ${JSON.stringify(routesManifest, null, 2)} as const

type PageRoutes = keyof (typeof routesManifest)['pages']
type LayoutRoutes = keyof (typeof routesManifest)['layouts']

export type Routes = PageRoutes | LayoutRoutes

type Merge<T> = { [K in keyof T]: T[K] }

// extract path params from the path
type Grab<Path extends string> =
  Path extends \`\${infer _}[[...\${infer Key}]]\${infer Rest}\` // [[...slug]]
    ? Merge<{ [K in Key]: undefined | string[] } & Grab<Rest>>
    : Path extends \`\${infer _}[...\${infer Key}]\${infer Rest}\` // [...slug]
      ? Merge<{ [K in Key]: [string, ...string[]] } & Grab<Rest>>
      : Path extends \`\${infer _}[\${infer Key}]\${infer Rest}\` // [slug]
        ? Merge<{ [K in Key]: string } & Grab<Rest>>
        : {} // done

type DefaultSearchParams = {
  [key: string]: string | string[] | undefined
}

type ParamsOf<Path extends Routes> = Merge<Grab<Path>>

type SlotsOf<Path extends LayoutRoutes> =
  (typeof routesManifest)['layouts'][Path] extends { slots: readonly string[] }
    ? (typeof routesManifest)['layouts'][Path]['slots'][number]
    : never

type LayoutChildren<Path extends LayoutRoutes> =
  Merge<{ children: React.ReactNode } & { [K in SlotsOf<Path>]: React.ReactNode }>

export type PageProps<Path extends PageRoutes> = {
  params: Promise<ParamsOf<Path>>
  searchParams: Promise<DefaultSearchParams>
}

export type LayoutProps<Path extends LayoutRoutes> = {
  params: Promise<ParamsOf<Path>>
} & LayoutChildren<Path>`
}
