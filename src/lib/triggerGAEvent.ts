// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function triggerGAEvent(eventName: string, options?: { [key: string]: any }) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, options);
  }
}
