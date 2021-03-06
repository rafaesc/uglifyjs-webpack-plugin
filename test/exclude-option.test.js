import UglifyJsPlugin from '../src/index';
import {
  cleanErrorStack,
  createCompiler,
  compile,
} from './helpers';

describe('when applied with exclude option', () => {
  let compiler;
  beforeEach(() => {
    compiler = createCompiler({
      entry: {
        excluded1: `${__dirname}/fixtures/excluded1.js`,
        excluded2: `${__dirname}/fixtures/excluded2.js`,
        entry: `${__dirname}/fixtures/entry.js`,
      },
    });
  });

  it('matches snapshot for a single exclude', () => {
    new UglifyJsPlugin({
      exclude: /excluded1/,
    }).apply(compiler);


    return compile(compiler).then((stats) => {
      const errors = stats.compilation.errors.map(cleanErrorStack);
      const warnings = stats.compilation.warnings.map(cleanErrorStack);

      expect(errors).toMatchSnapshot('errors');
      expect(warnings).toMatchSnapshot('warnings');

      for (const file in stats.compilation.assets) {
        if (Object.prototype.hasOwnProperty.call(stats.compilation.assets, file)) {
          expect(stats.compilation.assets[file].source()).toMatchSnapshot(file);
        }
      }
    });
  });

  it('matches snapshot for multiple excludes', () => {
    new UglifyJsPlugin({
      exclude: [
        /excluded1/,
        /excluded2/,
      ],
    }).apply(compiler);


    return compile(compiler).then((stats) => {
      const errors = stats.compilation.errors.map(cleanErrorStack);
      const warnings = stats.compilation.warnings.map(cleanErrorStack);

      expect(errors).toMatchSnapshot('errors');
      expect(warnings).toMatchSnapshot('warnings');

      for (const file in stats.compilation.assets) {
        if (Object.prototype.hasOwnProperty.call(stats.compilation.assets, file)) {
          expect(stats.compilation.assets[file].source()).toMatchSnapshot(file);
        }
      }
    });
  });
});
