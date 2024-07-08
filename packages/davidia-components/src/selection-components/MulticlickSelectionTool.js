import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { assertDefined, useVisCanvasContext, useCanvasEvent, MouseButton, useInteraction, useModifierKeyPressed, } from '@h5web/lib';
import { useKeyboardEvent, usePrevious, useRafState, useSyncedRef, } from '@react-hookz/web';
import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';
function getAbsoluteMovement(lPt, cPt) {
    return Math.max(Math.abs(lPt.x - cPt.x), Math.abs(lPt.y - cPt.y));
}
/**
 *
 * Renders a tool with which to create a multiclick selection.
 * @param {Props} props - The component props.
 */
function MulticlickSelectionTool(props) {
    const { id = 'MulticlickSelection', minPoints = 2, maxPoints = minPoints, maxMovement = 1, modifierKey, disabled, transform = (selection) => selection, validate = () => true, onSelectionStart, onSelectionChange, onSelectionEnd, onValidSelection, children, } = props;
    // VALIDATION
    if (minPoints < 1) {
        throw new RangeError(`minPoints must be >= 1, ${minPoints}`);
    }
    if (maxPoints < minPoints && maxPoints !== -1) {
        throw new RangeError(`maxPoints must be -1 or >= minPoints, ${maxPoints} cf ${minPoints}`);
    }
    // Wrap callbacks in up-to-date but stable refs so consumers don't have to memoise them
    const transformRef = useSyncedRef(transform);
    const validateRef = useSyncedRef(validate);
    const onSelectionStartRef = useSyncedRef(onSelectionStart);
    const onSelectionChangeRef = useSyncedRef(onSelectionChange);
    const onSelectionEndRef = useSyncedRef(onSelectionEnd);
    const onValidSelectionRef = useSyncedRef(onValidSelection);
    const camera = useThree((state) => state.camera);
    const context = useVisCanvasContext();
    const { canvasBox, htmlToWorld, worldToData } = context;
    const [rawSelection, setRawSelection] = useRafState();
    const currentPtsRef = useRef();
    const useNewPointRef = useRef(true);
    const isCompleteRef = useRef(false);
    const hasSuccessfullyEndedRef = useRef(false);
    const isModifierKeyPressed = useModifierKeyPressed(modifierKey);
    const shouldInteract = useInteraction(id, {
        button: MouseButton.Left,
        modifierKey,
        disabled,
    });
    const setPoints = useCallback((html) => {
        const world = html.map((pt) => htmlToWorld(camera, pt));
        const data = world.map(worldToData);
        setRawSelection({ html, world, data });
    }, [camera, htmlToWorld, setRawSelection, worldToData]);
    const startSelection = useCallback((eTarget, pointerId, point) => {
        if (!useNewPointRef.current) {
            useNewPointRef.current = true;
        }
        else {
            currentPtsRef.current = [point];
            isCompleteRef.current = false;
            eTarget.setPointerCapture(pointerId);
            if (maxPoints === 1) {
                // no pointer movement necessary for single point
                setPoints([point]);
            }
        }
    }, [maxPoints, setPoints]);
    const finishSelection = useCallback((eTarget, pointerId, isDown, interact) => {
        eTarget.releasePointerCapture(pointerId);
        useNewPointRef.current = !isDown; // so up is ignored
        hasSuccessfullyEndedRef.current = interact;
        currentPtsRef.current = undefined;
    }, []);
    // EVENT HANDLING
    /**
     *
     * Handles a pointer click.
     * @param {CanvasEvent<PointerEvent>} evt - The canvas pointer event.
     * @return
     */
    function handlePointerClick(evt) {
        const { sourceEvent } = evt;
        const isDown = sourceEvent.type === 'pointerdown';
        const doInteract = shouldInteract(sourceEvent);
        if (isDown && !doInteract) {
            // click on non-interactive element
            return;
        }
        const { target, pointerId } = sourceEvent;
        const eTarget = target;
        const pts = currentPtsRef.current;
        const cPt = canvasBox.clampPoint(evt.htmlPt);
        if (pts === undefined) {
            startSelection(eTarget, pointerId, cPt);
            return;
        }
        const nPts = pts.length;
        let done = false;
        if (useNewPointRef.current) {
            const lPt = pts[nPts - 1];
            const absMovement = nPts === 1 ? 0 : getAbsoluteMovement(lPt, cPt);
            if (absMovement <= maxMovement) {
                // clicking in same spot when complete finishes selection
                done = isDown && isCompleteRef.current;
            }
            else {
                pts.push(cPt);
                useNewPointRef.current = false;
            }
        }
        else {
            useNewPointRef.current = true;
        }
        const maxPointsReached = nPts >= minPoints && maxPoints > 0 && nPts === maxPoints;
        if (done || maxPointsReached) {
            setRawSelection(undefined);
            finishSelection(eTarget, pointerId, isDown, doInteract);
        }
    }
    /**
     *
     * Handles a pointer move event.
     * @param {CanvasEvent<PointerEvent>} evt - The canvas pointer event.
     * @returns {null | boolean | ReactNode}
     */
    function handlePointerMove(evt) {
        const pts = currentPtsRef.current;
        if (pts === undefined) {
            return;
        }
        const nPts = pts.length;
        const cPt = canvasBox.clampPoint(evt.htmlPt);
        if (useNewPointRef.current) {
            pts.push(cPt);
            useNewPointRef.current = false;
        }
        else {
            pts[nPts - 1] = cPt;
        }
        setPoints([...pts]);
    }
    useCanvasEvent('pointerdown', handlePointerClick);
    useCanvasEvent('pointermove', handlePointerMove);
    useCanvasEvent('pointerup', handlePointerClick);
    useKeyboardEvent('Escape', () => {
        currentPtsRef.current = undefined;
        setRawSelection(undefined);
    }, [], { event: 'keydown' });
    useKeyboardEvent('Enter', () => {
        if (isCompleteRef.current) {
            hasSuccessfullyEndedRef.current = true;
            currentPtsRef.current = undefined;
            setRawSelection(undefined);
        }
    }, [], { event: 'keydown' });
    // SELECTION LOGIC
    // Compute effective selection
    const selection = useMemo(() => rawSelection && transformRef.current(rawSelection, camera, context), [rawSelection, transformRef, camera, context]);
    // Determine if effective selection respects the minimum size threshold
    const isValid = useMemo(() => {
        const valid = !!selection && validateRef.current(selection);
        if (valid) {
            const nPts = selection.html.length;
            isCompleteRef.current = nPts >= minPoints;
        }
        return valid;
    }, [isCompleteRef, minPoints, selection, validateRef]);
    // Keep track of previous effective selection and validity
    const prevSelection = usePrevious(selection);
    const prevIsValid = usePrevious(isValid);
    useEffect(() => {
        if (selection) {
            assertDefined(rawSelection);
            // Previous selection was undefined and current selection is now defined => selection has started
            if (!prevSelection) {
                onSelectionStartRef.current?.();
            }
            // Either way, current selection is defined, so invoke change callback with effective selection object
            onSelectionChangeRef.current?.(isModifierKeyPressed ? selection : undefined, // don't pass selection object if user is not pressing modifier key
            rawSelection, isValid);
            return;
        }
        // Previous selection was defined and current selection is now undefined => selection has ended.
        if (prevSelection) {
            assertDefined(prevIsValid);
            onSelectionEndRef.current?.(hasSuccessfullyEndedRef.current ? prevSelection : undefined, // pass `undefined` if Escape pressed or modifier key released
            prevIsValid);
            if (prevIsValid && hasSuccessfullyEndedRef.current) {
                onValidSelectionRef.current?.(prevSelection);
            }
            hasSuccessfullyEndedRef.current = false;
        }
    }, [
        selection,
        prevSelection,
        rawSelection,
        isValid,
        prevIsValid,
        isModifierKeyPressed,
        onSelectionStartRef,
        onSelectionChangeRef,
        onSelectionEndRef,
        onValidSelectionRef,
    ]);
    if (!selection || !isModifierKeyPressed) {
        return null;
    }
    assertDefined(rawSelection);
    return (_jsx(_Fragment, { children: children(selection, rawSelection, isValid, isCompleteRef.current) }));
}
// eslint-disable-next-line react-refresh/only-export-components
export { MulticlickSelectionTool as default };
//# sourceMappingURL=MulticlickSelectionTool.js.map