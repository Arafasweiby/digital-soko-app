export function showToast({ toast, title, description, status }) {
  toast({
    title,
    description,
    status,
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
}
