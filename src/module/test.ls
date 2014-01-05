require! './compiler' .compiler

(err, text) <-! compiler 'hello', {name: 'world'}
if err then console.log err
console.log text
