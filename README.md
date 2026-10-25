# S2R — Roblox bhop sensitivity converter

Static, responsive converter for https://www.roblox.com/games/5315046213/bhop.

Run `npm start` for a preview on http://127.0.0.1:4173. Run `npm test` to check the calculation. Publish the `dist` directory on any static host. No build or dependencies are required.

## Calculation and evidence

Horizontal physical turn matching:

`bhop multiplier = Source sensitivity × Source yaw × Source DPI / (Roblox sensitivity × Roblox horizontal factor × Roblox DPI)`

Source yaw defaults to 0.022 from [Valve's published SDK](https://github.com/ValveSoftware/source-sdk-2013/blob/master/src/game/client/in_mouse.cpp). Roblox horizontal factor defaults to 0.5 degrees per mouse delta from [Roblox's published CameraInput](https://github.com/Roblox/avatar/blob/main/ReferenceBodyCreator/StarterPlayerScripts/PlayerModule/CameraModule/CameraInput.lua). [Roblox input documentation](https://create.roblox.com/docs/reference/engine/classes/UserInputService#MouseDeltaSensitivity) states that client sensitivity and MouseDeltaSensitivity influence delta. [StrafesNET documentation](https://wiki.strafes.net/chat/commands) describes the /sens command and decimal arguments.

The multiplicative bhop behavior is supplied by the user. The game's private camera implementation has not been verified; this is explicitly disclosed on the site. Advanced settings allow overriding the factor or calculating it from a measured cm/360 at /sens 1. This matches horizontal travel, not FOV or vertical aim. The numeric Roblox sensitivity is required, not a slider bar count.

Settings stay in browser local storage. No account or backend is used. Character artwork is derived from the user's provided reference, with a transparent background.
