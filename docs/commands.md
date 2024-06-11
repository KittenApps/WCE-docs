---
sidebar_position: 4
---

# Chat Commands list

## General commands

### `/wceChangelog`

* prints a short summary of current WCE changelog
* you can always find a [complete changelog here](/blog/tags/releases)

### `/wceDebug`

* prints helpfull debug information to the chat window and copies them to your clipboard
* please provide these information if you're reporting any problems with WCE

### `/wceGoToRoom [room name]`

* immediatle leaves the current room (ignoring all restrictions) and joins the specified room
* if room name is kept emty, just leaves the room and goes to the Main Hall
* if the room with the specified name doesn't exists (or it's locked without you having access as an room admin) it will show the chat room search with your query prefilled
* if the room with the specified case-sensitive name exists, you will joint that room immediatle (even if it's private or even locked and you being a room admin)

### `/exportLooks [target member number]`

* exports your (or the specified target members) current look as a base64 string and copies it to your clipboard
* you will be asked wether you want to include binds, their locks and your body features in your export or just your cloths

### `/importLooks`

* import a exported look to your current character (paste the exported base64 string in the textarea shown after running that command)
* you need to be able to change your cloths (not being bound) to use this command
* doesn't override items locked on you, which you can't unlock yourself

### `/w [target name] [message]`

* write a whisper message to the target
* target name can be either the member number or the first name of the nickname or username (until the first space)

### `/beep [member number] [message]`

* writes a beep to the member with the specified member number
* doesn't work if your BCX rule prevents sending beeps

### `/versions`

* prints addon version information for any character in the current room to the chat window
* shows BC, WCE, BCX and any other modSDK registered addon version 

### `/profiles <filter>`

* shows a list of saved member profiles matching the specified filter
* filter can be a member number or a part of their username or (last known) nickname
* click on a profile link to show a version of their profile from when they last were in the same chat room as you (while WCE was running with that feature active)

## Animation Engine commands

### `/r [part of face or 'all']`

* resets current expression overrides on your complete face (if passed `all`) or just the specified part (like `Eyes`)

### `/anim ['list' or name of emote]`

* runs the specified animation on your character
* pass `list` as an argument to see a list of all available animations

### `/pose ['list' or list of poses]`

* set your characters pose to the specified pose or space seperated list of poses
* pass `list` as an argument to see a list of all available poses

## Toy Sync commands

:::info
these commands are only available while connected to a Intiface Client with the toy sync feature active
:::

### `/toybatteries`

* prints a list of your connected buttplug.io toys with their battery status in % (if this information is available)

### `/toyscan`

* scans for connected buttplug.io toys