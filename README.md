# Chiba

```
let test = new template({
    text: "The quick brown {{ animal.fox }} jumps over the lazy {{ thing }}?"
}).exec({
    animal: { fox: 'fox' },
    thing: 'cat',
});
console.log(test);
```
