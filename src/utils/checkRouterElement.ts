export function checkRouterElement(
  element: string | string[] | null | undefined,
  defaulElement: string
) {
  return Array.isArray(element)
    ? element[0]
    : element
      ? element
      : defaulElement;
}
