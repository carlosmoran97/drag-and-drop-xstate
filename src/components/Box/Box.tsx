import { useMachine } from '@xstate/react';
import React from 'react';
import { dragAndDropMachine } from '../../machines/dragAndDrop';
import './Box.css';

export const Box: React.FC = (): JSX.Element => {
  const [state, send] = useMachine(dragAndDropMachine);
  console.log(state.value);
  return (
    <div
      style={{
        left: state.context.x + state.context.dx,
        top: state.context.y + state.context.dy,
      }}
      className="box"
      onMouseDown={(e) => {
        send('mouseDown', { clientX: e.clientX, clientY: e.clientY });
      }}
      onMouseMove={(e)=>{
        send('mouseMove', {
          clientX: e.clientX,
          clientY: e.clientY
        });
      }}
      onMouseUp={() => {
        send('mouseUp');
      }}
    />
  );
};
