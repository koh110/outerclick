'use strict';

const path = require('path');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const header = require('gulp-header');
const webpack = require('webpack');
const browserSync = require('browser-sync');
const notifier = require('node-notifier');
const webpackConfig = require(`${__dirname}/webpack.config`);
const pkg = require(`${__dirname}/package.json`);

const APP_ROOT = path.resolve(__dirname);

const config = {
  server: {
    port: 8282,
    server: {
      baseDir: APP_ROOT,
      index: 'example.html'
    }
  }
};

const plumberNotifier = (taskName) => {
  return {
    errorHandler: (error) => {
      const title = `[task]${taskName} ${error.plugin}`;
      const errorMsg = `error: ${error.message}`;
      /* eslint-disable no-console */
      console.error(`${title}\n${error}`);
      /* eslint-enable no-console */
      notifier.notify({
        title: title,
        message: errorMsg,
        time: 3000
      });
    }
  };
};

const webpackBuild = (conf, cb) => {
  webpack(conf, (err) => {
    if (err) {
      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
      throw err;
    }
    if (!cb.called) {
      cb.called = true;
      return cb();
    }
  });
};
gulp.task('webpack', ['lint'], (cb) => {
  const conf = webpackConfig;
  webpackBuild(conf, cb);
});
gulp.task('watch-webpack', ['lint'], (cb) => {
  const conf = Object.assign(webpackConfig, { watch: true });
  webpackBuild(conf, cb);
});
gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
  .pipe(plumber(plumberNotifier('lint')))
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError())
  .pipe(plumber.stop());
});
gulp.task('build', ['webpack'], () => {
  const banner = `/*
 * ${pkg.name} ${pkg.version}
 * ${pkg.description}
 * This software is released under the ${pkg.license} License
 * http://opensource.org/licenses/mit-license.php
 *
 * Copyright (C) 2015 ${pkg.author}, ${pkg.repository.url}
 */
`;
  return gulp.src(Object.keys(webpackConfig.entry).map((key) => {
    return `${webpackConfig.output.path}/${key}.js`;
  }))
  .pipe(header(banner))
  .pipe(gulp.dest('./dist'));
});
gulp.task('server', () => {
  browserSync(config.server);
});
gulp.task('reloadServer', () => {
  browserSync.reload();
});
gulp.task('watch', ['watch-webpack'], () => {
  const watch = [`${APP_ROOT}/${config.server.server.index}`]
  .concat(Object.keys(webpackConfig.entry).map((key) => {
    return webpackConfig.entry[key];
  }));
  gulp.watch(watch, ['reloadServer']);
});
gulp.task('default', ['build', 'watch', 'server']);
