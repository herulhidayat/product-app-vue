import { useDark } from "@vueuse/core";

const isDark = useDark({
  selector: 'body',
  initialValue: 'light',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
});

isDark.value = false; // Set initial value to light mode

function toggleDark(value: boolean) {
  isDark.value = value;
}

export { isDark, toggleDark };