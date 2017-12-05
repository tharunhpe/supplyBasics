import path from 'path';
import webpack from 'webpack';
import { argv } from 'yargs';

const { NODE_ENV } = argv;
export default {
  copyAssets: [
    'src/index.html',
    {
      asset: 'src/assets/**',
      dist: 'dist/assets/',
    },
    {
      asset: 'lib/maps/**',
      dist: 'dist/maps/',
    }
  ],
  jsAssets: ['src/**/*.js'],
  mainJs: 'src/index.js',
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, './node_modules')
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
       'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
      })
    ]
  },
  env: {
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV || process.env.NODE_ENV || 'development'),
      DUMMY_TOKEN: JSON.stringify('eyJ0eXAiOiJKV1MiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyY2NkZGU4NzVjN2Q1ZjgyMDE1YzdkOWQ3MjM0MDA4YSIsInJlZnJlc2hfdG9rZW4iOiJueGVBUTM0TEtXamVnWkoxZk9mS0N6enA5Y0xzYXoraTRtVDk5NTZrbUl4M3VYdHN0bHlXQy8veE54bENCVGowbnBTUVBhTkRtenJlREcrUndoOGxyTGd2VzBVL0Y3TE9OZ2ovL3F4aFdqaFc2K2ZOaEtUaUVBWTdMMVU3aWI5ajRTSWMra0Z1SlBxSy9DajhFOW9oSmhWVXM0NTRjR2pzNjNqaUlaL1lQNmticHlRV3NkSHZVSUdLSWs3amxETzZUSnBVNThibTdQSStFZldSbzdudWhOay8yTERPbzA4NkZXTjFEcmtKUnVoUXF2c1BxM3pBMjI0TndLUCt2N0pma1dvUnUzWTByMXNSc1JPTW9uV1Jta0NuL1hNdU80QVZLWnYwQk53eU8wa3MzOW1RK0lVLzU4clV0cXNkcmhqbzZPVmVTdGVEd1R4K0VEWXNzVkpLc1pUSVhuTWVRMVUwZ1d1NXIxM3BISkJJSUhwMStwNmdtTEl0Q0lYMys5K3FsR1dHZ0pjTXFraHA2MTRrYTRHSTA5ZWFkZlZWVVkweGViQ0VGYW1Oc3V4LzkzVHcvK2VHb2RCaXRIMnJlYlN2T1NMaXRxUjYxQkhHRkt2ckgzZ0NVRVlrczMwSDAxV1AiLCJpc3MiOiJJZE0gMS4xNS4yIiwiY29tLmhwZS5pZG06dHJ1c3RvciI6bnVsbCwiZXhwIjoxNDk4NjQ5ODc1LCJjb20uaHAuY2xvdWQ6dGVuYW50Ijp7ImlkIjoiMmNjZGRlODc1YzdkNWY4MjAxNWM3ZDVmOTM4MDAwMDEiLCJuYW1lIjoiUHJvdmlkZXIiLCJkZXNjcmlwdGlvbiI6IlByb3ZpZGVyIiwiZW5hYmxlZCI6dHJ1ZX0sInBybiI6ImFkbWluIiwiaWF0IjoxNDk4NjQ4MDc1LCJqdGkiOiI3MmJiNmM4Yi0wMTM3LTQxNzYtYTcyZC0wZmY1ZTRjNjg3ZGYifQ.KF4hXQcY4ZFA46KXjMJ9Gw8qfZPNaHrm61wuK-vPofk'),
    }
  },
  devServerPort: 8014,
  devServerProxy: {
    "/rest/*": 'http://localhost:8114'
  },
  websocketHost: 'localhost:8114',
  alias: {
    'grommet-addons': path.resolve(__dirname, '../grommet-addons/src/js'),
    'grommet-templates': path.resolve(__dirname, '../grommet-templates/src/js'),
    'grommet-index/scss': path.resolve(__dirname, '../grommet-index/src/scss'),
    'grommet-index': path.resolve(__dirname, '../grommet-index/src/js'),
    'grommet/scss': path.resolve(__dirname, '../grommet/src/scss'),
    'grommet': path.resolve(__dirname, '../grommet/src/js')
  },
  devPreprocess: ['set-webpack-alias'],
  distPreprocess: ['set-webpack-alias'],
  preCommitTasks: ['jslint', 'scsslint'],
};
