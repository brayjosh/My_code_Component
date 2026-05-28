# TrafficLight

This is a lightweight Power Apps control that shows a red, yellow, or green status based on a bound value; users can set the trigger values by configuring the controls properties.

## Quick start
```bash
npm install
npm run build
# deploy with your usual PCF command, e.g.:
pac pcf push
```

## Configuration
- Bind the field to `value` (the input the control evaluates).  
- Set the trigger inputs `redValue`, `yellowValue`, and `greenValue` using formulas or static text. Examples:
  - Static: `="High"`
  - Formula: `If(Status="Overdue","Overdue","")`  
- Matching is case-insensitive and whitespace-trimmed.

## Files
- Source: index.ts  
- Styles: TrafficLight.css

## Styling
- Customize the CSS classes: `traffic-signal`, `light`, `red`, `yellow`, `green`, `active`.  
- Edit the styles in the linked CSS file to change size, colors, or animation.

## Notes
- Best for at-a-glance status indicators; pair with text or tooltips for clarity and accessibility.  
- Suggested license: MIT.
