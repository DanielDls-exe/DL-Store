import ramda from "ramda";

export const isEmptyAndNotString = (data: any) => {
  return !ramda.is(String, data) || ramda.isEmpty(data);
};
