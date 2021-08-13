
function EventEmitter() {
  let events: any = {};
  return {
    subscribe: (name: any, cb: any) => {
      (events[name] || (events[name] = [])).push(cb);
      return {
        unsubscribe: () => {
          events[name] && events[name].splice(events[name].indexOf(cb), 1);
        }
      };
    },
    emit: (name: string | number, data: any) => {
      (events[name] || []).forEach((fn: (arg0: any) => any) => fn(data));
    }
  };
}

export default EventEmitter;