import { useCallback, useRef, useSyncExternalStore } from "react";
import { ToastNotification, Toasts } from "./ToastStore";

export function ToastContainer() {
  const ref = useRef<ToastNotification[]>([]);
  const getToasts = useCallback(() => {
		let newToasts = Toasts.getToasts();
    if (newToasts.map(x => x.id.toString()).join() !== ref.current.map(x => x.id.toString()).join()) {
      ref.current = newToasts;
    }
    return ref.current;
	}, [])
  var toasts = useSyncExternalStore(Toasts.subscribe, getToasts);
  return (
    <div className="toast-container">
      {toasts.map(toast => {
        return <Toast 
          key={toast.id}
          message={toast.message}        
          icon={toast.icon}
          type={toast.type}
        />
      })}
    </div>
  );
}

export interface ToastProps {
  icon: string,
  type: "normal"| "info"| "succcess"| "warning"| "error",
  message: string,
}

export function Toast(props: ToastProps) {
  const classes = `toast toast-${props.type}`;
  return (
    <div role="alert" aria-live="polite" className={classes}>
      <span className="material-icons"> {props.icon} </span>
      <span className="mud-snackbar-content-message">
        {props.message}
      </span>
      <button> <span className="material-icons"> close </span></button>
    </div>
  )
}