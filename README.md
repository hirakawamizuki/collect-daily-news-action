# collect-daily-news-action

* This GitHub Action is to collect and output daily news from Google News RSS by using editable keywords.

## Input

### xxx

* xxx

## Output

### `result`

News data we got.

## Example usage

```
uses: hirakawamizuki/collect-daily-news-action
with:
  xxx: 'xxx'
  yyy: 'xxx'
```

## For developers

### How to local run of this Dockerfile

```
$ docker image build ./ -t collect-daily-news-action
```

```
$ docker container run --rm --name my-app collect-daily-news-action
```

Then you can check some outputs on your console.