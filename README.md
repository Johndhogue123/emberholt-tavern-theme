# The Tavern of Emberholt

A theme for the Claude Code desktop app: the window becomes a page of an illuminated chronicle, from the game *Emberholt*.

- A jewelled blue-and-gold border, a painted drop letter E and a blackletter heading, *Here beginneth the Tavern of Emberholt*.
- A tavern scene that moves: the hearth flickers, the innkeeper pours, two drinkers take turns at their ale, the sign sways, and the cat watches a mouse run along the frame.
- Marginalia: a bird hopping on a vine, a knight jousting a snail, a hare, a wyvern, an owl that blinks, and a monk asleep over his ale.
- Two looks: **by candlelight** (dark, the default) and **by day** (parchment). Type `/tavern night` or `/tavern day` to switch; your choice is remembered. `/tavern` alone puts the page up again.

## Install

At the prompt of a terminal session:

```
/plugin install tavern --marketplace Johndhogue123/emberholt-tavern-theme
```

Answer `y` to add the marketplace, then pick a scope.

From a shell:

```
claude plugin install tavern --marketplace Johndhogue123/emberholt-tavern-theme
```

In the desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `Johndhogue123/emberholt-tavern-theme`, then **Add plugin**.

The page draws in the desktop app's Code tab. Close the sidebar or the right panel to see the creatures in the margins.

## Notes

- The scene uses no `@media` rules and no SVG `<filter>`s: in the desktop app either one freezes every animation in a backdrop.
- The drop letter E and the heading are drawn as shapes from the UnifrakturCook typeface by j. 'mach' wust (SIL Open Font License 1.1), so no font is loaded.
