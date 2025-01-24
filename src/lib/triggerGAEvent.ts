export default function triggerGAEvent(eventName: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName);
  }
}
