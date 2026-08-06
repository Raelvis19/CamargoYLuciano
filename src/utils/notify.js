const EVENT_NAME = "ucne:notify";

function emit(type, message, options = {}) {
  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, {
      detail: {
        id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`,
        type,
        message: String(message || "Ha ocurrido un evento."),
        duration: options.duration ?? 4200,
      },
    })
  );
}

export const notify = {
  success: (message, options) => emit("success", message, options),
  error: (message, options) => emit("error", message, options),
  warning: (message, options) => emit("warning", message, options),
  info: (message, options) => emit("info", message, options),
};

export const NOTIFY_EVENT = EVENT_NAME;
