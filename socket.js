// const constants = require("./constants");

// function handleSocketEvents(socket, robot) {
//   // for mouse move
//   socket.on(constants.MOUSE_MOVE, ({ x, y, scroll }) => {
//     if (!scroll) {
//       const { x: X, y: Y } = robot.getMousePos();
//       robot.moveMouse(x + X, y + Y);
//     } else {
//       y = y > 0 ? 1 : -1;
//       robot.scrollMouse(0, y);
//     }
//   });
//   // mouse click
//   socket.on(constants.MOUSE_CLICK, ({ button, double }) => {
//     console.log("click", button);
//     robot.mouseClick(button, double);
//   });

//   // key toggle
//   socket.on(constants.KEY_TOGGLE, ({ key, pressed }) => {
//     const state = pressedToState[!!pressed];
//     if (key === "meta") key = "command";
//     robot.keyToggle(key, state);
//   });
// }

// module.exports = handleSocketEvents;
