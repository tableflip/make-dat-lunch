# MAKE DAT LUNCH (YO)

A p2p cooking rota

## Notes

membership dance

- Invite a user to follow you by sending them your dat address.
- They replicate your dat, and any members dats listed.
- They now have the complete world view of the data.
- They now create their own dat
- They are blocked from editing your group as their dat address is not in the members list.
- They send you a follow back request.
- You add their dat to the members list.
- GO GO GO.

This all assumes that everyones dats are being replicated by a makelunch-hashbase-alike service, so you can rely on dats being sync'd even when peers are unavailable.


## Dat

`/admins/*.json`

```js
{ dat: 'Hash1' }
```

`/eaters/*.json`

```js
{
  id: `${now}`
  name: String,
  img: url
}
```

`/meals/*.json`

```js
{
  date: isoDate
  chef: [userId]
  eaters: [userId]
  guests: Integer
  dish: String
}
```
