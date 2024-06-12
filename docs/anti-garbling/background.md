---
sidebar_position: 1
---

# Background: BC's garbling

With r103 BC completely changed the garbling system from being recipient based to being sender based and improved on it largely in r104.
This required a complete rewrite of the anti garbling system in WCE from scratch, as many of the design decision weren't compatible with the new BC system anymore.

## Comparison between the Anti Garble system in FBC and WCE

|                                      | FBC ≤5.9 with BC ≤r102 | WCE ≥6.2 with BC ≥r104 |
| :---                                 |           :---:          |           :---:          | 
| `Where does BC's garbling happen?`   | on the recipient (BC sends every message as ungarbled cleartext and recipient garbles message based on the senders gag level and their deafen level | on the sender (BC garbles messages on the sender side and only sends garbled message by default to all recipients, who add deafen garble if needed) |
| `Who needs an addon for it to work?` | recipient must have FBC to see ungarbled messages | sender must have WCE, recipient don't require any addons to see ungarbled messages send by WCE users |
| `I don't want others to see my messages ungarbled.` | that's difficult to achieve, since messages are always send ungarbled by BC (may use FBC's gag anti cheat) | that's easy doable, since the sender has full control with WCE over how much their messages is garbled before being sent by BC (and BC doesn't send ungarbled messages by default anymore) |
| `Does it support baby talk and stutter?`   | No (only basic garbling) | Yes (WCE added support for preserving baby talk and stutters) |