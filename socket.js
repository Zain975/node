const constants = require("./constants");

function handleSocketEvents(socket, robot) {
  // for mouse move
  socket.on(constants.MOUSE_MOVE, ({ x, y, scroll }) => {
    if (!scroll) {
      const { x: X, y: Y } = robot.getMousePos();
      robot.moveMouse(x + X, y + Y);
    } else {
      y = y > 0 ? 1 : -1;
      robot.scrollMouse(0, y);
    }
  });
  // mouse click
  socket.on(constants.MOUSE_CLICK, ({ button, double }) => {
    console.log("click", button);
    robot.mouseClick(button, double);
  });
  // keyboard
  socket.on(constants.KEY_PRESS, (action) => {
    let alt = action.alt;
    let ctrl = action.ctrl;
    let shift = action.shift;
    let meta = action.meta;
    let code = action.code;
    let string = action.string;

    if (alt) robot.keyToggle("alt", "down");
    if (ctrl) robot.keyToggle("control", "down");
    if (shift) robot.keyToggle("shift", "down");
    if (meta) robot.keyToggle("command", "down");

    // let specialKey = KEY_MAPPING[code]
    if (string) {
      robot.typeString(string);
      // else if (specialKey) {
      // robot.keyTap(specialKey)
    } else {
      // Hack for android where key code is always 229. We use the backspace
      // when the string is empty.
      robot.keyTap("backspace");
    }

    if (alt) robot.keyToggle("alt", "up");
    if (ctrl) robot.keyToggle("control", "up");
    if (shift) robot.keyToggle("shift", "up");
    if (meta) robot.keyToggle("command", "up");
    return false;
  });
  // key toggle
  socket.on(constants.KEY_TOGGLE, ({ key, pressed }) => {
    const state = pressedToState[!!pressed];
    if (key === "meta") key = "command";
    robot.keyToggle(key, state);
  });
}

module.exports = handleSocketEvents;
