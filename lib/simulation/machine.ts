import { setup, assign } from 'xstate';

type SimulationContext = {
  tick: number;
  running: boolean;
};

type SimulationEvent =
  | { type: 'START' }
  | { type: 'STOP' }
  | { type: 'TICK' };

export const simulationMachine = setup({
  types: {} as {
    context: SimulationContext;
    events: SimulationEvent;
  }
}).createMachine({
  id: 'simulation',
  initial: 'idle',
  context: {
    tick: 0,
    running: false
  },
  states: {
    idle: {
      on: {
        START: {
          target: 'running',
          actions: assign({ running: () => true })
        }
      }
    },
    running: {
      on: {
        STOP: {
          target: 'idle',
          actions: assign({ running: () => false })
        },
        TICK: {
          actions: assign({
            tick: ({ context }) => context.tick + 1
          })
        }
      }
    }
  }
});
