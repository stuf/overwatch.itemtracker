
# overwatch.itemtracker

## Contents

 * [Notes](#notes)
 * [Getting it running](#getting-it-running)
 * [Points of Interest](#points-of-interest)

Calmm.js -based approach into making an Overwatch item tracker, forked from [Overwatch-Item-Tracker][repo:Overwatch-Item-Tracker].

## Notes

_Please note that this is only made as a quick experiment for practicing use of [traversals](https://github.com/calmm-js/partial.lenses#traversals) for making querying arbitrary JSON data in a presentable manner, and be efficient at it. As an added bonus, this application is built on top of the [Calmm.js](https://github.com/calmm-js) architecture, so all data is contained within observables._

The code as it currently is, is lacking both in tests as well as code quality; there's a bunch of redundant and horribly written code, as well as some components that are lacking. I hope that I'll have time to clean this up to get a nice up-and-running application from this.

## Getting it running

```sh
yarn
yarn start
```

And you should be good to go. There might be some missing resources from the `assets` folder that are not pushed, those can be commented out or pulled from some other tracker repo for the time being. Sorry!

## Points of Interest

Most if not all operations on any data are contained in a file called `meta.js` in every folder, which is responsible for all handling of JSON data from any API to the application.

A single character/hero's data looks roughly like this:

```js
const hero = {
  id: 'ana',
  name: 'Ana',
  // some other data
  items: [
    // An item category; skins, voice lines, etc.
    {
      id: 'skins',
      data: [/* items */]
    }
  ]
};
```

For instance, marking all items as _completed_ is done through a couple of lenses composed together.

First, define a traversal for all elements in a list and focus on the `completed` property of every item, e.g. an _item_.

```js
const completedItems = [L.elems, 'completed'];
```

This is used to focus on all the items within a list of items.

Then, define a traversal for taking all items associated with any character given;

```js
const baseT = ['items', L.elems, 'data'];
```

Now we can write a couple of operations to mark all items for a given character as _completed_ or _not completed_. We do this by first creating a fold-traversal lens to select all items, and _partially applying_ `set` and `remove` operations by composing the previously defined traversals together, and leaving out the data.

```js
const selectAll = L.foldTraversalLens(L.and);
const selectAllIn = L.set([baseT, selectAll(completedItems)], true);
const deselectAllIn = L.remove([baseT, selectAll(completedItems)]);
```

Now, `selectAllIn` can be used to mark all items completed that conform to the "interface", or "contract", we've specified above, e.g. any object that contains the following:

```js
const dummy = {
  items: [
    { data: [/* ... */] },
    { data: [/* ... */] },
    { data: [/* ... */] }
  ]
};

const dummySelected = selectAllIn(dummy);
```

This can be rewritten to not depend on the `items.data` structure simply by removing `baseT` from the definition of `selectAllIn`;

```js
const selectAllIn = L.set(selectAll(completedItems), true)
```

Now `selectAllIn` works on simply a list of objects. Magic!

[repo:Overwatch-Item-Tracker]: https://github.com/Js41637/Overwatch-Item-Tracker
