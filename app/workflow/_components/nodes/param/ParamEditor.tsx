import DropDownParam from "./DropDownParam";
import StringParam from "./StringParam";


function ParamEditor({ param, value, onUpdate }: { 
  param: any; // Replace with your Param type
  value: any;
  onUpdate: (value: any) => void;
}) {
  if (param.type === "string") {
    return (
      <StringParam
        param={param}
        value={value}
        updateNodeParamValue={onUpdate}
        disabled={false}
      />
    );
  }

  if (param.type === "dropdown") {
    return (
      <DropDownParam
        param={param}
        value={value}
        updateNodeParamValue={onUpdate}
        disabled={false}
      />
    );
  }

  return null;
}