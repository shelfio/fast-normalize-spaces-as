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

| Text size | [@shelf/fast-normalize-spaces](https://github.com/shelfio/fast-normalize-spaces) | [@shelf/fast-normalize-spaces-as](https://github.com/shelfio/fast-normalize-spaces-as) | Improvement |
| --------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------- |
| 33 kb     | 1.11mb                                                                           | 0.76mb                                                                                 | +1.46x      |
| 330 kb    | 1.92mb                                                                           | 2.92mb                                                                                 | -1.52x      |
| 3.3 mb    | 12.20mb                                                                          | 27.43mb                                                                                | -2.25x      |
| 33 mb     | 111.96mb                                                                         | 268.27mb                                                                               | -2.40x      |
| 100mb     | 337.47mb                                                                         | 811.43mb                                                                               | -2.41x      |
| 150mb     | 506.02mb                                                                         | 1066.09mb                                                                              | -2.11x      |
| 200mb     | 674.87mb                                                                         | 1421.36mb                                                                              | -2.11x      |

The larger the string the faster it gets. Memory usage is approximately 8x than the input data size.

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
