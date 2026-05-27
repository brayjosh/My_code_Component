import { IInputs, IOutputs } from "./generated/ManifestTypes";

// trafficSignal css class name
const trafficSignaLClassName = "traffic-signal";

// light css class names
const lightClassName = "light";

// individual light css class names
const redLightClassName = "red";
const yellowLightClassName = "yellow";
const greenLightClassName = "green";

const activeLightClassName = "active";

export class TrafficLight implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    // PCF framework context, "Input Properties" containing the parameters, control metadata and interface functions.
    private _context: ComponentFramework.Context<IInputs>;

    // Control's main container
    private trafficSignal: HTMLDivElement;

    // Individual lights
    private redLight: HTMLDivElement;
    private yellowLight: HTMLDivElement;
    private greenLight: HTMLDivElement;
    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._context = context;
        context.mode.trackContainerResize(true);

        // Create main container for traffic signal
        this.trafficSignal = document.createElement("div");
        this.trafficSignal.className = trafficSignaLClassName;

        // Create individual lights
        this.redLight = document.createElement("div");
        this.redLight.className = lightClassName + " " + redLightClassName;

        this.yellowLight = document.createElement("div");
        this.yellowLight.className = lightClassName + " " + yellowLightClassName;

        this.greenLight = document.createElement("div");
        this.greenLight.className = lightClassName + " " + greenLightClassName;

        // Append lights to traffic signal container
        this.trafficSignal.appendChild(this.redLight);
        this.trafficSignal.appendChild(this.yellowLight);
        this.trafficSignal.appendChild(this.greenLight);
        container.appendChild(this.trafficSignal);

        this.updateView(context);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._context = context;

        this.trafficSignal.style.width = `${context.mode.allocatedWidth}px`;
        this.trafficSignal.style.height = `${context.mode.allocatedHeight}px`;

        const currentValue = this.normalise(context.parameters.value.raw);

        const lights = [
            { element: this.redLight, value: this.normalise(context.parameters.redValue.raw) },
            { element: this.yellowLight, value: this.normalise(context.parameters.yellowValue.raw) },
            { element: this.greenLight, value: this.normalise(context.parameters.greenValue.raw) },
        ];

        lights.forEach(light => {
            light.element.classList.toggle(activeLightClassName, currentValue === light.value);
        });
    }

    private normalise(value: string | null | undefined): string {
        return (value ?? "").trim().toLowerCase();
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
