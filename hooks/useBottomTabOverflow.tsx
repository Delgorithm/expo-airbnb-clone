import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export function useBottomTabOverflow() {
  try {
    return useBottomTabBarHeight();
  } catch {
    return 0;
  }
}
