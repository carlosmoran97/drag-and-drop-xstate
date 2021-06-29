import { createMachine, assign } from "xstate";

interface IDragAndDropContext {
  pointerX: number;
  pointerY: number;
  // Box position
  x: number;
  y: number;
  // Where you move
  dx: number;
  dy: number;
}

export const dragAndDropMachine = createMachine({
  id: "dragAndDropMachine",
  initial: "idle",
  context: {
    // Where you click
    pointerX: 0,
    pointerY: 0,
    // Box position
    x: 0,
    y: 0,
    // Where you move
    dx: 0,
    dy: 0,
  },
  states: {
    idle: {
      on: {
        mouseDown: {
          target: "dragging",
          actions: assign((context: IDragAndDropContext, event: MouseEvent) => {
            return {
              ...context,
              pointerX: event.clientX,
              pointerY: event.clientY
            };
          }),
        },
      },
    },
    dragging: {
      on: {
        mouseMove: {
          target: "dragging",
          actions: assign((context: IDragAndDropContext, event: MouseEvent) => {
            return {
              ...context,
              dx: event.clientX - context.pointerX,
              dy: event.clientY - context.pointerY
            };
          })
        },
        mouseUp: {
          target: "idle",
          actions: assign((context: IDragAndDropContext) => {
            return {
              ...context,
              x: context.x + context.dx,
              y: context.y + context.dy,
              dx: 0,
              dy: 0
            };
          })
        },
      },
    },
  },
});
