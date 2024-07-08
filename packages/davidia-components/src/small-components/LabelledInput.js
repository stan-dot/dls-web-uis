import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import '@h5web/lib/dist/styles.css';
import styles from './LabelledInput.module.css';
import { useRef, useState } from 'react';
import { IoMdUndo } from 'react-icons/io';
var InputValidationState;
(function (InputValidationState) {
    InputValidationState[InputValidationState["PENDING"] = 0] = "PENDING";
    InputValidationState[InputValidationState["ERROR"] = 1] = "ERROR";
    InputValidationState[InputValidationState["VALID"] = 2] = "VALID";
})(InputValidationState || (InputValidationState = {}));
function seeIfShowOldValue(liveUpdate, ivState, noSubmitLabel) {
    return ((liveUpdate && ivState === InputValidationState.ERROR) ||
        (!liveUpdate && ivState === InputValidationState.PENDING) ||
        (noSubmitLabel && ivState === InputValidationState.ERROR) ||
        (!noSubmitLabel && ivState === InputValidationState.PENDING));
}
/**
 *
 * Renders a labelled input box.
 * @template T
 * @param {LabelledInputProps<T>} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function LabelledInput(props) {
    // INTERACTIVE STATE
    const [ivState, setIVState] = useState(InputValidationState.VALID);
    const [previousValue, setPreviousValue] = useState(null);
    const [value, setValue] = useState(props.input);
    const [unvalidatedValue, setUnvalidatedValue] = useState(String(props.input));
    // READ PROPS STATE
    const inputRef = useRef(null);
    const noSubmitLabel = props.submitLabel === undefined;
    const resetButton = props.resetButton !== false;
    const enableEnterKey = props.enableEnterKey !== false;
    const liveUpdate = noSubmitLabel && !enableEnterKey;
    // DERIVED STATE
    const showOldValue = seeIfShowOldValue(liveUpdate, ivState, noSubmitLabel);
    const inputValue = showOldValue
        ? unvalidatedValue
        : String(typeof value === 'number' && props.decimalPlaces
            ? value.toPrecision(props.decimalPlaces)
            : value);
    // REACTIVITY
    /**
     *
     * Handles change in input.
     * @param {React.ChangeEvent<HTMLInputElement>} evt - The component props.
     */
    function handleInputChange(evt) {
        setIVState(InputValidationState.PENDING);
        const input = evt.currentTarget.value;
        setUnvalidatedValue(input);
        if (liveUpdate) {
            handleSubmit(input);
        }
    }
    /**
     *
     * Handles submission of new value and updates preceeding value.
     * @param {string} [input] - The inputted value.
     */
    function handleSubmit(input) {
        setIVState(InputValidationState.PENDING);
        if (props.isValid !== undefined) {
            const [isValid, validValue] = props.isValid(input ?? unvalidatedValue);
            if (isValid) {
                setIVState(InputValidationState.VALID);
                const preceedingValue = value;
                props.updateValue(validValue);
                setValue(validValue);
                setPreviousValue(preceedingValue);
            }
            else {
                setIVState(InputValidationState.ERROR);
            }
        }
        else {
            const typedInput = input;
            const preceedingValue = value;
            props.updateValue(typedInput);
            setValue(typedInput);
            setPreviousValue(preceedingValue);
        }
    }
    function handleKeyDown(e) {
        if (enableEnterKey && e.key === 'Enter') {
            handleSubmit(inputRef.current?.value);
        }
    }
    /**
     *
     * Resets value to previous value if non-null previous value.
     */
    function handleReset() {
        setIVState(InputValidationState.PENDING);
        console.log('previous value is ', previousValue);
        if (previousValue !== null) {
            setIVState(InputValidationState.VALID);
            props.updateValue(previousValue);
            setValue(previousValue);
            console.log('setting value, ', previousValue);
        }
    }
    return (_jsx(_Fragment, { children: _jsxs("div", { className: styles.top, children: [ivState === InputValidationState.ERROR && (_jsxs("div", { className: styles.error, children: ["\"", unvalidatedValue, "\" is invalid"] })), _jsxs("label", { className: styles.label, htmlFor: "labelled-input", children: [props.label, ":"] }), resetButton && (_jsx("button", { onClick: handleReset, children: _jsx(IoMdUndo, {}) })), _jsx("input", { id: "labelled-input", ref: inputRef, onChange: handleInputChange, onKeyDown: handleKeyDown, required: true, value: inputValue, disabled: props.disabled, onBlur: () => handleSubmit(inputRef.current?.value), ...props.inputAttribs }), !noSubmitLabel && (_jsx("button", { onClick: () => handleSubmit(undefined), disabled: props.disabled, children: props.submitLabel }))] }) }));
}
export default LabelledInput;
//# sourceMappingURL=LabelledInput.js.map