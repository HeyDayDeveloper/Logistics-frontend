export function debounce<T extends (...args: any[]) => any>(func: T, delay = 300): (...args: Parameters<T>) => void {
  let timerId: any
  return function debounced(...args: Parameters<T>): void {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      func(...args)
      timerId = undefined
    }, delay)
  }
}
