# fast-normalize-spaces-as

**Attention**: This project is experimental and should not be used in the production.

This project is used to compare Node.js native realization([@shelf/fast-normalize-spaces](https://github.com/shelfio/fast-normalize-spaces))
of the function for normalization whitespace characters with Assemblyscript realization([@shelf/fast-normalize-spaces-as](https://github.com/shelfio/fast-normalize-spaces-as)).
Also, it can be used as an example for a future Assemblyscript projects.

## Useful resources

- <https://www.assemblyscript.org/>
- <https://github.com/torch2424/as-bind>

## Build

```shell
yarn asbuild
```

## Benchmark

All tests was launched on MacBook Pro 2019:

- **CPU**: 2,6 GHz 6-Core Intel Core i7
- **RAM**: 16 GB 2667 MHz DDR4

### Speed

| [@shelf/fast-normalize-spaces](https://github.com/shelfio/fast-normalize-spaces) | [@shelf/fast-normalize-spaces-as](https://github.com/shelfio/fast-normalize-spaces-as) | Improvement |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------- |
| ~33 kb: 3 876 ops/s, ±2.22%                                                      | ~33 kb: 2 976 ops/s, ±2.95%                                                            | -23.22%     |
| ~330 kb: 339 ops/s, ±4.14%                                                       | ~330 kb: 219 ops/s, ±3.64%                                                             | -35.4%      |
| ~3.3 mb: 30 ops/s, ±5.35%                                                        | ~3.3 mb: 26 ops/s, ±6.91%                                                              | -13.33%     |
| ~33 mb: 3.3 ops/s, ±8.90%                                                        | ~33 mb: 3.2 ops/s, ±1.52%                                                              | -3.03%      |

You can run `yarn benchmark:speed` to test on your own.

### Memory usage

| Text size | [normalize-space-x](https://github.com/Xotic750/normalize-space-x) | [@shelf/fast-normalize-spaces](https://github.com/shelfio/fast-normalize-spaces) | Improvement |
| --------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------- |
| 33 kb     | 0.50mb                                                             | 1.29mb                                                                           | -           |
| 330 kb    | 6.79mb                                                             | 2.16mb                                                                           | 3.14x       |
| 3.3 mb    | 77.94mb                                                            | 12.35mb                                                                          | 6.3x        |
| 33 mb     | 498.12mb                                                           | 112.62mb                                                                         | 4.42x       |
| 100mb     | 1446.14mb                                                          | 338.11mb                                                                         | 4.28x       |
| 150mb     | 2003.53mb                                                          | 506.54mb                                                                         | 3.96x       |
| 200mb     | 2660.09mb                                                          | 674.83mb                                                                         | 3.94x       |

The larger the string the faster it gets. Memory usage is approximately 3x than the input data size.

Set `TEXT_SIZE` variable value you want in the [test.sh](benchmark/memory/test.sh) script and
run the following command to test memory usage:

```shell
yarn benchmark:memory
```

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)
