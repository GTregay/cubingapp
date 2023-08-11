export type OrientationOptions = {
    label: string,
    value: string,
}[];

export const cubeOrientationOptions: OrientationOptions = [
    { label: "white green", value: "" },
    { label: "white orange", value: "y'" },
    { label: "white blue", value: "y2" },
    { label: "white red", value: "y" },
    { label: "yellow green", value: "z2" },
    { label: "yellow orange", value: "z2 y" },
    { label: "yellow blue", value: "z2 y2" },
    { label: "yellow red", value: "z2 y'" },
    { label: "green yellow", value: "x" },
    { label: "green orange", value: "x y'" },
    { label: "green white", value: "x y2" },
    { label: "green red", value: "x y" },
    { label: "blue white", value: "x'" },
    { label: "blue orange", value: "x' y'" },
    { label: "blue yellow", value: "x' y2" },
    { label: "blue red", value: "x' y" },
    { label: "orange green", value: "z" },
    { label: "orange yellow", value: "z y'" },
    { label: "orange blue", value: "z y2" },
    { label: "orange white", value: "z y" },
    { label: "red green", value: "z'" },
    { label: "red white", value: "z' y'" },
    { label: "red blue", value: "z' y2" },
    { label: "red yellow", value: "z' y" },
];

export const pyraOrientationOptions: OrientationOptions = [
    { label: "yellow green", value: "" },
    { label: "yellow red", value: "y'" },
    { label: "yellow blue", value: "y" },
    { label: "red green", value: "z'"},
    { label: "red blue", value: "z' y'"},
    { label: "red yellow", value: "z' y"},
    { label: "blue green", value: "z"},
    { label: "blue yellow", value: "z y'"},
    { label: "blue red", value: "z y"},
    { label: "green blue", value: "x' y"},
    { label: "green red", value: "x'"},
    { label: "green yellow", value: "x' y'"},
];