# collect-daily-news-action

* This GitHub Action is to collect and output daily news from Google News RSS by using editable keywords.

## Input

### `keywords` (required)

* Multi search keywords
* Format: `"<keyword1>, <keyword2>, <keyword3>"`
* e.g. `"GitHub, Docker, AWS"`

## Output

### `result`

* News data you got.
* Format: json

## Example usage

`.github/workflows/main.yml` sample in your repository:

```
  - name: Get news
    uses: hirakawamizuki/collect-daily-news-action
    id: get-news
    with:
      keywords: "GitHub, Docker, AWS"
  - name: Get output
    run: echo "${{ steps.get-news.outputs.result }}"
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