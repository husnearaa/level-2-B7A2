export const USER_ROLE = {
  contributor: "contributor",
  maintainer: "maintainer",
} as const;

export type ROLES = "contributor" | "maintainer";

// export type ROLES = keyof typeof USER_ROLE;




// export const USER_ROLE = {
//   CONTRIBUTOR: "contributor",
//   MAINTAINER: "maintainer",
// } as const;

// export type ROLES =
//   (typeof USER_ROLE)[keyof typeof USER_ROLE];