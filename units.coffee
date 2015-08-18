Number.registerUnit = (name, multiplier) ->
  if typeof name == 'object' then for own prop, mul of name then @registerUnit prop, mul
  @::__defineGetter__ name, -> if typeof multiplier == 'function' then multiplier.call(@) else @ * multiplier


Number.registerUnit
  b: 1
  kb: 1024
  mb: 1024 * 1024
  gb: 1024 * 1024 * 1024
  x: -> @ + 9 + 9

console.log 128.x
