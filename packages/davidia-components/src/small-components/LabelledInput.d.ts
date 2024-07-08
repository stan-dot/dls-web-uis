import '@h5web/lib/dist/styles.css';
/**
 * The props for the `LabelledInput<T>` component.
 * @template T
 * @interface {object} LabelledInputProps<T>
 * @member {(value: T) => void} updateValue - Updates value.
 * @member {(value: string) => [boolean, T]} [isValid] - Checks if value is valid.
 * @member {string} label - The input label.
 * @member {T} input - The input value.
 * @member {number} [decimalPlaces] - The number of decimal places to display.
 * @member {object} [inputAttribs] - Input attributes.
 * @member {string} [submitLabel] - Label on submit button.
 * @member {boolean} [disabled] - If input is diabled.
 * @member {boolean} [enableEnterKey] - If enter key is enabled.
 * @member {boolean} [resetButton] - If reset button is enabled.
 */
interface LabelledInputProps<T> {
    /** Updates value */
    updateValue: (value: T) => void;
    /** Checks if value is valid (optional) */
    isValid?: (value: string) => [boolean, T];
    /** The input label */
    label: string;
    /** The input value */
    input: T;
    /** The number of decimal places to display (optional) */
    decimalPlaces?: number;
    /** Input attributes (optional) */
    inputAttribs?: object;
    /** Label on submit button (optional) */
    submitLabel?: string;
    /** If input is disabled (optional) */
    disabled?: boolean;
    /** If enter key is enabled (optional) */
    enableEnterKey?: boolean;
    /** If reset button is enabled (optional) */
    resetButton?: boolean;
}
/**
 *
 * Renders a labelled input box.
 * @template T
 * @param {LabelledInputProps<T>} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function LabelledInput<T>(props: LabelledInputProps<T>): import("react/jsx-runtime").JSX.Element;
export default LabelledInput;
export type { LabelledInputProps };
//# sourceMappingURL=LabelledInput.d.ts.map