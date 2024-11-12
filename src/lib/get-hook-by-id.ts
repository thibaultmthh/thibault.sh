import { hooks } from "@/config/hooks";

export default function getHookById(hookId: string) {
  // Iterate through each category
  for (const category of Object.values(hooks)) {
    // Find the hook in the category's items array
    const hook = category.items.find((item) => item.id === hookId);
    if (hook) {
      return hook;
    }
  }
  // Return null if hook is not found
  return null;
}
