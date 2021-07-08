export const acessToken = {
  in: 'header',
  name: 'access-token',
  schema: {
    type: 'string',
    format: 'jwt',
    example:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIzZmE4NWY2NC01NzE3LTQ1NjItYjNmYy0yYzk2M2Y2NmFmYTYiLCJpYXQiOjE1MTYyMzkwMjJ9.bTeeS-YA-H70CUiY6p1hYxcLPYK3rxG8g6iFcNratjjEmIdtiLXHKLIUOxBIqhNUi-tEMpDIZqnrf3Ps_yyfcZe3dMT8-ZBQIMpPPkAOvjKwwyUYxYWS9Layg4xDmBdhefGVBheAnsHW9glcc18Nz9W16jukGPLzBeqR3MB5UjOvZCmw5QAZkkavxHPPfEspe5JUyXo9IfLN6p9ZjjCtB1E5-oj5ZkouuyQo-ic68jxkPNe0jsAJjWp-4Hz-kjqrYhJxOGgtznc4DsB4HZKX1FY1Y9k6WompKn0ah8dG0mlRLwGYSKyfDj3PHvPnrLcSuPjNlWFCDIVgqx5sg8YCew'
  },
  required: true
}
