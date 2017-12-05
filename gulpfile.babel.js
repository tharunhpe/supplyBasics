import gulp from 'gulp';
import { argv } from 'yargs';
import grommetToolbox, { getOptions } from 'grommet-toolbox';
import gulpIntl from './gulpIntl';

const options = getOptions();

gulp.task('set-webpack-alias', () => {
  if (options.alias && argv.useAlias) {
    options.webpack.resolve.alias = options.alias;
  }
});

grommetToolbox(gulp);

gulpIntl(gulp);
