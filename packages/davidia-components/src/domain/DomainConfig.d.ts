import type { ColorScaleType, CustomDomain, Domain, HistogramParams } from '@h5web/lib';
export declare const formatBound: (n: number | {
    valueOf(): number;
}) => string;
/**
 * The props for the `DomainConfig` component.
 * @interface {object} DomainConfigProps
 * @member {dataDomain} Domain - The domain to configure.
 * @member {CustomDomain} customDomain - The custom domain.
 * @member {ColorScaleType} scaleType - The type of the colour scale.
 * @member {(domain: CustomDomain) => void} onCustomDomainChange - Handles custom domain change.
 * @member {() => HistogramParams | undefined} [histogramFunction] - Returns histogram params.
 */
interface DomainConfigProps {
    /** The domain to configure */
    dataDomain: Domain;
    /** The custom domain */
    customDomain: CustomDomain;
    /** The type of the colour scale */
    scaleType: ColorScaleType;
    /** Handles custom domain change */
    onCustomDomainChange: (domain: CustomDomain) => void;
    /** Returns histogram params (optional) */
    histogramFunction?: () => HistogramParams | undefined;
}
/**
 *
 * Renders the configuration options for a domain.
 * @param {DomainConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function DomainConfig(props: DomainConfigProps): JSX.Element;
declare namespace DomainConfig {
    var displayName: string;
}
export default DomainConfig;
export type { DomainConfigProps };
//# sourceMappingURL=DomainConfig.d.ts.map