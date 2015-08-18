Number.registerUnit = (name, multiplier) ->
  for own prop, mul of name then @registerUnit prop, mul if typeof name == 'object'
  @::__defineGetter__ name, -> if typeof multiplier == 'function' then multiplier.call @ else @ * multiplier

Number.registerUnit
  b: 1
  kb: 1024
  mb: 1024 ** 2
  gb: 1024 ** 3
  tb: 1024 ** 4
  x: -> @ + 9 + 9

console.log 128.gb
