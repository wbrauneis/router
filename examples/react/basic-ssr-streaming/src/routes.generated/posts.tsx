import { lazy } from '@tanstack/react-router'
import { routeConfig as parentRouteConfig } from './__root'
import * as React from 'react'
import {
  Link,
  Outlet,
  useLoaderInstance,
  useMatch,
} from '@tanstack/react-router'
const new Route({ getParentRoute: () => routeConfig = parentRouteConfig,
  path: 'posts',
  component: Posts,
  onLoad: (...args) =>
    import('./posts-loader').then((d) => d.loader.apply(d.loader, args as any)),
  errorComponent: () => 'Oh crap',
})
function Posts() {
  const { posts } = useLoaderInstance({
    from: routeConfig.id,
  })
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <div>
        {posts?.map((post) => {
          return (
            <div key={post.id}>
              <Link
                to="/posts/$postId"
                params={{
                  postId: post.id,
                }}
                activeProps={{
                  className: 'font-bold',
                }}
              >
                <pre>{post.title.substring(0, 20)}</pre>
              </Link>
            </div>
          )
        })}
      </div>
      <Outlet />
    </div>
  )
}
export { routeConfig }
