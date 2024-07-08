import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from 'd3-format';
import { DomainSlider, Histogram, useSafeDomain, useVisDomain, } from '@h5web/lib';
import { useClickOutside, useKeyboardEvent, useToggle } from '@react-hookz/web';
import { useRef, useEffect, useState, useMemo } from 'react';
import styles from './DomainConfig.module.css';
import { DomainTools } from './DomainTools.js';
// eslint-disable-next-line react-refresh/only-export-components
export const formatBound = format('.3~e');
const TOOLS_ID = 'domain-tools';
/**
 *
 * Renders the configuration options for a domain.
 * @param {DomainConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function DomainConfig(props) {
    const { dataDomain, customDomain, scaleType } = props;
    const { onCustomDomainChange, histogramFunction } = props;
    const visDomain = useVisDomain(customDomain, dataDomain);
    const [safeDomain, errors] = useSafeDomain(visDomain, dataDomain, scaleType);
    const [sliderDomain, setSliderDomain] = useState(visDomain);
    useEffect(() => {
        setSliderDomain(visDomain);
    }, [visDomain]);
    const isAutoMin = customDomain[0] === null;
    const isAutoMax = customDomain[1] === null;
    const [isEditingMin, toggleEditingMin] = useToggle(false);
    const [isEditingMax, toggleEditingMax] = useToggle(false);
    const isEditing = isEditingMin || isEditingMax;
    /**
     *
     * Toggles editing
     * @param {boolean} force
     */
    function toggleEditing(force) {
        toggleEditingMin(force);
        toggleEditingMax(force);
    }
    /**
     * Cancels editing
     *
     */
    function cancelEditing() {
        if (isEditing) {
            toggleEditing(false);
        }
    }
    const rootRef = useRef(null);
    useClickOutside(rootRef, cancelEditing);
    useKeyboardEvent('Escape', () => {
        cancelEditing();
    });
    const histogram = useMemo(() => (histogramFunction ? histogramFunction() : undefined), [histogramFunction]);
    const domainProps = {
        sliderDomain,
        dataDomain,
        errors,
        isAutoMin,
        isAutoMax,
        onAutoMinToggle: () => {
            const newMin = isAutoMin ? dataDomain[0] : null;
            onCustomDomainChange([newMin, customDomain[1]]);
            if (!isAutoMin) {
                toggleEditingMin(false);
            }
        },
        onAutoMaxToggle: () => {
            const newMax = isAutoMax ? dataDomain[1] : null;
            onCustomDomainChange([customDomain[0], newMax]);
            if (!isAutoMax) {
                toggleEditingMax(false);
            }
        },
        isEditingMin,
        isEditingMax,
        onEditMin: toggleEditingMin,
        onEditMax: toggleEditingMax,
        onChangeMin: (val) => onCustomDomainChange([val, customDomain[1]]),
        onChangeMax: (val) => onCustomDomainChange([customDomain[0], val]),
        onSwap: () => onCustomDomainChange([customDomain[1], customDomain[0]]),
    };
    return (_jsxs("div", { ref: rootRef, className: styles.root, children: [!histogramFunction && (_jsx("div", { className: styles.sliderContainer, children: _jsx(DomainSlider, { value: sliderDomain, safeVisDomain: safeDomain, dataDomain: dataDomain, scaleType: scaleType, errors: errors, isAutoMin: isAutoMin, isAutoMax: isAutoMax, onChange: (newValue) => {
                        setSliderDomain(newValue);
                        toggleEditing(false);
                    }, onAfterChange: (hasMinChanged, hasMaxChanged) => {
                        onCustomDomainChange([
                            hasMinChanged ? sliderDomain[0] : customDomain[0],
                            hasMaxChanged ? sliderDomain[1] : customDomain[1],
                        ]);
                    } }) })), _jsx(DomainTools, { id: TOOLS_ID, domainProps: domainProps, children: histogram && (_jsx(Histogram, { dataDomain: dataDomain, value: sliderDomain, scaleType: scaleType, onChangeMin: (val) => onCustomDomainChange([val, customDomain[1]]), onChangeMax: (val) => onCustomDomainChange([customDomain[0], val]), ...histogram })) })] }));
}
DomainConfig.displayName = 'DomainConfig';
export default DomainConfig;
//# sourceMappingURL=DomainConfig.js.map