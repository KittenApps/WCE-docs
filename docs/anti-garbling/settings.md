---
sidebar_position: 2
---

# WCE's Anti Garble options

### `Anti Garble`
  * enabled the anti garble system as a whole, giving access to the other options

### `Anti Garble chat options`
  * draw a quick anti garble options select over the chat button, allowing you to quickly switch between modes without having to go into WCE's settings
  * the chat option will automatically detect if you're currently whispering or writing a normal chat messages and show the coresponding options
  * also improves the style of the whole chat input sections, making the chat input box having more for more text for you to check and proveread

### `Chat garble level`
  * determines if and a how much ungarbled version of the chat message should be send to the chat in addition to the normal garbled chat message and shown in brackets behind it to all recipients (don't need to have WCE), with the following options
  * `none`: sends a fully ungarbled message to the chat (shown in brackets)
  * `low` (0.5★), `medium` (1.5★), `high` (2.5★): sends a more or less slightly garbled message to the chat (show in brackets), which is garbled up to the selected level, but not higher than your current gag level (so you still can talk normally when ungaged)
  * `full`: deactivates the anti garble system for normal chat messages and only sends the fully garbled messages (no hint in brackets)

### `Chat stutters`
  * controls how stutter is handled during the creation of the ungarbled messages (shown in brackets), with the following options:
  * `remove`: always remove chat stutters, even if it is the only effect
  * `ignore`: do not show an ungarbled message (in brackets) if no other garbling effects are applied, but otherwise removes the stutters from the ungarbled message
  * `preserve`: always preserve chat stutters in the ungarbled text in brackets
  * only applies if the `garble level` isn't set to either `full or `off` (whisper only)
  * if activated WCE `Alternative speech stutters` will be used instead of BC ones

### `Chat baby talk`
  * analogously to `Chat stutters` just for baby talk

### `Whisper garble level`
  * determines if and a how much ungarbled version of the whisper message should be send in addition to the normal garbled message and shown in brackets behind it to the recipient (don't need to have WCE)
  * it supports all options of `Chat garble level` analogously with the following one addition:
  * `off`: turns off BC's garbling for whisper messages completely, only showing the ungarbled message as it and no message hint in brackets
  * also supports `Whisper stutters` and `Whisper baby talk` analogously to the chat variants

### `Anti Deafen` 
  * in the `Cheats` section of WCE's preferences
  * always shows the ungarbled messages in brackets when you are deafened
  * currently BC does this only for gaged senders (having messages hints because of their garbling) but not for ungaged senders