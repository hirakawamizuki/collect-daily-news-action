# collect-daily-news-action

* This GitHub Action is to collect and output daily news from Google News RSS by using editable keywords.

## Input

### `keywords` (required)

* Multi search keywords
* Format: `"<keyword1>,<keyword2>,<keyword3>"`
  * Each keyword is separated by `,` .
  * When keywords include space symbol, please replace all ` ` by `+` .
* e.g. `"GitHub+Actions,Docker+Hub,AWS+Lambda"`
  * Then you received `GitHub Actions` news, `Docker Hub` news and `AWS Lambda` news.

### `how-many-days`

* For how many days you needs news.
* Format: `"<number>"`
* Dafault: `"1"`
* e.g. `"7"`

### `output-format`

* Output format
* Format: `"json"` or `mrkdwn`
  * mkrdwn is slack original text format
* Dafault: `"json"`

## Output

### `result`

* News data you got.
  * News title and url link pairs
* Format: json or mrkdwn (corresponding `output-format` )

## Example usage

`.github/workflows/main.yml` sample in your repository:

```
  - name: Get news
    uses: hirakawamizuki/collect-daily-news-action
    id: get-news
    with:
      keywords: "GitHub+Actions,Docker+Hub,AWS+Lambda"
      how-many-days: "1"
      output-format: "json"
  - name: Get output
    run: echo "${{ steps.get-news.outputs.result }}"
```

## For developers

### How to local node run

```
$ npm install
$ node index.js <keywords> <how-many-days> <output-format>
```

### How to local run of this Dockerfile

```
$ docker image build ./ -t collect-daily-news-action
$ docker container run --rm --name my-app collect-daily-news-action
```

Then you can check some outputs on your console.