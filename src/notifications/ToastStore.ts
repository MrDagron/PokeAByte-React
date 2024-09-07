export interface ToastNotification {
  icon: string,
  type: NotificationType,
  message: string,
  autoclear: boolean,
  id: number
  clearAt: number,
}

type NotificationType = "normal"| "info"| "succcess"| "warning"| "error";

export class ToastStore {
	private _callbacks: Function[] = [];
	private _toasts: ToastNotification[] = [];
  private _lastId: number = 1;

	constructor() {
		window.setInterval(() => this._clear(), 250);
	}

  private _notifySubscribers = () => {
    this._callbacks.forEach(x => x());
  }

	private _clear = () => {
    const now = new Date().getTime();
    const count = this._toasts.length;
		this._toasts = this._toasts.filter(
      x => x.autoclear === true && x.clearAt >= now
    );
    if (this._toasts.length !== count) {
      this._notifySubscribers();
    }
	}

  push = (message: string, icon: string = "", type: NotificationType = "info", autoclear: boolean = true) => {
    const id = ++this._lastId;
    this._toasts.push({
      message,
      icon,
      type,
      autoclear,
      id,
      clearAt: autoclear ? new Date().getTime() + 5000 : 0,
    });
    this._notifySubscribers();
  }

  subscribe = (onStoreChange: () => void) => {
    this._callbacks.push(onStoreChange);
    return () => {
      this._callbacks = this._callbacks.filter(x => x !== onStoreChange);
    }
  }
  getToasts = () => [...this._toasts];
}

export const Toasts = new ToastStore();