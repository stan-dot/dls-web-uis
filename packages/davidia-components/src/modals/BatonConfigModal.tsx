import { HiCursorClick } from 'react-icons/hi';
import type { IIconType } from './Modal.js';
import Modal from './Modal.js';
import { Btn } from '@h5web/lib';
import { useMemo } from 'react';
import type { BatonProps } from '../plots/AnyPlot.js';

/**
 *
 * Renders the configuration options for the baton.
 * @export
 * @param {BatonProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export function BatonConfigModal(props: BatonProps) {
  const { batonUuid, uuid, others, hasBaton } = props;
  const oUuids = useMemo<string[]>(() => {
    return others.map((o) => (batonUuid == o ? o + '*' : o));
  }, [batonUuid, others]);

  return Modal({
    title: 'Baton Info',
    icon: HiCursorClick as IIconType,
    children: (
      <div style={{ lineHeight: '80%' }}>
        <p>
          <strong>Client ({hasBaton ? uuid + '*' : uuid})</strong>
        </p>
        {!hasBaton && oUuids.length > 0 && (
          <>
            <p>Other client{oUuids.length > 1 ? 's' : ''}</p>

            {oUuids.map((o) =>
              batonUuid && batonUuid + '*' == o ? (
                <div title="Request baton" key={batonUuid}>
                  <Btn label={o} onClick={() => props.requestBaton()}></Btn>
                </div>
              ) : (
                <p key={o}>{o}</p>
              )
            )}
          </>
        )}
        {batonUuid &&
          hasBaton &&
          others.map((o) => (
            <div title="Pass baton on" key={o}>
              <Btn
                key={o}
                label={o}
                onClick={() => props.approveBaton(o)}
              ></Btn>
            </div>
          ))}
      </div>
    ),
  });
}
