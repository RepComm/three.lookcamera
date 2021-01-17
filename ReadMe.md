# three.lookcamera
A look camera and freecamera for your three.js projects

Depends only on three.js

Comes with d.ts typescript definitions

Doesn't force you to use any weird input system

[Shameless plug if you need a procedural input lib](https://github.com/RepComm/gameinput-ts)

## Example

`npm install @repcomm/three.lookcamera`

```typescript
import { FreeCamera } from "@repcomm/three.lookcamera";

const freecam = new FreeCamera ();

scene.add( freecam );

// freecam.getCamera(); // for when you want to render with it

//game input loop

//move the camera, typically with WASD/arrow keys
freecam.addMovementInput( forwardDelta , sideDelta );

//rotate the camera, typically with the mouse
freecam.addRotationInput ( horizontalDelta, verticalDelta );

```
