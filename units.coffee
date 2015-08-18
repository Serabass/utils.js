Number.registerUnit = (name, multiplier) ->
  if typeof name == 'object'
    for own prop, mul of name
      @registerUnit prop, mul

  @::__defineGetter__ name, -> @ * multiplier


Number.registerUnit
  b: 1
  kb: 1024
  mb: 1024 * 1024
  gb: 1024 * 1024 * 1024

console.log 128.mb
